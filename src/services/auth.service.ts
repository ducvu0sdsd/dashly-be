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
            this.mailService = new MailService()

            this.userService = new UserService()

            const userFound = await this.userService.getByEmail(email)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (userFound.auth.verification.otp && userFound.auth.verification.createdAt) {
                this.mailService.sendOTP({
                    email: email, 
                    otp: userFound.auth.verification.otp, 
                    html: `<p>Mã OTP của bạn là: <b>${userFound.auth.verification.otp}</b></p><p>Vui lòng không chia sẻ với ai.</p>`,
                    text: `Mã OTP của bạn là: ${userFound.auth.verification.otp}. Vui lòng không chia sẻ với ai.`,
                    subject: "Mã OTP xác thực của bạn"
                })
            } else {

                this.mailService = new MailService()

                const otp = generateOTP()

                userFound.auth.verification.otp = otp

                userFound.auth.verification.createdAt = new Date().toISOString()

                await this.userService.update({id: userFound._id as string, data: userFound})

                await this.mailService.sendOTP({
                    email: email, 
                    otp: otp,
                    html: `<p>Mã OTP của bạn là: <b>${otp}</b></p><p>Vui lòng không chia sẻ với ai.</p>`,
                    text: `Mã OTP của bạn là: ${otp}. Vui lòng không chia sẻ với ai.`,
                    subject: "Mã OTP xác thực của bạn"
                })
            }
            return true
        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    verifyOTP = async ({userid, otp}: {userid: string, otp: string}) => {

        try {
            this.userService = new UserService()

            const userFound = await this.userService.getById(userid)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (userFound.auth.verification.otp !== otp) {
                throw new Error(FailMessages.INVALID_OTP)
            }

            userFound.auth.verification.otp = ''

            userFound.auth.verification.createdAt = ''

            return await this.userService.update({id: userFound._id as string, data: userFound})

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    generateTokens = ({user_id, remainTime} : {user_id: string, remainTime?: string}) => {
        const accessToken = generateAccessToken(user_id)

        const refreshToken = generateRefreshToken({user_id, remainTime})

        return {
            accessToken,
            refreshToken
        }
    }

    signUpStep2 = async ({userid, otp}: {userid: string, otp: string}) => {
        try {
            this.mailService = new MailService()

            this.userService = new UserService()

            const userUpdatedOTP = await this.verifyOTP({userid, otp: otp})

            userUpdatedOTP.auth.emailVerify = true;

            userUpdatedOTP.auth.processSignup = ProcessSignups.STEP2;

            const userUpdated = await this.userService.update({id: userid, data: userUpdatedOTP})

            return userUpdated

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    signUpStep3 = async (data: UserInformationInterface) => {
        try {
            const { address, dob, fullName, gender, phoneNumber, user_id, country } = data

            this.userService = new UserService()

            let userFound = await this.userService.getById(user_id)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            const userUpdated = await this.userService.update({id: user_id, data: {...userFound, address, dob, fullName, gender, phoneNumber, country, auth : {...userFound.auth, processSignup: ProcessSignups.STEP3}}})

            return {
                user: userUpdated,
                tokens: this.generateTokens({user_id: userUpdated._id as string})
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
                tokens: this.generateTokens({user_id: userFound._id as string})
            }

        } catch (error) {
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }

    forgotPassword = async (email: string) => {
        try {
            this.userService = new UserService()

            this.mailService = new MailService()

            const userFound = await this.userService.getByEmail(email)

            if (!userFound) {
                throw new Error(FailMessages.NOT_FOUND_USER)
            }

            if (userFound.auth.processSignup !== ProcessSignups.STEP3) {
                throw new Error(FailMessages.NOT_COMPLETE_SIGNUP)
            }

            const newPassword = generateOTP()

            const hashedPassword = await HashPassword.hash(newPassword);

            userFound.auth.passwordsUserd = [...userFound.auth.passwordsUserd, {
                timestamp: new Date().toISOString(),
                password: userFound.auth.password
            }]
            
            userFound.auth.password = hashedPassword

            await this.userService.update({id: userFound._id as string, data: userFound})

            await this.mailService.sendOTP({
                email: email,
                otp: newPassword,
                html: `<p>Bạn đã yêu cầu đặt lại mật khẩu. Mật khẩu mới của bạn là: <b>${newPassword}</b></p><p>Vui lòng không chia sẻ với ai.</p>`,
                text: `Bạn đã yêu cầu đặt lại mật khẩu. Mật khẩu mới của bạn là: ${newPassword}. Vui lòng không chia sẻ với ai.`,
                subject: "Đặt lại mật khẩu Dashly của bạn"
            });            

            return true

        } catch (error) {

            console.log(error)
            throw error instanceof Error ? error : new Error(FailMessages.COMMON);
        }
    }
}