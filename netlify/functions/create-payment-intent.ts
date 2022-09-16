import { Handler } from "@netlify/functions";

const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler: Handler = async (event, context) => {
  console.log("netflify function");
  if (!event?.body) return { statusCode: 400, body: `Invalid event response` };
  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      payment_method_types: ["card"],
    });
    return { statusCode: 200, body: JSON.stringify({ paymentIntent }) };
  } catch (error) {
    console.error({ error });
    return { statusCode: 400, body: JSON.stringify({ error }) };
  }
};
export { handler };
