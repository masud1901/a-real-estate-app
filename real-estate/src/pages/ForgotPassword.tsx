import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function forgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(event) {
    setEmail(event.target.value);
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-light">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://i.ytimg.com/vi/35DqyyPy94A/maxresdefault.jpg"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className=" mb-6 w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-200 focus:border-blue-500 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring focus:ring-opacity-50 
              transition-opacity duration-200 ease-in-out opacity-90 hover:opacity-100"
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="E-mail Address"
            />
            <div className="px-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:justify-between text-sm sm:text-lg">
                <p className="mb-2 sm:mb-0">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-red-500 hover:underline">
                    Register
                  </Link>
                </p>
                <p>
                  <Link
                    to="/sign-in"
                    className="text-gray-600 opacity-60 hover:underline"
                  >
                    Sign in instead?
                  </Link>
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="my-4 w-full bg-blue-500 opacity-90 hover:bg-blue-600 hover:opacity-100 text-white font-semibold uppercase py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:bg-blue-700"
            >
              Sign in
            </button>
            <div
              className="flex items-center before:border-t  before:flex-1  before:border-gray-300 
          after:border-t after:flex-1 after:border-gray-300"
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
