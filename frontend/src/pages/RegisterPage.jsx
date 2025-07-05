import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen w-[90%] mx-auto py-12 items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
