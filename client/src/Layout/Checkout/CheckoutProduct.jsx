import React from "react";
//React Router and Rudex
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementCart,
  decrementCart,
} from "../../Redux/cartSlice";
//componants
import ProductPageDetails from "../Prouduct/ProductPageDetails";
import { GB_CURRENCY } from "../../GlobalState";

const CheckoutProduct = ({ cartProduct }) => {
  const dispatch = useDispatch();

  return (
    <section className="min-w-[1000px] max-w-[1200px] m-auto ">
      {cartProduct.map((cartProduct) => (
        <main
          key={cartProduct.id}
          className="my-6 border bg-gray-50 rounded-md shadow-sm transition duration-300 transform  "
        >
          <div className="h-[250px] flex justify-between items-center my-2">
            {/**left  */}
            <div className="flex-none p-4">
              <Link to={`/product/${cartProduct.id}`}>
                <img
                  className="max-h-[250px] max-w-[200px]  rounded-md "
                  src={cartProduct.img}
                  alt="Search result product"
                />
              </Link>
            </div>
            {/**center */}
            <div className="flex-auto pl-4 bg-gray-100 rounded-md">
              <div className="font-medium text-black p-2">
                <Link to={`/product/${cartProduct.id}`}>
                  <ProductPageDetails
                    item={cartProduct}
                    // avgRating={false}
                    ratings={false}
                  />
                  <div className="font-semibold text-lg  text-red-700  mb-2">
                    {GB_CURRENCY.format(cartProduct.price)}
                  </div>
                </Link>
              </div>
            </div>
            {/**Right */}
            <div className=" px-8 mx-auto ">
              <div className="font-semibold text-xl mb-4 text-center">
                {GB_CURRENCY.format(cartProduct.price * cartProduct.quantity)}
              </div>
              <div className="grid grid-cols-3 w-20 text-center">
                <div
                  onClick={() => {
                    dispatch(decrementCart(cartProduct.id));
                  }}
                  className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer hover:bg-gray-300 text-gray-700"
                >
                  -
                </div>
                <div className="text-lg xl:text-xl font-semibold bg-gray-100 text-gray-700">
                  {cartProduct.quantity}
                </div>
                <div
                  onClick={() => {
                    dispatch(incrementCart(cartProduct.id));
                  }}
                  className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer hover:bg-amazonclone-yellow2 text-gray-700"
                >
                  +
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(removeFromCart(cartProduct.id));
                }}
                className=" rounded-md  px-4 py-2 mt-2 text-normal font-medium text-gray-400   cursor-pointer hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </main>
      ))}
    </section>
  );
};

export default CheckoutProduct;
