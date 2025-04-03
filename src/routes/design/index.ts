import express from "express";
import { DesignController } from "../../controllers/design.controller";
import { Middleware } from "../../middlewares/auth.middleware";

const router = express.Router();

const designController = new DesignController()

const middleware = new Middleware()

router.get("/get-by-user/:userid", designController.getByUserId)

router.get("/:id", designController.getById)

router.delete("/:id", middleware.checkToken , designController.delete)

router.put("/:id", middleware.checkToken, designController.update)

router.post("/", middleware.checkToken, designController.create)

router.get("/", designController.getAll)

router.get("/get-by-slug/:slug", designController.getBySlug)

export default router;
