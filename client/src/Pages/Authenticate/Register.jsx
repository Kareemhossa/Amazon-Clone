import React, { useState } from "react";
// React Router and Redux
import { Link, useNavigate } from "react-router-dom";
// Firbase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../FireBase/firebase";
// Images and Icons
import logo from "../../Assets/Amazon_logo.png";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
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
    if (password !== repassword) {
      toast.warn("Passwords do not match.");
      return;
    }

    try {
      createUserWithEmailAndPassword(auth, email, password).then((authUser) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          navigate("/checkout");
          // console.log(authUser.user);
          toast.success("Account Created");
        });
      });
    } catch (error) {
      if (error.code === "email-already-in-use") {
        toast("Email is already in use.");
      } else {
        toast.error("Error signing up");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center pt-10 bg-amazonclone-background">
      <Link to="/">
        <img src={logo} alt="Amazone logo" className="h-12" />
      </Link>
      <div className=" w-full max-w-[450px] bg-white mx-auto flex-col justify-center px-12 py-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-center pb-8">Create account</h2>
        <form className="space-y-4 " onSubmit={handelSubmit} method="POST">
          <div>
            <label htmlFor="name" className="block text-lg mb-2  font-semibold">
              Your Name
            </label>
            <input
              id="name"
              type="name"
              placeholder="Enter your name"
              autoComplete="name"
              value={name}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div>
            <label
              htmlFor="password"
              className="block text-lg mb-2  font-semibold"
            >
              Re-enter password
            </label>
            <div className="relative">
              <input
                id="repassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={repassword}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setRepassword(e.target.value)}
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
            Create
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

        <h2 className=" font-mediam py-2 mt-6  ">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold hover:underline hover:text-blue-700"
          >
            Sign in
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default Register;
