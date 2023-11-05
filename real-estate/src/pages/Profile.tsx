import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import { useState } from "react";
import { app, db } from "../firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const auth = getAuth(app);
  const [changeDetail, setChangeDetail] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();

  function onLogOut() {
    auth.signOut();
    navigate("/");
  }

  function onChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  }

  async function onSubmit() {
    try {
      // Validate the 'name' field (you can add more validation as needed)
      if (!name || name.trim() === "") {
        toast.error("Name is required");
        return;
      }
  
      // Destructure 'auth.currentUser' and 'name'
      const { displayName, uid } = auth.currentUser;
  
      if (displayName !== name) {
        // Update display name in Firebase Authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
  
        // Update user data in Firestore database
        const userDocRef = doc(db, "users", uid);
        await updateDoc(userDocRef, {
          name,
        });
  
        toast.success("Profile details updated");
      } else {
        toast.success("No changes to update");
      }
    } catch (error) {
      toast.error("Could not update the profile details");
    }
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
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail &&
                "bg-white-100 focus:bg-blue-700 focus:text-gray-100"
              }`}
            />

            {/* email input  */}

            <input
              type="email"
              id="email"
              value={email}
              disabled={!changeDetail}
              onChange = {onChange}
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail &&
                "bg-white-100 focus:bg-blue-700 focus:text-gray-100"
              }`}
            />

            <div className="flex justify-between whitespace-nowrap text-sm px-1 mb-6">
              <p className="flex items-center">
                Do you want to change your name?{" "}
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="px-1 text-red-600 hover:text-red-800 transition ease-in-out duration-300 cursor-pointer hover:underline"
                >
                  {changeDetail ? "Apply Change" : "Edit"}
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
