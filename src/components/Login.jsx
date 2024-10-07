import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800">SupportHive</h2>
          <p className="text-gray-600 mt-2">Welcome back to SupportHive</p>
          <p className="text-sm text-gray-500">Please login...</p>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="enter email address"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="enter password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm outline-none sm:text-sm"
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-500 cursor-pointer">
                
                
              </span>
            </div>
          </div>
          <div className="flex items-center justify-end mb-4">
            <div className="text-sm">
              <a href="#" className="">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#28A745]"
          >
            Proceed
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
