import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, putRequest } from "../utils/services";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [profileError, setProfileError] = useState(null);
  const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateRegisterError = useCallback((info) => {
    setRegisterError(info);
  }, []);

  const updateLoginError = useCallback((info) => {
    setLoginError(info);
  }, []);

  const updateProfileError = useCallback((info) => {
    setProfileError(info);
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const updateProfileInfo = useCallback((info) => {
    setProfileInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setRegisterError(null);

      if (registerInfo.password !== registerInfo.confirmPassword) {
        setRegisterError({
          error: true,
          message: "Passwords do not match",
        });
      } else {
        setIsRegisterLoading(true);

        const response = await postRequest(
          `${baseUrl}/users/register`,
          JSON.stringify(registerInfo),
        );
        setIsRegisterLoading(false);

        if (response.error) {
          return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        toast.success("Registration Successful!");
      }
    },
    [registerInfo],
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo),
      );
      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo],
  );

  const logoutUser = useCallback(async () => {
    await postRequest(`${baseUrl}/users/logout`);
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  const updateUserProfile = useCallback(
    async (e) => {
      e.preventDefault();

      setProfileError(null);

      if (profileInfo.password !== profileInfo.confirmPassword) {
        setProfileError({
          error: true,
          message: "Passwords do not match",
        });
      } else {
        setIsUpdateProfileLoading(true);

        const response = await putRequest(
          `${baseUrl}/users/profile`,
          JSON.stringify(profileInfo),
        );
        setIsUpdateProfileLoading(false);

        if (response.error) {
          return setProfileError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        toast.success("Profile updated successfully");
      }
    },
    [profileInfo],
  );

  return (
    <AuthContext.Provider
      value={{
        user,

        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        updateRegisterError,
        isRegisterLoading,

        logoutUser,

        loginUser,
        loginError,
        updateLoginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,

        profileInfo,
        updateProfileInfo,
        updateUserProfile,
        profileError,
        updateProfileError,
        isUpdateProfileLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
