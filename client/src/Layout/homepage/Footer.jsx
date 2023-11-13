import React from "react";
//React Router
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <footer className=" h-[550px] w-full mx-auto mt-6 min-w-[1000px]">
      {/**Top footer */}
      <div className="bg-white w-full h-[200px] flex justify-center items-center">
        {user ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2  ">
              Your Amazon cart is empty
            </h2>
            <Link
              to={"/"}
              className=" text-lg rounded-md text-[#199473] font-semibold hover:underline "
            >
              Add To Card
            </Link>
          </div>
        ) : (
          <div className=" flex flex-col justify-center items-center p-4">
            {" "}
            <p className="text-base font-medium p-4">
              See personalized recommendations
            </p>
            {/** for signin - sginout */}
            <Link to="/login">
              <button
                type="submit"
                className=" bg-[#FF9900] text-l font-medium py-3 px-6 rounded-md hover:bg-[#ff9900e4] "
              >
                Sign In
              </button>
            </Link>
            <p className="text-base font-medium p-4">
              New customer?
              <Link to="/login" className="text-[#FF9900] hover:underline">
                Start here
              </Link>
            </p>{" "}
          </div>
        )}
      </div>
      {/**Center footer */}
      <div className=" bg-[#232F3E] h-[300px] flex text-white">
        <div className="grid grid-cols-4 gap-12 p-4 m-auto">
          {/** ul col */}
          <div>
            <h3 className="font-bold text-amazonclone-yellow2">
              Get to Know Us
            </h3>
            <ul className="pt-4 text-sm text-[#DDD]">
              <li className="py-1">
                <a href="/" className="hover:underline">
                  About Amazon
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Amazon Science
                </a>
              </li>
            </ul>
          </div>
          {/** ul col */}
          <div>
            <h3 className="font-bold text-amazonclone-yellow2">Shop with Us</h3>
            <ul className="pt-4 text-sm text-[#DDD]">
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Your Account
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Your Orders
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Your Addresses
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Your List
                </a>
              </li>
            </ul>
          </div>
          {/** ul col */}
          <div>
            <h3 className="font-bold text-amazonclone-yellow2">
              Make Money with Us
            </h3>
            <ul className="pt-4 text-sm text-[#DDD]">
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Protect and build your brand
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Advertise Your Products
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Sell on Amazon
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Fulfillment by Amazon
                </a>
              </li>
            </ul>
          </div>
          {/** ul col */}
          <div>
            <h3 className="font-bold text-amazonclone-yellow2">
              Let Us Help You
            </h3>
            <ul className="pt-4 text-sm text-[#DDD]">
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Help
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Shipping & Delivery
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Returns & Replacements
                </a>
              </li>
              <li className="py-1">
                <a href="/" className="hover:underline">
                  Amazon App Download
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/**Botton footer */}
      <div className="bg-amazonclone text-white text-center h-[50px]">
        <p className="py-2">
          <a
            href="mailto:kareemhosam18@gmail.com"
            className="cursor-pointer  hover:text-amazonclone-yellow2 transition ease"
          >
            &copy; {new Date().getFullYear()} Kareem Hossam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
