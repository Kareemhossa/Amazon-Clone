import React from "react";
//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//component and Img
import PaymentForm from "../Layout/Payment/PaymentForm";
import PaymentReview from "../Layout/Payment/PaymentReview";
import { GB_CURRENCY } from "../GlobalState";
import { useSelector } from "react-redux";

const Payment = () => {
  const subtotal = useSelector((state) => state.cart.subtotal);
  const cartNumber = useSelector((state) => state.cart.cartNumber);
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  // console.log(stripePromise);

  return (
    <section className="min-w-[1000px] max-w-[1200px] m-auto shadow-md rounded-md  bg-white p-6  my-8">
      <div className=" text-center  h-11 my-5">
        <h1 className="py-2  text-4xl font-bold ">Checkouts Details</h1>
      </div>
      <main className="flex flex-col  lg:flex-row gap-4 justify-between items-center">
        {/* Left (Payment Review) */}
        <div className="w-full flex-1 px-6">
          <h2 className="pb-4 text-black text-2xl font-semibold ">
            {" "}
            Product Review
          </h2>
          <PaymentReview />
          <div className="text-base xl:text-2xl  text-center mb-4 font-semibold">
            Subtotal ({cartNumber} items):{GB_CURRENCY.format(subtotal)}
          </div>
        </div>

        {/* Right (Payment Form) */}
        <div className=" max-w-[450px] pt-8">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </main>
    </section>
  );
};
export default Payment;
