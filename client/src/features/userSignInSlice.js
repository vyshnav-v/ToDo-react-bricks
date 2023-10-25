import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loginLoading: false,
  userInfo: userInfoFromStorage, // Store user info from local storage
  loginError: null,
};

const UserSignInSlice = createSlice({
  name: "UserSignIn",
  initialState: initialState,
  reducers: {
    userLoginReq: (state, action) => {
      state.loginLoading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loginLoading = false;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    userLogout: (state, action) => {
      state.userInfo = null;
      state.loginError = null;
    },
  },
});

export const { userLoginReq, userLoginSuccess, userLoginFail, userLogout } =
  UserSignInSlice.actions;

export default UserSignInSlice.reducer;
