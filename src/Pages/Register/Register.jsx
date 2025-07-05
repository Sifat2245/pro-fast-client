import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const { createUser, signInWithGoogle, updateUser } = useAuth();
  const [profileImage, setProfileImage] = useState("");
  const axiosInstance = useAxios();
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state || '/';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async (result) => {
        console.log(result.user);

        //update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profileImage,
        };
        updateUser(userProfile)
          .then(() => {
            console.log("profile name and image updated");
            navigate(from)
          })
          .catch((error) => {
            console.log("error", error);
          });

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: profileImage,
          role: "user", //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const googleLogin = () => {
    signInWithGoogle()
      .then(async(result) => {
        console.log(result.user);
        const user=  result.user

         const userInfo = {
          email: user.email,
          displayName: user.displayName,
          role: "user", //default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

         const res = await axiosInstance.post("/users", userInfo);
        console.log(res.data);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imageURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageURL, formData);
    setProfileImage(res.data.data.url);
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
          {/* image */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Image Upload
            </label>

            <div className="relative w-full">
              <input
                type="file"
                id="file-upload"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-14 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 text-lg cursor-pointer hover:bg-gray-50 transition"
              >
                Choose File
              </label>
            </div>

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
