import React from "react";
//React Router and Reudx
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//img and component
import CheckoutProduct from "../Layout/Checkout/CheckoutProduct";
import checkoutImg from "../Assets/checkoutAd2.jpg";
import { toast } from "react-toastify";
import { GB_CURRENCY } from "../GlobalState";

const Checkout = () => {
  const cartNumber = useSelector((state) => state.cart.productsNumbers);
  const cartProduct = useSelector((state) => state.cart.products);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const handleCheckout = () => {
    if (user) {
      navigate("/payment");
    } else {
      toast.warn("Please login");
      navigate("/login");
    }
  };

  return (
    <div className="  bg-[#F3F4F6] ">
      <main className="min-w-[1000px] max-w-[1500px] m-auto p-4">
        <div className="grid grid-cols-10 gap-2">
          {/* Left */}
          <article className="col-span-8 rounded divide-y divide-gray-400">
            <div className=" mb-4 ">
              <img
                className=" h-[200px] w-full cursor-pointer rounded-sm"
                src={checkoutImg}
                alt="Banner advertising"
              />
              <div className="bg-white p-4 mt-4">
                {cartProduct.length > 0 ? (
                  <div>
                    <h1 className=" text-4xl font-bold my-2">Hello</h1>
                    <h2 className="text-2xl font-bold my-2">
                      Your shopping Basket
                    </h2>
                  </div>
                ) : (
                  <div className="text-center my-4">
                    <h2 className="text-2xl font-bold mb-2  ">
                      Your Amazon cart is empty
                    </h2>
                    <div className="flex items-center justify-center">
                      {user ? null : (
                        <div className="my-6 ">
                          <Link to="/login">
                            <button
                              type="submit"
                              className=" bg-[#FF9900] py-2 px-4 rounded-md hover:bg-[#ff9900e4] "
                            >
                              Sign in to your account
                            </button>
                          </Link>
                        </div>
                      )}
                      <div className="my-6">
                        <Link
                          to={"/"}
                          className="rounded-md text-[#199473] font-semibold hover:underline "
                        >
                          Add To Card
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              {cartProduct.length > 0 ? (
                <CheckoutProduct cartProduct={cartProduct} />
              ) : (
                <p className="mt-4">
                  The price and availability of items at amazon.eg are subject
                  to change. The Cart is a temporary place to store a list of
                  your items and reflects each item's most recent price. Do you
                  have a gift card or promotional code? We'll ask you to enter
                  your claim code when it's time to pay.
                </p>
              )}
            </div>
          </article>
          {/* Right  checkout subtotal*/}
          {cartProduct.length > 0 ? (
            <aside className="col-span-2 p-4 rounded mx-2 bg-white flex flex-col justify-evenly h-[250px]">
              <div className="flex flex-col justify-between p-2">
                <div className="text-base xl:text-xl  text-center mb-4 font-semibold">
                  Subtotal ({cartNumber} items):{GB_CURRENCY.format(subtotal)}
                </div>

                <p className="text-sm  font-normal text-green-500 m-2">
                  FREE Delivery Your first order qualifies for FREE Delivery.
                </p>
                <button
                  onClick={handleCheckout}
                  type="submit"
                  className="w-full bg-[#FF9900] font-semibold py-2 mt-4 rounded-md hover:bg-[#ff9900e4]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </aside>
          ) : (
            <aside className="col-span-2 p-4 rounded mx-2 bg-white flex flex-col justify-evenly h-[250px]">
              <div className="text-sm xl:text-normal text-[#199473] mb-2">
                Your order qualifies for{" "}
                <span className="font-bold">FREE DELIVERY</span>. Delivery
                Details
              </div>
              {user ? (
                <div className="text-center">
                  <Link to="/">
                    <button
                      type="submit"
                      className="bg-[#1ab188] py-2 px-4 rounded-md text-white hover:bg-[#199473]"
                    >
                      Add a new products
                    </button>
                  </Link>
                </div>
              ) : (
                <p className="text-sm font-normal mt-4">
                  For the best experience{" "}
                  <Link
                    to={"/login"}
                    className="underline inline-block font-semibold"
                  >
                    sign in to your account
                  </Link>
                </p>
              )}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
