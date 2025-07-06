import React from "react";
import { motion } from "framer-motion"; //eslint-disable-line
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json"; // Not from public!

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center  text-black px-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md">
        <Lottie
          animationData={forbiddenAnimation}
          loop
          autoplay
          style={{ height: "250px", width: "250px", margin: "0 auto" }}
        />
        <h1 className="text-4xl font-bold mb-4 text-[#CAEB66]">403 Forbidden</h1>
        <p className="text-lg mb-6">
          You don’t have permission to access this page.<br />
          Please contact the administrator or return to a safe page.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-full text-black font-semibold bg-[#CAEB66] hover:bg-[#b5d94d] transition"
        >
          Go to Home
        </button>
      </div>
    </motion.div>
  );
};

export default Forbidden;
