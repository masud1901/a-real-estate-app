import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  const menuItems = [
    { text: "Home", path: "/", activePath: pathMatchRoute("/") },
    { text: "Offers", path: "/offers", activePath: pathMatchRoute("/offers") },
    {
      text: "Sign in",
      path: "/sign-in",
      activePath: pathMatchRoute("/sign-in"),
    },
  ];

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
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
