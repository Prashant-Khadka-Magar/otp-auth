import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema({
  email: {
    type:String,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 59,
  },
});

export const Otp = mongoose.model("Otp", otpSchema);
