import React, { useEffect, useState } from "react";
//React Router and Reudx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Firbaase Func
import { db } from "../FireBase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Orders = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const ordersData = [];
    const ordersRef = collection(db, "users", user.uid, "orders");

    const subscriber = onSnapshot(ordersRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      // console.log("Orders Data:", ordersData);
      // Accessing cartProduct array
      const Product = ordersData[0]?.data?.cartProduct || [];
      console.log("Cart Product:", Product);

      setOrders(Product);
    });
    // return cleanup function
    return () => subscriber();
  }, [user]);

  return (
    <div className="min-w-[1000px] max-w-[1200px] m-auto shadow-md rounded-md bg-white p-6 my-8">
      <h2 className="font-bold text-2xl pb-8">Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="flex border bg-white shadow-sm rounded-md my-4 h-40  hover:border-black hover:border-2"
          >
            {/* Left - Product Image */}
            <div className="p-4">
              <img
                className="h-full rounded-md"
                src={order.img}
                alt="Product"
              />
            </div>

            {/* Right - Product Details */}
            <div className="flex-1 p-4 bg-gray-50 rounded-md">
              <div className="p-4 flex flex-col justify-between">
                <div>
                  {/* Product Title */}
                  <h2 className="text-xl xl:text-2xl font-medium mb-2">
                    {order.title}
                  </h2>

                  {/* Brand and Ratings */}
                  <p className="text-sm xl:text-base mb-2">
                    by <span className="text-blue-500">{order.brand}</span>
                  </p>
                  <p className="text-sm xl:text-base mb-2">
                    Ratings:{" "}
                    <span className="text-blue-500">{order.ratings}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-xl">
          No orders found.{" "}
          <Link to="/" className="underline hover:text-yellow-500">
            Add To Card
          </Link>
          .
        </p>
      )}
      {!orders ? null : (
        <div>
          <p className="text-center text-xl font-semibold pt-5">
            <Link to="/" className="underline hover:text-yellow-500">
              Go Back and Add a new product
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};
export default Orders;
