import mongoose, { Schema } from "mongoose";

const planSchema = new Schema({
  name: { type: String, required: true, default: "Free" },
  max_file_size: { type: String, default: "unlimited" },
  max_account_space: { type: Number, required: true, default: 500 },
  max_drops: { type: String, required: true, default: "3" },
  unlimited_retrieval: { type: Boolean, required: true, default: false },
  max_lifespan_of_drop: { type: Number, required: true, default: 1 },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  googleID: { type: String, select: false },
  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
    required: true,
    default: new mongoose.Types.ObjectId("663e342d4ec2f7f9af2268e2"),
  },
  verification_code: { type: Number },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
});

const dropSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  file_name: { type: String, required: true },
  file_size: { type: Number, required: true },
  uploaded_at: { type: Date, default: Date.now },
  expires_at: { type: Date, required: true },
  retrieved_count: { type: Number, default: 0 },
  link: { type: String },
  text: { type: String },
  file_url: { type: String, required: true },
});

export const Plan = mongoose.models?.Plan || mongoose.model("Plan", planSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Drop = mongoose.models?.Drop || mongoose.model("Drop", dropSchema);

export type PlanType = {
  name: string;
  max_file_size: string;
  max_account_space: number;
  max_drops: string;
  unlimited_retrieval: boolean;
  max_lifespan_of_drop: number;
};
