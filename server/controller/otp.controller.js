import asyncHandler from "express-async-handler";
import { Otp } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import sendOtpMail from "../utils/sendOtp.js";
import otpGenerator from "../utils/otpGenerator.js";

const verifyAccount = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    const userAccount = await Otp.findOne({ email });

    if (!userAccount) {
      return res.status(404).json("User Not Found");
    }

    if (userAccount.otp !== otp) {
      return res.status(400).json("Incorrect OTP");
    }

    const user = await User.findOne({ email: userAccount.email });

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { isVerified: true },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(500).json("Failed to update user");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const resendOtp = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const exist = await Otp.findOne({ email });

    if (exist) {
      await Otp.deleteOne({ email });
    }

    const otp = otpGenerator();

    await Otp.create({
      email,
      otp,
    });

    await sendOtpMail(user.email, user.username, otp);
    res.status(201).json({ user, otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export { verifyAccount, resendOtp };
