"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const users_enum_1 = require("../helpers/enums/users.enum");
moment_timezone_1.default.tz.setDefault("Asia/Ho_Chi_Minh");
const UserSchema = new mongoose_1.Schema({
    fullName: { type: String, default: "" },
    dob: { type: String, default: "" },
    avatar: { type: String, default: "https://th.bing.com/th/id/R.be953f29410b3d18ef0e5e0fbd8d3120?rik=Dm2iDRVLgVcpdA&pid=ImgRaw&r=0" },
    phoneNumber: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    bio: { type: String, default: "" },
    gender: { type: String, default: users_enum_1.Genders.OTHER },
    socialLinks: { type: [String], default: [] },
    auth: {
        username: { type: String, default: "" },
        password: { type: String, default: "" },
        emailVerify: { type: Boolean, default: false },
        passwordsUserd: { type: [String], default: [] },
        lastLogin: { type: String, default: new Date().toISOString() },
        role: { type: String, default: users_enum_1.Roles.USER },
        isActive: { type: Boolean, default: false },
        processSignup: { type: String, default: users_enum_1.ProcessSignups.STEP1 },
        typeAccount: { type: String, default: users_enum_1.TypeAccounts.NORMAL },
        verification: {
            otp: { type: String, default: "" },
            createdAt: { type: String, default: "" }
        }
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", UserSchema);
