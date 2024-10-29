import { useEffect } from "react";
import { useSettingsTab } from "../../context/settings.context";
import { useForm } from "react-hook-form";
import {
  feedbackSchema,
  securitySchema,
  TfeedbackSchema,
  TsecuritySchema,
  TupdateProfileSchema,
  updateProfileSchema,
} from "../../types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
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
import EditProfile from "../../components/settings/EditProfile";
import Security from "../../components/settings/Security";
import Feedback from "../../components/settings/Feedback";

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
      case "feedback":
        setTab(2);
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
      toast.error((error as { message: string }).message);
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

  const {
    register: registerFeedback,
    handleSubmit: handleSubmitFeedback,
    reset: resetFeedback,
    formState: { errors: errorsFeedback, isSubmitting: isFeedbackSubmitting },
  } = useForm<TfeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmitFeedback = async (data: TfeedbackSchema) => {
    console.log(data);
  };
  return (
    <div>
      <h3 className="font-bold text-[24px] mt-10">Settings</h3>

      <div className="flex items-center  pt-[32px] border-b border-gray-100 gap-x-6">
        <button
          onClick={() => handleChangeTab("profile", 0)}
          className={`text-[16px] p-2 ${
            tab === 0
              ? "text-normal-500 font-medium border-b-2 border-normal-500"
              : "text-[#777777]"
          } `}
        >
          Edit Profile
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
        <button
          onClick={() => handleChangeTab("feedback", 2)}
          className={`text-[16px] p-2 ${
            tab === 2
              ? "text-normal-500 font-medium border-b-2 border-normal-500"
              : "text-[#777777]"
          } `}
        >
          Feedback
        </button>
      </div>

      <div className="py-8">
        {tab === 0 && (
          <EditProfile
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}

        {tab === 1 && (
          <Security
            isSubmittingSecurity={isSubmittingSecurity}
            handleSubmitSecurity={handleSubmitSecurity}
            registerSecurity={registerSecurity}
            errorSecurity={errorSecurity}
            onSecuritySubmit={onSecuritySubmit}
          />
        )}

        {tab === 2 && (
          <Feedback
            isFeedbackSubmitting={isFeedbackSubmitting}
            handleSubmitFeedback={handleSubmitFeedback}
            registerFeedback={registerFeedback}
            errorsFeedback={errorsFeedback}
            onSubmitFeedback={onSubmitFeedback}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
