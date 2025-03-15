import express from "express";
import { protect } from "../middleware/authMiddleware";
import { createCheckoutSession } from "../controllers/subscriptionController";

const router = express.router();
router.post("/create-checkout-session", protect, createCheckoutSession);

export default router;
