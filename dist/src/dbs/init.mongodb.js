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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.MONGODB) {
                try {
                    yield mongoose_1.default.connect(process.env.MONGODB, {
                        maxPoolSize: 50
                    });
                    console.log('Connect to MongoDB successfully');
                }
                catch (error) {
                    console.error("MongoDB connection error:", error);
                }
            }
            else {
                console.error("Missing MONGODB connection string in .env file");
            }
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
// Khởi tạo singleton instance
const instanceMongodb = Database.getInstance();
exports.default = instanceMongodb;
