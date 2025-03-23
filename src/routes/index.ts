import express from "express";
import userRoutes from './user'
import designRoutes from './design'
import authRoutes from './auth'

const router = express.Router();

router.use("/api/v1/designs", designRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/auths", authRoutes);

export default router;
