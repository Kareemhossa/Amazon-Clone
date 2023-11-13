import React from "react";
//  React Resdux and Router
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentReview = () => {
  const cartProduct = useSelector((state) => state.cart.products);

  return (
    <div>
      {cartProduct.map((cartProduct) => (
        <div
          key={cartProduct.id}
          className="flex border bg-white shadow-sm rounded-md my-4 h-40  hover:border-black hover:border-2"
        >
          {/* Left - Product Image */}
          <div className="p-4">
            <Link to={"/checkout"}>
              <img
                className="h-full rounded-md"
                src={cartProduct.img}
                alt="Product"
              />
            </Link>
          </div>

          {/* Right - Product Details */}
          <div className="flex-1 p-4 bg-gray-50 rounded-md">
            <Link to={"/checkout"}>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  {/* Product Title */}

                  <h2 className="text-lg font-medium mb-2">
                    {cartProduct.title}
                  </h2>

                  {/* Brand and Ratings */}
                  <p className="text-sm xl:text-base mb-2">
                    by{" "}
                    <span className="text-blue-500">{cartProduct.brand}</span>
                  </p>
                  <p className="text-sm xl:text-base mb-2">
                    Ratings:{" "}
                    <span className="text-blue-500">{cartProduct.ratings}</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentReview;
