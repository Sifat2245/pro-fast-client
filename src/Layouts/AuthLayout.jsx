import React from "react";
import { Outlet } from "react-router";
import authimage from "../assets/authImage.png";
import ProFastLogo from "../Pages/shared/ProfastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-start lg:justify-center p-6 lg:p-20">
        <div className="mb-10">
          <ProFastLogo />
        </div>
        <div className="flex-grow flex items-center justify-center">
          <Outlet />
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-[#FAFDF0]">
        <img src={authimage} className="max-w-md" alt="Authentication Illustration" />
      </div>
    </div>
  );
};

export default AuthLayout;
