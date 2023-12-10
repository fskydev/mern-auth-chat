import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <ToastContainer />
      <NavBar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />}></Route>
          <Route
            path="/register"
            element={user ? <Chat /> : <Register />}
          ></Route>
          <Route path="/login" element={user ? <Chat /> : <Login />}></Route>
          <Route
            path="/profile"
            element={user ? <Profile /> : <Login />}
          ></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </div>
    </ChatContextProvider>
  );
}

export default App;
