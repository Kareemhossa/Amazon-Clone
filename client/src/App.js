import React from "react";
//React Router
import { Routes, Route } from "react-router-dom";

//componant
import HomePage from "./Pages/HomePage";
import NavBar from "./Layout/homepage/NavBar";
import Orders from "./Pages/Orders";
import ProductPage from "./Pages/ProductPage";
import CategoryPage from "./Pages/CategoryPage";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import ProtectRoute from "./Pages/Authenticate/ProtectRoute";
import Register from "./Pages/Authenticate/Register";
import Login from "./Pages/Authenticate/Login";
import { useGlobalState } from "./GlobalState";
import { useSelector } from "react-redux";

function App() {
  const isloading = useSelector((state) => state.user.isloading);
  useGlobalState();

  return (
    <div>
      <NavBar />
      {isloading ? (
        <div className="flex justify-center mt-4">
          <h2 className="text-lg text-gray-800">Loading...</h2>
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:title" element={<CategoryPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment"
            element={
              <ProtectRoute>
                <Payment />
              </ProtectRoute>
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
