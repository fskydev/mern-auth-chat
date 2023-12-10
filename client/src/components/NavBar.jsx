import { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../context/AuthContext";
import clsx from "clsx";
import Notification from "./chat/Notification";
import avatar from "../assets/avatar.svg";

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
                  <Menu.Button className="inline-flex w-full justify-center p-1 text-white hover:opacity-90 focus:outline-none sm:px-4 sm:py-2">
                    <span className="hidden font-medium sm:block">
                      {user?.name}
                    </span>

                    <ChevronDownIcon
                      className="-mr-1 ml-2 hidden h-6 w-6 sm:block"
                      aria-hidden="true"
                    />
                    <Bars3Icon
                      className="h-6 w-6 sm:hidden"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Menu.Items className="absolute right-2 z-10 mt-2 w-52 bg-zinc-900 focus:outline-none">
                  <div>
                    <div className="flex items-center border-b border-b-zinc-800 px-4 py-4 sm:hidden">
                      <img src={avatar} className="h-10 w-10" />
                      <span className="ml-2 pt-2 font-semibold">
                        {user?.name}
                      </span>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/"
                          className={clsx(
                            "group flex w-full items-center px-4 py-2 font-medium",
                            active ? "bg-zinc-700 text-white" : "text-zinc-400",
                          )}
                        >
                          Chat
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/profile"
                          className={clsx(
                            "group flex w-full items-center px-4 py-2 font-medium",
                            active ? "bg-zinc-700 text-white" : "text-zinc-400",
                          )}
                        >
                          Profile
                        </Link>
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
                  </div>
                </Menu.Items>
              </Menu>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="font-medium">
                Login
              </Link>
              <Link to="/register" className="mr-2 font-medium sm:mr-0">
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
