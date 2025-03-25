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
exports.DesignService = void 0;
const designModels_1 = __importDefault(require("../models/designModels"));
const userModels_1 = __importDefault(require("../models/userModels"));
class DesignService {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existUser = yield userModels_1.default.findById(data.user._id);
                if (!existUser) {
                    return "Not found user";
                }
                const design = new designModels_1.default(data);
                const result = yield design.save();
                return result;
            }
            catch (error) {
                return error;
            }
        });
        this.update = (id, data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield designModels_1.default.findById(id);
                if (!exist) {
                    return 0;
                }
                const result = yield designModels_1.default.findByIdAndUpdate(id, data, { new: true, runValidators: true });
                return result;
            }
            catch (error) {
                return error;
            }
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield designModels_1.default.findById(id);
                if (!exist) {
                    return 0;
                }
                const result = yield designModels_1.default.findByIdAndDelete(id);
                if (!result) {
                    return false;
                }
                return true;
            }
            catch (error) {
                return error;
            }
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield designModels_1.default.find();
                return result;
            }
            catch (error) {
                return error;
            }
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield designModels_1.default.findById(id);
                if (!result) {
                    return 0;
                }
                return result;
            }
            catch (error) {
                return error;
            }
        });
        this.getByUserId = (userid) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exist = yield userModels_1.default.findById(userid);
                if (!exist) {
                    return "Not found user";
                }
                const result = yield designModels_1.default.find({ 'user._id': userid });
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.DesignService = DesignService;
