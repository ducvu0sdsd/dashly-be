import express from "express";
import { DesignController } from "../../controllers/design.controller";
import { Middleware } from "../../middlewares/auth.middleware";

const router = express.Router();

const designController = new DesignController()

const middleware = new Middleware()

router.get("/get-by-user/:userid", middleware.checkToken, designController.getByUserId)

router.get("/:id", middleware.checkToken, designController.getById)

router.delete("/:id", middleware.checkToken , designController.delete)

router.put("/:id", middleware.checkToken, designController.update)

router.post("/", middleware.checkToken, designController.create)

router.get("/", middleware.checkToken, designController.getAll)

router.get("/get-by-slug/:slug", middleware.checkToken, designController.getBySlug)

export default router;
