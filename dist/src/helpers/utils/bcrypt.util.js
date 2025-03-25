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
exports.HashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
class HashPassword {
    static hash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            return (0, bcryptjs_1.hash)(password, salt);
        });
    }
    static compare(_a) {
        return __awaiter(this, arguments, void 0, function* ({ password, hashedPassword }) {
            return (0, bcryptjs_1.compare)(password, hashedPassword);
        });
    }
}
exports.HashPassword = HashPassword;
