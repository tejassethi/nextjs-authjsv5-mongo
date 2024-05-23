import mongoose, { Schema } from "mongoose";

const planSchema = new Schema({
  name: { type: String },
  max_account_space: { type: Number },
  max_drops: { type: Number },
  max_lifespan_of_drop: { type: Number },
  max_retrieval: { type: Number },
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
    default: new mongoose.Types.ObjectId("6648677b5167ea9cbc4310d0"),
  },
  space_used: { type: Number, default: 0 },
  drops_made: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
});

const dropSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  words: { type: String, unique: true },
  uploaded_at: { type: Date, default: Date.now },
  retrieved_count: { type: Number, default: 0 },
  link: { type: String },
  text: { type: String },
  file_name: { type: String },
  file_size: { type: Number },
  file_url: { type: String },
  expires_at: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 1 day from now
    index: { expires: 0 }, // TTL index
  },
});

export const Plan = mongoose.models?.Plan || mongoose.model("Plan", planSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Drop = mongoose.models?.Drop || mongoose.model("Drop", dropSchema);

export type PlanType = {
  name: String;
  max_account_space: Number;
  max_drops: Number;
  max_lifespan_of_drop: Number;
  max_retrieval: Number;
};
