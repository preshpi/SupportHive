import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.slice";
import { RootState } from "../store";

// Define a type for the slice state
interface UserDetailsState {
    userDetails: UserType;
  }

// Define the initial state using that type
const initialState: UserDetailsState = {
    userDetails: {
        uid: "",
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        image: "",
        emailVerified: false,
    }
}

// create the slice

const userSlice  = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
        handleUserDetails: (state, action:PayloadAction<UserType>) => {
            state.userDetails = action.payload;
        }
    }

})

export const { handleUserDetails } = userSlice.actions;

export const userDetails = (state: RootState) => state.user;

export default userSlice.reducer;