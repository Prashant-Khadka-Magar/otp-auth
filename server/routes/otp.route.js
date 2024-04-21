import express from 'express';
import { resendOtp, verifyAccount } from '../controller/otp.controller.js';

const router=express.Router();

router.route('/').post(verifyAccount)
router.route('/resend').post(resendOtp)

export default router;