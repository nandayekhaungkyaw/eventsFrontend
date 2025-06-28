import React from 'react'
import { useForm } from 'react-hook-form';
import { login } from '../../../Services/Auth';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit =async ( data) => {
    console.log(data);

const res=   await login(data.email,data.password)
toast.success(res.message);
    
    
Cookies.get('token')
navigate("/dashboard")


  }
  console.log(errors);
  return (
<>
<Toaster
  position="top-right"
  reverseOrder={false}
/>
<form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-md space-y-6">
  <h2 className="text-2xl font-bold text-center text-gray-800">Login Your Account</h2>
  <div>
    <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
    <input {...register("email", {required: true})} type="email" id="email" placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required />
  </div>
  <div>
    <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
    <input type="password" {...register("password", {required: true})} id="password" placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" required />
  </div>
  <div className="flex items-center">
    <input {...register("check", {required: true})} id="terms" type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required />
    <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
      I agree with the
      <a href="#" className="text-blue-600 font-medium hover:underline">terms and conditions</a>
    </label>
  </div>
  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
    Login Account
  </button>
</form>
</>


  )
}

export default Login