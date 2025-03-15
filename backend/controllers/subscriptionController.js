import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body;
    const userId = req.user.id; // Extracted from authMiddleware

    const price = plan === "basic" ? 1000 : 2000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `${plan} Plan` },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/dashboard",
      cancel_url: "http://localhost:5173/subscription",
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
