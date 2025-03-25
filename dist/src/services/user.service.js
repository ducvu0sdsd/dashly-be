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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const bcrypt_util_1 = require("../helpers/utils/bcrypt.util");
const users_enum_1 = require("../helpers/enums/users.enum");
const messages_enum_1 = require("../helpers/enums/messages.enum");
class UserService {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield userModels_1.default.findOne({ email: data.username });
                if (userFound) {
                    throw new Error(messages_enum_1.FailMessages.FOUND_USER);
                }
                let hashedPassword = '';
                if (data.typeAccount === users_enum_1.TypeAccounts.NORMAL) {
                    hashedPassword = yield bcrypt_util_1.HashPassword.hash(data.password);
                }
                const user = new userModels_1.default({
                    email: data.username,
                    auth: Object.assign(Object.assign({}, data), { password: hashedPassword }),
                });
                const result = yield user.save();
                return result;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.update = (_a) => __awaiter(this, [_a], void 0, function* ({ id, data }) {
            try {
                const exist = yield userModels_1.default.findById(id);
                if (!exist) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                const result = yield userModels_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
                if (!result) {
                    throw new Error(messages_enum_1.FailMessages.UPDATE_FAIL);
                }
                return result;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield userModels_1.default.findById(id);
                if (!exist) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                const result = yield userModels_1.default.findByIdAndDelete(id);
                if (!result) {
                    throw new Error(messages_enum_1.FailMessages.COMMON);
                }
                return true;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userModels_1.default.find().lean();
                return result;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userModels_1.default.findById(id).lean();
                if (!result) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                return result;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.getByUsername = (username) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userModels_1.default.findOne({ 'auth.username': username }).lean();
                if (!result) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                return result;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userModels_1.default.findOne({ 'email': email }).lean();
                if (!result) {
                    throw new Error(messages_enum_1.FailMessages.NOT_FOUND_USER);
                }
                return result;
            }
            catch (error) {
                throw error instanceof Error ? error : new Error(messages_enum_1.FailMessages.COMMON);
            }
        });
    }
}
exports.UserService = UserService;
