import { useEffect } from "react";
import { useSettingsTab } from "../../context/settings.context";
import Input from "../../components/Inputs";
import { useForm } from "react-hook-form";
import {
  securitySchema,
  TsecuritySchema,
  TupdateProfileSchema,
  updateProfileSchema,
} from "../../types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button";
import { client } from "../../../supporthive/sanity.cli";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../hook/redux.hook";
import { updateUserProfile as updateUserProfileAction } from "../../redux/slices/user.slice";
import { auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
const Settings = () => {
  const { tab, setTab } = useSettingsTab();
  const dispatch = useAppDispatch();

  const handleChangeTab = (tabName: string, tabIndex: number) => {
    switch (tabName) {
      case "profile":
        setTab(0);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
        break;
      case "security":
        setTab(1);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
        break;
      default:
        setTab(0);
        localStorage.setItem("selectedTabIndex", tabIndex.toString());
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("selectedSettingsTab");
    if (storedValue !== null) {
      setTab(parseInt(storedValue));
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TupdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
  });
  const userDetails = useSelector((state: RootState) => state.user); // Get user details from Redux store
  const { _id } = userDetails.userDetails;

  // Function to update user profile in Sanity
  const updateUserProfileInSanity = async (
    userId: string | undefined,
    data: TupdateProfileSchema
  ) => {
    try {
      if (!userId) {
        throw new Error("User ID is undefined");
      }

      const response = await client
        .patch(userId) // Use the Sanity document ID to patch (update) the user
        .set({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        })
        .commit(); // Commit the patch to Sanity

      return response;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error("Unable to update profile");
    }
  };

  const onSubmit = async (data: TupdateProfileSchema) => {
    try {
      const userId = _id;
      const updatedProfile = await updateUserProfileInSanity(userId, data);

      dispatch(
        updateUserProfileAction({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
        })
      );

      if (updatedProfile) {
        toast.success("Profile updated successfully!");
        reset();
      }
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    reset: resetSecurity,
    formState: { errors: errorSecurity, isSubmitting: isSubmittingSecurity },
  } = useForm<TsecuritySchema>({
    resolver: zodResolver(securitySchema),
  });

  const onSecuritySubmit = async (data: TsecuritySchema) => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Reauthenticate user with current password before allowing password change
        const credential = EmailAuthProvider.credential(
          user?.email || "",
          data.currentPassword
        );

        await reauthenticateWithCredential(user, credential);

        // Ensure the new password matches the confirm password
        if (data.password !== data.confirmPassword) {
          toast.error("New password and confirm password do not match");
          return;
        }

        // Update the password
        await updatePassword(user, data.password);

        toast.success("Password updated successfully!");
        resetSecurity();
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  return (
    <div>
      <h3 className="font-bold text-[24px] mt-10">Settings</h3>

      <div className="flex items-center border-b pt-[32px] gap-x-6">
        <button
          onClick={() => handleChangeTab("profile", 0)}
          className={`text-[16px] p-2 ${
            tab === 0
              ? "text-normal-500 font-medium border-b-2 border-normal-500"
              : "text-[#777777]"
          } `}
        >
          User Profile
        </button>
        <button
          onClick={() => handleChangeTab("security", 1)}
          className={`text-[16px] p-2 ${
            tab === 1
              ? "text-normal-500 font-medium border-b-2 border-normal-500"
              : "text-[#777777]"
          } `}
        >
          Security
        </button>
      </div>

      <div className="pt-10">
        {tab === 0 && (
          <form className="flex flex-col max-w-[440px] gap-y-6 gap-x-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-y-1">
                <Input
                  label="First Name"
                  id="first-name"
                  {...register("firstname")}
                  placeholder="Enter first name"
                  type="text"
                  autoComplete="on"
                />
                {errors.firstname && (
                  <span className="text-red-500 text-sm">{`${errors.firstname.message}`}</span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <Input
                  label="Last Name"
                  {...register("lastname")}
                  id="last-name"
                  placeholder="Enter last name"
                  type="text"
                  autoComplete="on"
                />
                {errors.lastname && (
                  <span className="text-red-500 text-sm">{`${errors.lastname.message}`}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-y-1">
              <Input
                label="Email Address"
                {...register("email")}
                id="email"
                placeholder="Enter email address"
                type="email"
                autoComplete="on"
              />

              {errors.email && (
                <span className="text-red-500 text-sm">{`${errors.email.message}`}</span>
              )}
            </div>
            <div className="max-w-[160px]">
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="bg-normal-300 text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save Changes{" "}
              </Button>
            </div>
          </form>
        )}

        {tab === 1 && (
          <form className="flex flex-col max-w-[440px] gap-y-6 gap-x-4">
            <div className="flex flex-col gap-y-1">
              <Input
                label="Current Password"
                id="currentPassword"
                {...registerSecurity("currentPassword")}
                placeholder="Enter password"
                type="password"
                autoComplete="on"
                password
              />
              {errorSecurity.currentPassword && (
                <span className="text-red-500 text-sm">{`${errorSecurity.currentPassword.message}`}</span>
              )}
            </div>

            <div className="flex flex-col gap-y-1">
              <Input
                label="New Password"
                {...registerSecurity("password")}
                id="password"
                placeholder="Enter new password"
                type="password"
                autoComplete="on"
                password
              />

              {errorSecurity.password && (
                <span className="text-red-500 text-sm">{`${errorSecurity.password.message}`}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <Input
                label="Confirm Password"
                {...registerSecurity("confirmPassword")}
                id="confirm-password"
                placeholder="Confirm password"
                type="password"
                autoComplete="on"
                password
              />

              {errorSecurity.confirmPassword && (
                <span className="text-red-500 text-sm">{`${errorSecurity.confirmPassword.message}`}</span>
              )}
            </div>
            <div className="max-w-[160px]">
              <Button
                disabled={isSubmittingSecurity}
                onClick={handleSubmitSecurity(onSecuritySubmit)}
                className="bg-normal-300 text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save Changes{" "}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
