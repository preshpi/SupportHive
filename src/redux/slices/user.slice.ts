import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.slice";
import { RootState } from "../store";

// Define a type for the slice state
interface UserDetailsState {
  userDetails: UserType;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: UserDetailsState = {
  isLoggedIn: false, // Default value for login state

  userDetails: {
    uid: "",
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    terms: false,
    emailVerified: false,
  },
};

// create the slice

const userSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    // Action to handle user login and set user details
    handleUserDetails: (state, action: PayloadAction<UserType>) => {
      state.isLoggedIn = true;
      state.userDetails = action.payload;
    },

    // Action to update user profile while preserving login state
    updateUserProfile: (state, action: PayloadAction<Partial<UserType>>) => {
      state.userDetails = {
        ...state.userDetails,
        ...action.payload, // Merge the updated fields with the current state
      };
    },

    logoutUser: (state) => {
      state.isLoggedIn = false; // Reset login state
      state.userDetails = {
        uid: "",
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        terms: false,
        emailVerified: false,
      }; // Clear user details
    },
  },
});

export const { handleUserDetails, updateUserProfile, logoutUser } =
  userSlice.actions;

export const userDetails = (state: RootState) => state.user;

export default userSlice.reducer;
