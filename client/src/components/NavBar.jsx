import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notification from "./chat/Notification";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="mb-14 bg-black text-white">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link to="/" className="text-4xl">
          ChatApp
        </Link>
        {user && (
          <span className="text-yellow-400">Logged in as {user?.name}</span>
        )}
        <div className="flex items-center gap-x-4">
          {user && (
            <>
              <Notification />
              <Link onClick={() => logoutUser()} to="/login">
                Logout
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
