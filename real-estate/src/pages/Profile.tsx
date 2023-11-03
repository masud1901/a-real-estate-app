import { getAuth } from "firebase/auth";
import { useState } from "react";
import { app } from "../firebase";
import { useNavigate } from "react-router";

export default function Profile() {
  const auth = getAuth(app);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  function onLogOut() {
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center mt-6 font-light">Profile</h1>
        <div className="w-full md:w-[50%] m-auto mt-6 px-3">
          <form>
            {/* name input  */}
            <input
              type="text"
              id="name"
              value={name}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded trainsition ease-in-out mb-6"
            />

            {/* email input  */}

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
            />

            <div className="flex justify-between whitespace-nowrap text-sm px-1 mb-6">
              <p className="flex items-center">
                Do you want to change your name?{" "}
                <span className="px-1 text-red-600 hover:text-red-800 transition ease-in-out duration-300 cursor-pointer hover:underline">
                  Edit
                </span>
              </p>
              <p
                onClick={onLogOut}
                className="px-1 text-blue-600 hover:text-blue-800 transition ease-in-out duration-300 cursor-pointer hover:underline"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
