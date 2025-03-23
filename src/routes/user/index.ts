import express from "express";
import { UserController } from "../../controllers/user.controller";

const router = express.Router();

const userController = new UserController()

router.get("/:id", userController.getById)

router.delete("/:id", userController.delete)

router.put("/:id", userController.update)

router.post("/", userController.create)

router.get("/", userController.getAll)

export default router;
