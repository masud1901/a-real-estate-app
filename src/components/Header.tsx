import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  const menuItems = [
    { text: "Home", path: "/", activePath: pathMatchRoute("/") },
    { text: "Offers", path: "/offers", activePath: pathMatchRoute("/offers") },
    {
      text: isLoggedIn ? "Profile" : "Sign in",
      path: isLoggedIn ? "/profile" : "/sign-in",
      activePath: isLoggedIn
        ? pathMatchRoute("/profile")
        : pathMatchRoute("/sign-in"),
    },
  ];

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-12 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent${
                  item.activePath && "text-black border-b-red-500"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}
