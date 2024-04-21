import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import sendOtpMail from "../utils/sendOtp.js";
import otpGenerator from "../utils/otpGenerator.js";

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist) {
      res.status(300).json("User already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const otp = otpGenerator();

    await Otp.create({
      email: user.email,
      otp,
    });

    await sendOtpMail(user.email, user.username, otp);

    res.status(201).json({ user, otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(300).json("User doesn't exists");
    }

    if (user.password !== password) {
      res.status(300).json("Password doesn't match");
    }

    if (!user.isVerified) {
      res.status(300).json("Please verify the email");
    }

    const loggedInUser = await User.findOne({ _id: user._id }).select(
      "-password"
    );

    res.status(200).json(loggedInUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





export { register, login };
