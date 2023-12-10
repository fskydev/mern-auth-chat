import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
  const {
    user,
    profileInfo,
    updateProfileInfo,
    updateUserProfile,
    profileError,
    updateProfileError,
    isUpdateProfileLoading,
  } = useContext(AuthContext);

  useEffect(() => {
    updateProfileInfo({
      ...profileInfo,
      name: user.name,
      email: user.email,
    });
  }, [user]);

  useEffect(() => {
    if (profileError?.error) {
      toast.error(profileError.message);
      updateProfileError(null);
    }
  }, [profileError]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Update Profile
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={updateUserProfile}>
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
                  value={profileInfo.name}
                  required
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateProfileInfo({
                      ...profileInfo,
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
                  value={profileInfo.email}
                  autoComplete="email"
                  required
                  readOnly
                  className="block w-full rounded-sm border-0 bg-gray-300 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateProfileInfo({
                      ...profileInfo,
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
                  className="block w-full rounded-sm border-0 p-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    updateProfileInfo({
                      ...profileInfo,
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
                disabled={isUpdateProfileLoading}
              >
                {isUpdateProfileLoading ? "Updating your profile..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
