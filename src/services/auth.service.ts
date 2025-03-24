import { FailMessages } from "../helpers/enums/messages.enum"
import { ProcessSignups } from "../helpers/enums/users.enum"
import { MailQueueInterface, UserInformationInterface } from "../helpers/interfaces/user.interface"
import { HashPassword } from "../helpers/utils/bcrypt.util"
import { generateOTP } from "../helpers/utils/common.util"
import { generateAccessToken, generateRefreshToken } from "../helpers/utils/jwt.util"
import { MailService } from "./mail.service"
import { UserService } from "./user.service"

export class AuthService {

    private mailService!: MailService

    private userService!: UserService

    sendOTP = async (email: string) => {

        try {
            this.userService = new UserService()

            const userFound = await this.userService.getByEmail(email)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (userFound.auth.verification.otp && userFound.auth.verification.createdAt) {

                this.mailService.sendOTP({email: email, otp: userFound.auth.verification.otp})
            } else {

                this.mailService = new MailService()

                const otp = generateOTP()

                userFound.auth.verification.otp = otp

                userFound.auth.verification.createdAt = new Date().toISOString()

                await this.userService.update({id: userFound._id as string, data: userFound})

                this.mailService.sendOTP({email: email, otp: otp})
            }
            return true
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    verifyOTP = async ({email, otp}: {email: string, otp: string}) => {

        try {
            this.userService = new UserService()

            const userFound = await this.userService.getByEmail(email)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (userFound.auth.verification.otp !== otp) {
                throw new Error(FailMessages.INVALID_OTP)
            }

            userFound.auth.verification.otp = ''

            userFound.auth.verification.createdAt = ''

            await this.userService.update({id: userFound._id as string, data: userFound})

            return false
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    generateToken = (user_id : string) => {
        const accessToken = generateAccessToken(user_id)

        const refreshToken = generateRefreshToken(user_id)

        return {
            accessToken,
            refreshToken
        }
    }

    signUpStep2 = async ({userid, otp}: {userid: string, otp: string}) => {
        try {
            this.mailService = new MailService()

            this.userService = new UserService()

            const userFound = await this.userService.getById(userid)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            const isOtpValid = await this.verifyOTP({email: userFound.email, otp: otp})

            if (!isOtpValid) {
                throw new Error(FailMessages.INVALID_OTP)
            }

            userFound.auth.emailVerify = true;

            userFound.auth.processSignup = ProcessSignups.STEP2;

            const userUpdated = await this.userService.update({id: userid, data: userFound})

            return userUpdated

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    signUpStep3 = async (data: UserInformationInterface) => {
        try {
            const { address, dob, fullName, gender, phoneNumber, user_id } = data

            this.userService = new UserService()

            let userFound = await this.userService.getById(user_id)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            const userUpdated = await this.userService.update({id: user_id, data: {...userFound, address, dob, fullName, gender, phoneNumber, auth : {...userFound.auth, processSignup: ProcessSignups.STEP3}}})

            return {
                user: userUpdated,
                tokens: this.generateToken(userUpdated._id as string)
            }

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    signIn = async ({username, password}: {username: string, password: string}) => {
        try {
            this.userService = new UserService()

            const userFound = await this.userService.getByUsername(username)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            const isPasswordValid = await HashPassword.compare({password: password, hashedPassword: userFound.auth.password})

            if (!isPasswordValid) {
                throw new Error(FailMessages.INVALID_PASSWORD)
            }
            
            return {
                user: userFound,
                tokens: this.generateToken(userFound._id as string)
            }

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }
}