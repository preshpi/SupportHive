import { toast } from "sonner";
import { handleUserDetails } from "../../redux/slices/user.slice";
import {
  CreateUserOnSanityProps,
  GetUserFromSanityProps,
} from "../../types/user.slice";
import Cookies from "js-cookie";
import { config } from "../../helpers/config";
import { client } from "../../../supporthive/sanity.cli";

export const createUserOnSanity = async ({
  userData,
  dispatch,
  router,
}: CreateUserOnSanityProps) => {
  try {
    // Create a user document in Sanity
    const doc = {
      _id: userData._id,
      _type: "user",
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
      gender: userData?.gender,
      uid: userData?.uid,
      terms: userData?.terms,
      emailVerified: false, // set initial email verification status
    };

    const res = await client.create(doc);

    // Dispatch the user details to Redux
    dispatch(
      handleUserDetails({
        _id: res._id,
        firstname: res.firstname,
        lastname: res.lastname,
        email: res.email,
        uid: res.uid,
        gender: res.gender,
        terms: res.terms,
        emailVerified: res.emailVerified,
      })
    );

    // Handle routing
    const getLastPageVisit = Cookies.get(config.key.lastPath);
    if (getLastPageVisit) {
      router(getLastPageVisit);
    }

    // Set user ID cookie
    Cookies.set(config.key.userId, res.uid || res._id); // Adjust to your logic

    toast.success("Form submitted successfully");
    return { success: true };
  } catch (error) {
    toast.error("Failed to create user. Please try again.");
    return { success: false, error };
  }
};

export const getUserOnSanity = async ({
  email,
  dispatch,
}: GetUserFromSanityProps) => {
  // Query to find user by email
  const query = `*[_type == "user" && email == $email][0]`;
  const params = { email };

  const user = await client.fetch(query, params);

  if (user) {
    // User found, dispatch user details to Redux
    dispatch(
      handleUserDetails({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        uid: user.uid, // Adjust if you have a specific UID logic
        gender: user.gender,
        terms: user.terms,
        emailVerified: user.emailVerified,
      })
    );
  }
  return { success: true };
};
