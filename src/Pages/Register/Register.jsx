import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { createUser, signInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const googleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const password = watch("password");

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl p-12 "
      >
        <fieldset className="space-y-6">
          <h2 className="text-4xl font-extrabold mb-6">Create an Account</h2>

          {/* Name */}
          <div>
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full bg-[#C8E344] hover:bg-[#b0cc2f] text-black text-lg h-14"
          >
            Register
          </button>

          {/* Footer Links */}
          <p className="text-center text-base mt-4">
            Already have an account?{" "}
            <Link to={"/login"}>
              <span className="text-blue-600 font-semibold cursor-pointer">
                Login
              </span>
            </Link>
          </p>

          {/* Divider */}
          <div className="divider text-gray-400">Or</div>

          {/* Google Auth */}
        </fieldset>
        <button
          type="button"
          onClick={googleLogin}
          className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-black text-lg h-14 flex items-center justify-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google"
            className="w-6 h-6"
          />
          Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
