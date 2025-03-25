"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const design_1 = __importDefault(require("./design"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.default.Router();
router.use("/api/v1/designs", design_1.default);
router.use("/api/v1/users", user_1.default);
router.use("/api/v1/auths", auth_1.default);
exports.default = router;
