import { Schema, models, model, Model, InferSchemaType } from "mongoose";

const otpSchema = new Schema({
  otp: [
    {
      type: String,
      required: true,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
  },
  expirationDate: {
    type: Date,
    default: Date.now,
    expires: "2m",
  },
});

otpSchema.pre("save", function (next) {
  if (this.isModified("otp")) {
    this.expirationDate = new Date();
  }
  next();
});

type OTPType = Model<InferSchemaType<typeof otpSchema>>;
const OTP: OTPType = models.OTP || model("OTP", otpSchema);

export default OTP;
