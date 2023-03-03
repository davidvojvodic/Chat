import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import signInImage from "../assets/signup.jpg";

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex-[2_2_0%] flex flex-col justify-center p-10 bg-gray-600">
        <div className="flex flex-col justify-start p-8 shadow bg-white rounded-[5px] transition ease-in delay-100">
          <p className="text-2xl font-roboto text-gray-500 font-[900]">
            {isSignup ? "Sign up" : "Sign In"}
          </p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="flex flex-col relative my-4">
                <label
                  htmlFor="fullName"
                  className="mb-2 text-[#3d4f68] text-[14px] font-roboto tracking-[.7px] leading-3"
                >
                  Full Name
                </label>
                <input
                  className="p-2 border-[1px] rounded-[5px] border-[#b8c4c2] text-[18px] outline-none transition-all ease-in-out delay-150 w-[85%] bg-white hover:border-[#dcdddd] placeholder:text-[#b1b1b1] placeholder:w-full placeholder:font-roboto focus:shadow-md active:shadow-md"
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="flex flex-col relative my-4">
              <label
                htmlFor="username"
                className="mb-2 text-[#3d4f68] text-[14px] font-roboto tracking-[.7px] leading-3"
              >
                Username
              </label>
              <input
                className="p-2 border-[1px] rounded-[5px] border-[#b8c4c2] text-[18px] outline-none transition-all ease-in-out delay-150 w-[85%] bg-white hover:border-[#dcdddd] placeholder:text-[#b1b1b1] placeholder:w-full placeholder:font-roboto focus:shadow-md active:shadow-md"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="flex flex-col relative my-4">
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 text-[#3d4f68] text-[14px] font-roboto tracking-[.7px] leading-3"
                >
                  Phone Number
                </label>
                <input
                  className="p-2 border-[1px] rounded-[5px] border-[#b8c4c2] text-[18px] outline-none transition-all ease-in-out delay-150 w-[85%] bg-white hover:border-[#dcdddd] placeholder:text-[#b1b1b1] placeholder:w-full placeholder:font-roboto focus:shadow-md active:shadow-md"
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="flex flex-col relative my-4">
                <label
                  htmlFor="avatarURL"
                  className="mb-2 text-[#3d4f68] text-[14px] font-roboto tracking-[.7px] leading-3"
                >
                  Avatar URL
                </label>
                <input
                  className="p-2 border-[1px] rounded-[5px] border-[#b8c4c2] text-[18px] outline-none transition-all ease-in-out delay-150 w-[85%] bg-white hover:border-[#dcdddd] placeholder:text-[#b1b1b1] placeholder:w-full placeholder:font-roboto focus:shadow-md active:shadow-md"
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="flex flex-col relative my-4">
              <label
                htmlFor="password"
                className="mb-2 text-[#3d4f68] text-[14px] font-roboto tracking-[.7px] leading-3"
              >
                Password
              </label>
              <input
                className="p-2 border-[1px] rounded-[5px] border-[#b8c4c2] text-[18px] outline-none transition-all ease-in-out delay-150 w-[85%] bg-white hover:border-[#dcdddd] placeholder:text-[#b1b1b1] placeholder:w-full placeholder:font-roboto focus:shadow-md active:shadow-md"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="flex flex-col relative my-4">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 text-[#3d4f68] text-[14px] font-roboto tracking-[.7px] leading-3"
                >
                  Confirm Password
                </label>
                <input
                  className="p-2 border-[1px] rounded-[5px] border-[#b8c4c2] text-[18px] outline-none transition-all ease-in-out delay-150 w-[85%] bg-white hover:border-[#dcdddd] placeholder:text-[#b1b1b1] placeholder:w-full placeholder:font-roboto focus:shadow-md active:shadow-md"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="mt-8 flex justify-start">
              <button className="rounded-[5px] bg-gray-400 border-[1px] border-gray-400 text-white font-roboto font-semibold py-3 px-6 outline-none cursor-pointer transition-all delay-100 ease-in-out hover:bg-gray-600">
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
          <div className="flex justify-start items-center mt-2">
            <p className="text-[15px] text-black font-semibold">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span
                onClick={switchMode}
                className="text-red-500 cursor-pointer font-bold"
              >
                {isSignup ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-[3_3_0%] flex shadow-md">
        <img src={signInImage} alt="sign in" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Auth;
