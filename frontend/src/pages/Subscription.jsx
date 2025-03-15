import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51R2oIHCvq5gX2tXGZn1U6JZw70ARAOYC40tDbQlHBwt3KUi4qSQyY4fu161ptlb4NHXB62hzAmyNRswwtHXbBalN00DbDyRPqF"); // Replace with your actual Stripe Public Key

const Subscription = () => {
  const [plan, setPlan] = useState("");

  const handleSubscribe = async () => {
    try {
      const stripe = await stripePromise;
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/subscription/create-checkout-session",
        { plan },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe checkout
      await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Subscription failed! Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Choose a Plan</h2>
      <select onChange={(e) => setPlan(e.target.value)} className="border p-2 m-2">
        <option value="">Select Plan</option>
        <option value="basic">Basic - $10/month</option>
        <option value="pro">Pro - $20/month</option>
      </select>
      <button onClick={handleSubscribe} className="bg-blue-500 text-white p-2 m-2">Subscribe with Stripe</button>
    </div>
  );
};

export default Subscription;
