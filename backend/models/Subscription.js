import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  plan: { type: string, enum: ["basic", "pro", "enterprise"], required: true },
  price: Number,
  status: { type: string, enum: ["active", "canceled"], default: "active" },
  createAt: { type: Date, default: Date.now },
});

export default mongoose.model("Subscription", SubscriptionSchema);
