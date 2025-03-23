import express from "express";
import { DesignController } from "../../controllers/design.controller";

const router = express.Router();

const designController = new DesignController()
router.get("/user/:userid", designController.getByUserId)
router.get("/:id", designController.getById)
router.delete("/:id", designController.delete)
router.put("/:id", designController.update)
router.post("/", designController.create)
router.get("/", designController.getAll)
export default router;
