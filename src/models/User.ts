import mongoose, {
  InferSchemaType,
  model,
  Model,
  models,
  Schema,
} from "mongoose";
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;

const userBadgeSchema = new Schema({
  badge: { type: Schema.Types.ObjectId, ref: "Badge" },
  dateAwarded: { type: Date },
});

const userSchema = new Schema(
  {
    image: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "no email provided"],
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
    },
    houseOfLight: {
      type: String,
    },
    about: {
      type: String,
    },
    address: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["user", "admin", "super-user", "influencer"],
      default: "user",
    },
    history: {
      type: [Schema.Types.ObjectId],
      ref: "Video",
    },
    subscribedPlans: [{ type: Schema.Types.ObjectId, ref: "SubscribedPlan" }],
    loginCount: { type: Number, default: 0 },
    attemptQuiz: { type: [Schema.Types.ObjectId], ref: "Quiz" },
    streak: { type: Number, default: 0 },
    badges: [userBadgeSchema],
    certificates: {
      type: [String],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    referredBy: {
      type: String,
      default: "",
    },
    referralCode: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      resolve(isMatch);
    });
  });
};

type UserType = Model<InferSchemaType<typeof userSchema>>;
const User: UserType = models.User || model("User", userSchema);

export default User;
