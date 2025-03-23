import express from "express";
import { UserController } from "../../controllers/user.controller";

const router = express.Router();

const userController = new UserController()

router.post("/", userController.create)

export default router;
