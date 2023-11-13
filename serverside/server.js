const express = require("express");
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Welcome server is available");
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/payment/create", async (req, res) => {
  try {
    const { total, paymentMethodId } = req.body;
    // handel the payment currency
    const roundedTotal = Math.round(total);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: roundedTotal,
      currency: "USD",
      payment_method: paymentMethodId,
      confirm: true,
      return_url: "http://localhost:3000",
    });
    console.log("paymentIntent", paymentIntent);
    // console.log(typeof total);

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
      message: "Payment successful",
      success: true,
    });
  } catch (e) {
    console.error("Error processing payment:", e.message);
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`)
);
