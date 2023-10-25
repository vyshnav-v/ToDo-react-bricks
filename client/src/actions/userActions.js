import axiosConfig from "../config/axios";
 // Make sure to import the correct actions from your slice
import { userSignupFail, userSignupReq, userSignupSuccess } from "../features/userSignUpSlice.js";
import {

    userLoginFail,
    userLoginReq,
  userLoginSuccess,
  userLogout,
} from "../features/userSignInSlice.js";
export const signIn = (logEmail, logPassword) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch(userLoginReq()); 
    
    const { data } = await axiosConfig.post(
      `/login`,
      {
        email: logEmail,
        password: logPassword,
      },
      config
    );
    dispatch(userLoginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(userLoginFail(errorIs)); 
  }
};


export const Signup =
  (username, email, password ) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      dispatch(userSignupReq()); 

    const { data } = await axiosConfig.post(
      `/register`,
      {
        username,
        email,
        password,
        
      },
      config
    );

      dispatch(userSignupSuccess(data)); 
    } catch (error) {
      const errorIs =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userSignupFail(errorIs)); 
    }
  };

  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo"); 
    dispatch(userLogout()); 
  };

