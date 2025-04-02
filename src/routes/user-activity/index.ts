import express from "express";
import { UserActivityController } from "../../controllers/user-activity.controller";

const router = express.Router();

const userActivityController = new UserActivityController()

router.get("/get-by-user/:userid", userActivityController.getByUserId)

router.delete("/:id", userActivityController.delete)

router.put("/:id", userActivityController.update)

router.post("/", userActivityController.create)

router.get("/get-by-design/:targetid", userActivityController.getByDesignId)

export default router;
