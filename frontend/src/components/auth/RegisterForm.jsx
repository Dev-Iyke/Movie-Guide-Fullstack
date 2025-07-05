import React, { useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Button from "../ui/Button";

// const local = "http://localhost:4000/api/v1";
const prod = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:4000/api/v1";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [signupLoading, setSignupLoading] = useState(false);


  const handleSubmit = async (e) => {
    setSignupLoading(true)
    try {
      e.preventDefault();
      console.log("submitting");

      const payload = {
        email,
        password,
        firstName,
        lastName,
        role: "User",
      };
      const signupResponse = await fetch(`${prod}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response = await signupResponse.json();

      if (response.success) {
        console.log(response);
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred");
    } finally {
      setSignupLoading(false)
    }
  };


  return (
    <div className="bg-white p-6 rounded-2xl max-w-[500px] w-full">
      <div className="flex flex-col gap-2 items-center pb-8">
        <h2 className="text-center text-3xl font-medium">Signup</h2>
        <p className="font-light text-center">
          Sign up to shop the best items for little cost
        </p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-500 font-medium">
            Email
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="border border-gray-200 p-2 rounded-lg outline-none font-light text-sm"
            placeholder="Your email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-gray-500 font-medium">
            First Name
          </label>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="firstName"
            name="firstName"
            id="firstName"
            className="border border-gray-200 p-2 rounded-lg outline-none font-light text-sm"
            placeholder="Your First Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-gray-500 font-medium">
            Last Name
          </label>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="lastName"
            name="lastName"
            id="lastName"
            className="border border-gray-200 p-2 rounded-lg outline-none font-light text-sm"
            placeholder="Your Last Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-500 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="border border-gray-200 p-2 rounded-lg outline-none font-light text-sm w-full pr-10"
              placeholder="Your Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                // Eye open SVG
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                // Eye closed SVG
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.383A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Button>Signup {signupLoading && <Loader />}</Button>

        <p className="text-center mt-8">Already have an account? <NavLink className={'text-blue-600 underline'} to={'/login'}>Login</NavLink></p>
      </form>
    </div>
  );
};

export default RegisterForm;