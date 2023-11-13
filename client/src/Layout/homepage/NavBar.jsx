import React from "react";
//React Router and Redux
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/userSlice";
import { auth } from "../../FireBase/firebase";
import { signOut } from "firebase/auth";
//icons and image
import logo from "../../Assets/Logoamazon.png";
import { LuShoppingCart } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";

const NavBar = () => {
  const cart = useSelector((state) => state.cart.productsNumbers);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };

  return (
    <header className="bg-amazonclone w-full mx-auto min-w-[1000px]">
      {/**Nav TOP */}
      <div className="flex items-center justify-center p-4 px-8 h-20">
        {/**Amazon logo */}
        <Link to="/">
          <img src={logo} alt="Amazon logo" className="h-10 w-full mt-2" />
        </Link>
        {/**Search Bar */}
        <div className="flex flex-1 items-center justify-center mx-2">
          <input className="w-11/12 h-8 p-2" type="text" />
          <FaSearch
            className="bg-amazonclone-yellow2 text- p-1 h-8 cursor-pointer"
            size={25}
          />
        </div>
        {/**Navbar Links */}
        <div className="flex justify-between items-center text-white">
          {/** for signin - sginout */}
          {user ? (
            <div className="flex flex-col items-center mx-2 hover:border cursor-pointer">
              <span className="text-base font-semibold">Hello</span>
              <button onClick={handelLogout}>
                <span className="text-base font-semibold text-amazonclone-yellow2">
                  {user.name ? user.name : "dude"}
                </span>
              </button>
            </div>
          ) : (
            <Link to="/login">
              <span className="text-base font-bold hover:border">Login</span>
            </Link>
          )}

          {/** for return order */}
          {user ? (
            <Link to="/orders">
              <div className="flex flex-col items-center mx-2 hover:border ">
                <span className="text-base font-semibold">Return</span>
                <span className="text-base font-semibold">Order</span>
              </div>
            </Link>
          ) : (
            <Link to="/orders">
              <div className="flex flex-col items-center mx-2 hover:border ">
                <span className="text-base font-bold">Order</span>
              </div>
            </Link>
          )}

          {/**checkout */}
          <Link to="/checkout">
            <div className="flex hover:border items-center mx-2">
              <LuShoppingCart size={35} />
              <div className="flex flex-col items-center mx-2">
                <p className="text-amazonclone-yellow2 font-bold">{cart}</p>
                <div className=" text-xs xl:text-sm font-bold">Cart</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/**Nav bottom */}
      <div className="bg-amazonclone-light_blue w-full h-10 mx-auto">
        <div className="flex items-center p-2 px-8 h-10">
          {/**Address*/}
          <div className="flex items-center cursor-pointer pr-4">
            <TiLocation className="text-amazonclone-yellow2" />
            <span className="text-base font-medium text-white pl-2">
              Delivery to location
            </span>
          </div>
          {/**Products Links*/}
          <div className="flex flex-1 justify-center gap-4 px-4 text-white">
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              All Products
            </Link>
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              Mobile Phones
            </Link>
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              Electronics
            </Link>
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              Applications
            </Link>
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              Fashion
            </Link>
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              Books
            </Link>
            <Link
              to="/"
              className="hover:text-amazonclone-yellow2 transition ease"
            >
              Office Products
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
