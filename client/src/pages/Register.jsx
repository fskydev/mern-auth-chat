import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    updateRegisterError,
    isRegisterLoading,
  } = useContext(AuthContext);

  useEffect(() => {
    if (registerError?.error) {
      toast.error(registerError.message);
      updateRegisterError(null);
    }
  }, [registerError]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-sm bg-teal-600 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-teal-500"
              >
                {isRegisterLoading ? "Creating your account..." : "Register"}
              </button>
            </div>
          </form>
          <Link to="/login">
            <span className="mt-6 block underline underline-offset-2">
              Already have an account?
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
