import { Middleware } from './../../middlewares/auth.middleware';
import express from "express";
import { NotificationController } from "../../controllers/notification.controller";

const router = express.Router();

const notificationController = new NotificationController()

const middleware = new Middleware()

router.get("/get-by-user/:userid", middleware.checkToken, notificationController.getByUserId)

router.put("/:id", middleware.checkToken, notificationController.update)

router.put("/update-read/:id", middleware.checkToken, notificationController.updateReadForManyNotification)

router.post("/", middleware.checkToken, notificationController.create)

export default router;
