import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "lucide-react";

// utility to merge Tailwind classes
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DropdownNav = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Menu as="nav" className="relative inline-block text-left">
      <Menu.Button
        className="flex items-center bg-white/10 text-gold px-4 py-2 rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
        aria-label="User menu"
      >
        <span className="mr-2 font-semibold">{user.username}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-black/90 border border-gold divide-y divide-gold rounded-lg shadow-lg focus:outline-none z-50">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/favorites"
                  className={classNames(
                    active ? "bg-gold text-black" : "text-white",
                    "group flex w-full items-center px-4 py-2 text-sm font-medium rounded-t-lg"
                  )}
                >
                  Favorites
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gold text-black" : "text-white",
                    "group flex w-full items-center px-4 py-2 text-sm font-medium rounded-b-lg"
                  )}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownNav;
