import React from "react";
import { useForm } from "react-hook-form";

const ForgetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full  flex justify-center items-center  dark:bg-[#1a1a1a] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-10  dark:bg-[#2a2a2a] rounded-2xl "
      >
        <fieldset className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 dark:text-white">
            Forgot Password?
          </h2>
          <p className="text-center text-base text-gray-600 dark:text-gray-300">
            Enter your email and we’ll send you instructions to reset your
            password.
          </p>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 mt-2">Email is required</p>
            )}
          </div>

          <button
            type="submit"
            className="btn w-full bg-[#C8E344] hover:bg-[#b0cc2f] text-black text-lg h-14"
          >
            Send Reset Link
          </button>

          <p className="text-center text-base mt-4 text-gray-700 dark:text-gray-300">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </a>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgetPass;
