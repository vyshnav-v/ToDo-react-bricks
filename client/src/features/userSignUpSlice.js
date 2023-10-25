import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null, 
  registered: null, 
};

const UserSignUpSlice = createSlice({
  name: "UserSignUp",
  initialState,
  reducers: {
    userSignupReq: (state, action) => {
      state.loading = true;
      state.error = null;
      state.registered = null;
    },
    userSignupSuccess: (state, action) => {
      state.loading = false;
      state.registered = action.payload; 
    },
    userSignupFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userSignupReq, userSignupSuccess, userSignupFail } =
  UserSignUpSlice.actions;

export default UserSignUpSlice.reducer;
