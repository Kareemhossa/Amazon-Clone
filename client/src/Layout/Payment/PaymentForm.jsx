// PaymentForm.js
import React, { useState } from "react";
import axios from "axios";
//stripe
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// redux and router
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../Redux/cartSlice";
//firebase
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebase";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProduct = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.user);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const formattedTotal = parseFloat(subtotal).toFixed(2);
  const [error, setError] = useState(null);
  const [isProcessing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [credentials, setCredentials] = useState({
    name: user.name || "",
    phone: "",
    email: user.email || "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      const { id } = paymentMethod;
      const response = await axios.post(
        "http://localhost:5000/payment/create",
        {
          total: formattedTotal * 100,
          paymentMethodId: id,
        }
      );
      console.log("Server Response:", response.data);

      // Check payment success
      if (response.data.success) {
        console.log("Successful payment");
        //Add the product to Cloud Firestore
        const ref = doc(db, "users", user?.uid, "orders", paymentMethod.id);
        setDoc(ref, {
          cartProduct: cartProduct,
          amount: formattedTotal * 100,
          created: paymentMethod.created,
        });
        //remove the  product from the store
        cartProduct.forEach((product) => {
          dispatch(removeFromCart(product.id));
        });
        navigate("/orders", { replace: true });
        setSucceeded(true);
        setError(null);
      } else {
        console.error("Payment confirmation failed:", error.message);
        setSucceeded(false);
        setError(error);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setDisabled(e.empty);
    setError(error ? error.message : "");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-8  shadow-lg rounded-md grid grid-cols-1 gap-6 border"
    >
      <h2 className="pb-4 text-black text-2xl text-center font-semibold ">
        Card details
      </h2>
      <div className="space-y-8 ">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          required
          value={credentials.name}
          onChange={handleChange}
          className="w-full p-3 rounded-md border font-medium text-gray-600 bg-[#E8F0FE]"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          value={credentials.email}
          onChange={handleChange}
          className="w-full p-3 rounded-md border font-medium  text-gray-600 bg-[#E8F0FE]"
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          required
          value={credentials.phone}
          onChange={handleChange}
          className="w-full p-3 rounded-md border font-medium text-gray-600 bg-[#E8F0FE]"
        />

        <input
          type="text"
          placeholder="Address"
          name="address"
          required
          value={credentials.address}
          onChange={handleChange}
          className="w-full p-3 rounded-md border font-medium  text-gray-600 bg-[#E8F0FE]"
        />
      </div>

      {/** <label
        htmlFor="card-element"
        className=" text-gray-700 text-sm font-semibold "
      >
        Card details
      </label> */}
      <div className=" border p-4 rounded-md">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: { fontSize: "16px" },
            },
          }}
          onChange={handleCardChange}
        />
      </div>

      {error && <p className="text-red-500  text-center">{error}</p>}

      <button
        type="submit"
        disabled={isProcessing || disabled || succeeded}
        className="bg-blue-400 text-white py-2 px-4 rounded-md relative "
      >
        {succeeded ? (
          <p className="  py-2 px-4 rounded-md text-white font-bold text-center">
            Successful payment
          </p>
        ) : (
          <p className="  py-2 px-4 rounded-md text-xl font-bold text-center">
            Buy Now
          </p>
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
