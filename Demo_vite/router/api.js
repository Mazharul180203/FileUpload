import express from "express";
import * as AuthController from "../controller/AuthController.js";
import Authvarification from "../middleware/Authvarification.js";
import * as DetailsController from "../controller/DetailsController.js";
import * as UploadController from "../controller/UploadFilesController.js";

const router = express.Router();

router.post('/Registration', AuthController.Registration);
router.post('/VerifyLogin',AuthController.VerifyLogin);

router.post('/Details',Authvarification,DetailsController.Details)
router.post('/uploadFile',Authvarification,UploadController.uploadFile)

export default router;