import express from "express";
import userRoutes from './user'
import designRoutes from './design'
const router = express.Router();

router.use("/api/v1/designs", designRoutes);
router.use("/api/v1/users", userRoutes);

export default router;
