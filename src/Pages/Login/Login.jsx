import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const {signInWithGoogle , loginUser} = useAuth()
  const { register, handleSubmit, formState:{errors} } = useForm();

  const onSubmit = data => {
    console.log(data);
    loginUser(data.email, data.password)
    .then(result =>{
      console.log(result.user);
    })
    .catch(error =>{
      console.log(error);
    })

  }

  const loginWithGOogle = () =>{
    signInWithGoogle()
    .then(result =>{
      console.log(result);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  return (
    <div className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl p-12 rounded-2xl">
        <fieldset className="space-y-6">
          <h2 className="text-4xl font-extrabold mb-6">Welcome Back</h2>

          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              {...register("password",{
                required:true,
                minLength: 6
              })}
              className="input input-bordered w-full h-14 text-lg"
              placeholder="Enter your password"
            />
            {
                errors.password?.type === 'required' && <p className="text-red-500 mt-3">Password is required</p>
            }
            {
                errors.password?.type === 'minLength' && <p className="text-red-500">password should be 6 character or more</p>
            }
          </div>

          <div className="text-right">
            <Link to={'/forget-password'}><a className="link link-hover text-base text-blue-600">Forgot password?</a></Link>
          </div>

          <button className="btn w-full bg-[#C8E344] hover:bg-[#b0cc2f] text-black text-lg h-14">
            Continue
          </button>

          <p className="text-center text-base mt-4">
            Don’t have an account? <Link to={'/register'}><span className="text-green-600 font-semibold cursor-pointer">Register</span></Link>
          </p>

          <div className="divider text-gray-400">Or</div>

          <button onClick={loginWithGOogle} type="button" className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-black text-lg h-14 flex items-center justify-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              className="w-6 h-6"
            />
            Login with Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
