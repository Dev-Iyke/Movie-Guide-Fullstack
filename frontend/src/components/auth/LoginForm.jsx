import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { AuthContext } from "../../context/features";
import Button from "../ui/Button";

// const local = "http://localhost:4000/api/v1";
const prod = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:4000/api/v1";
console.log(prod)

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    setLoginLoading(true);
    try {
      e.preventDefault();
      console.log("submitting");

      const payload = {
        email,
        password,
      };

      const loginResponse = await fetch(`${prod}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response = await loginResponse.json();

      if (response.success) {
        console.log(response);
        setToken(response.accessToken);
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message);
        return;
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl max-w-[500px] w-full">
      <div className="flex flex-col gap-2 items-center pb-8">
        <h2 className="text-center text-3xl font-medium">Log In</h2>
        <p className="font-light text-center">
          Continue your experience. shop the best items
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                // Eye closed SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.249-2.383A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <Button>Login {loginLoading && <Loader />}</Button>
      </form>

      <p className="text-center mt-8">New here? <NavLink className={'text-blue-600 underline'} to={'/register'}>Sign Up</NavLink></p>
    </div>
  );
};

export default LoginForm;
