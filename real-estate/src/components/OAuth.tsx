import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className="flex items-center justify-center my-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold uppercase py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:bg-red-700">
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" /> Contunue with Google
    </button>
  );
}
