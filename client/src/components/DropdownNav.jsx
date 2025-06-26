import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

const DropdownNav = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
          <span className="mr-2">{user.username || "User"}</span>
          <ChevronDownIcon className="w-4 h-4" />
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-gray-900 border border-gray-700 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/favorites"
                  className={`${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                >
                  Favorites
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active ? "bg-red-600 text-white" : "text-red-400"
                  } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default DropdownNav;
