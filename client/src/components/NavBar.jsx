import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className=" bg-zinc-700 text-white">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="pl-2 text-2xl sm:pl-0 sm:text-3xl">
          Private Chat
        </Link>
        <div className="mr-1 flex items-center gap-x-2">
          {user && (
            <>
              <Notification />
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-white hover:opacity-90 focus:outline-none">
                    <span className="font-medium">{user?.name}</span>
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-6 w-6"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Menu.Items className="absolute right-2 mt-2 w-52 bg-zinc-900 focus:outline-none">
                  <Menu.Item disabled>
                    {({ active }) => (
                      <button
                        className={clsx(
                          "group flex w-full items-center px-4 py-2 font-medium",
                          active ? "bg-zinc-700 text-white" : "text-zinc-400",
                        )}
                      >
                        Profile (coming soon!)
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        onClick={() => logoutUser()}
                        to="/login"
                        className={clsx(
                          "group flex w-full items-center px-4 py-2 font-medium",
                          active ? "bg-zinc-700 text-white" : "text-zinc-400",
                        )}
                      >
                        Logout
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="font-medium">
                Login
              </Link>
              <Link to="/register" className="font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
