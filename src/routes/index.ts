import express from "express";
import userRoutes from './user'
import designRoutes from './design'
import authRoutes from './auth'
import uploadRoute from './upload'
import UserActivitiesRoute from './user-activity'
import CommentRoute from './comment'

const router = express.Router();

router.use("/api/v1/designs", designRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/auths", authRoutes);
router.use("/api/v1/upload", uploadRoute)
router.use("/api/v1/user-activities", UserActivitiesRoute)
router.use("/api/v1/comments", CommentRoute)

export default router;
