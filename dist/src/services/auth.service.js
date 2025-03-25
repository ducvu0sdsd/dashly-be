"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const messages_enum_1 = require("../helpers/enums/messages.enum");
const users_enum_1 = require("../helpers/enums/users.enum");
const bcrypt_util_1 = require("../helpers/utils/bcrypt.util");
const common_util_1 = require("../helpers/utils/common.util");
const jwt_util_1 = require("../helpers/utils/jwt.util");
const mail_service_1 = require("./mail.service");
const user_service_1 = require("./user.service");
class AuthService {
    constructor() {
        this.sendOTP = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.mailService = new mail_service_1.MailService();
                this.userService = new user_service_1.UserService();
                const userFound = yield this.userService.getByEmail(email);
                if (!userFound) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                if (userFound.auth.verification.otp && userFound.auth.verification.createdAt) {
                    this.mailService.sendOTP({ email: email, otp: userFound.auth.verification.otp });
                }
                else {
                    this.mailService = new mail_service_1.MailService();
                    const otp = (0, common_util_1.generateOTP)();
                    userFound.auth.verification.otp = otp;
                    userFound.auth.verification.createdAt = new Date().toISOString();
                    yield this.userService.update({ id: userFound._id, data: userFound });
                    yield this.mailService.sendOTP({ email: email, otp: otp });
                }
                return true;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.verifyOTP = (_a) => __awaiter(this, [_a], void 0, function* ({ userid, otp }) {
            try {
                this.userService = new user_service_1.UserService();
                const userFound = yield this.userService.getById(userid);
                if (!userFound) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                if (userFound.auth.verification.otp !== otp) {
                    throw new Error(messages_enum_1.FailMessages.INVALID_OTP);
                }
                userFound.auth.verification.otp = '';
                userFound.auth.verification.createdAt = '';
                return yield this.userService.update({ id: userFound._id, data: userFound });
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.generateTokens = ({ user_id, remainTime }) => {
            const accessToken = (0, jwt_util_1.generateAccessToken)(user_id);
            const refreshToken = (0, jwt_util_1.generateRefreshToken)({ user_id, remainTime });
            return {
                accessToken,
                refreshToken
            };
        };
        this.signUpStep2 = (_a) => __awaiter(this, [_a], void 0, function* ({ userid, otp }) {
            try {
                this.mailService = new mail_service_1.MailService();
                this.userService = new user_service_1.UserService();
                const userUpdatedOTP = yield this.verifyOTP({ userid, otp: otp });
                userUpdatedOTP.auth.emailVerify = true;
                userUpdatedOTP.auth.processSignup = users_enum_1.ProcessSignups.STEP2;
                const userUpdated = yield this.userService.update({ id: userid, data: userUpdatedOTP });
                return userUpdated;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.signUpStep3 = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { address, dob, fullName, gender, phoneNumber, user_id } = data;
                this.userService = new user_service_1.UserService();
                let userFound = yield this.userService.getById(user_id);
                if (!userFound) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                const userUpdated = yield this.userService.update({ id: user_id, data: Object.assign(Object.assign({}, userFound), { address, dob, fullName, gender, phoneNumber, auth: Object.assign(Object.assign({}, userFound.auth), { processSignup: users_enum_1.ProcessSignups.STEP3 }) }) });
                return {
                    user: userUpdated,
                    tokens: this.generateTokens({ user_id: userUpdated._id })
                };
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.signIn = (_a) => __awaiter(this, [_a], void 0, function* ({ username, password }) {
            try {
                this.userService = new user_service_1.UserService();
                const userFound = yield this.userService.getByUsername(username);
                if (!userFound) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                const isPasswordValid = yield bcrypt_util_1.HashPassword.compare({ password: password, hashedPassword: userFound.auth.password });
                if (!isPasswordValid) {
                    throw new Error(messages_enum_1.FailMessages.INVALID_PASSWORD);
                }
                return {
                    user: userFound,
                    tokens: this.generateTokens({ user_id: userFound._id })
                };
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
    }
}
exports.AuthService = AuthService;
