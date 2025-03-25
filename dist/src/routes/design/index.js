"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const design_controller_1 = require("../../controllers/design.controller");
const router = express_1.default.Router();
const designController = new design_controller_1.DesignController();
router.get("/user/:userid", designController.getByUserId);
router.get("/:id", designController.getById);
router.delete("/:id", designController.delete);
router.put("/:id", designController.update);
router.post("/", designController.create);
router.get("/", designController.getAll);
exports.default = router;
