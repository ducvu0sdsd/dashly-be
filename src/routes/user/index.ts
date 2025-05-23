import express from "express";
import { UserController } from "../../controllers/user.controller";
import { Middleware } from "../../middlewares/auth.middleware";

const middleware = new Middleware()

const router = express.Router();

const userController = new UserController()

router.get("/:id", userController.getById)

router.delete("/:id", middleware.checkToken ,userController.delete)

router.put("/:id", middleware.checkToken ,userController.update)

router.post("/",userController.create)

router.get("/", userController.getAll)

router.get("/get-by-slug/:slug", userController.getBySlug)

router.get("/get-information-by-slug/:slug", userController.getInformationBySlug)

export default router;
