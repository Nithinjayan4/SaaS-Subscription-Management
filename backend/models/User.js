import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  subscriptions: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
});
export default mongoose.model("User", userSchema);
