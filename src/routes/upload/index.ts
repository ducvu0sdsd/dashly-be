import { Middleware } from '../../middlewares/auth.middleware';
import { uploadMiddleware, uploadImagesToCloudinary, deleteImagesFromCloudinary } from './../../helpers/upload/upload';
import express from "express";

const router = express.Router();

const middleware = new Middleware()

router.post('/',  middleware.checkToken, uploadMiddleware, uploadImagesToCloudinary);

router.delete('/',  middleware.checkToken, uploadMiddleware, deleteImagesFromCloudinary);

export default router;
