import React, { useState } from "react";
// React Router
import { Link, useNavigate } from "react-router-dom";
// Firbase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBase/firebase";
// Images and Icons
import logo from "../../Assets/Amazon_logo.png";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((ShowPassword) => !ShowPassword);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters long.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in ");
      navigate("/checkout");
      // console.log({ email, password });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use.");
      } else {
        toast.error("Error signing up:", error.message);
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col gap-12 items-center pt-10 bg-amazonclone-background">
      <Link to="/">
        <img src={logo} alt="Amazone logo" className="h-16" />
      </Link>
      <div className=" w-full max-w-[450px] bg-white mx-auto flex-col justify-center px-12 py-8 rounded-lg shadow-md border">
        <h2 className="text-4xl font-bold text-center pb-8">Sign In</h2>
        <form className="space-y-8 " onSubmit={handelSubmit} method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-lg mb-2  font-semibold"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-lg mb-2  font-semibold"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BiSolidShow size={20} style={{ color: "#FEBD69" }} />
                ) : (
                  <BiSolidHide size={20} />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9900] text-lg font-semibold py-2 rounded-md hover:bg-[#ff9900e4] "
          >
            Sign In
          </button>
          <p className="font-thin text-xs">
            By creating an account, you agree to Amazon's Fake{" "}
            <a href="/" className="underline hover:text-[#ff9900e4]">
              Clone Conditions of Use{" "}
            </a>
            and
            <a href="/" className="underline hover:text-[#ff9900e4]">
              Privacy Notice.
            </a>
          </p>
        </form>
        <Link to="/register">
          <button className="w-full bg-[#E6E6E6]  font-mediam py-2 mt-6  rounded-md hover:bg-[#b7b7b7] ">
            Create Your Amazon Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
