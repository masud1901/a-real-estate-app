import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { app, db } from "../firebase";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth(app);
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);

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
              onChange={onChange}
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

          <button
            type="submit"
            className="my-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold uppercase py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:bg-red-700"
          >
            <Link to="/create-listing">
              <p className="flex items-center justify-center">
                <span className="mr-2 text-2xl">
                  <FcHome />
                </span>
                Sell or Rent your home
              </p>
            </Link>
          </button>
        </div>
      </section>
      <div className=" max-w-6xl px-4 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-4xl text-center mt-6 font-light">
              My Listings
            </h2>
            <ul>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
