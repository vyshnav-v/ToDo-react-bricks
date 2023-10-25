import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Signup, signIn } from "../../actions/userActions";
import SimpleBackdrop from "../../Components/loader/MuiBackdrop";
import { Toast } from "primereact/toast";
import { userLoginFail } from "../../features/userSignInSlice";
import { userSignupFail } from "../../features/userSignUpSlice";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const UserSignUp = useSelector((state) => state?.UserSignUp);
  const { loading, error, registered } = UserSignUp;
  const UserSignIn = useSelector((state) => state.UserSignIn);
  const { userInfo, loginError, loginLoading } = UserSignIn;

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate,userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      toast.current.show({
        severity: "warn",
        summary: "Incomplete Fields",
        detail: "Please fill all fields!",
        life: 3000,
      });
    } else if (password !== confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Password Do Not Match",
        life: 3000,
      });
      // setMessage("Password Do Not Match");
    } else {
      dispatch(Signup(userName, email, password));
    }
    if(registered){

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: registered?.message,
        life: 3000,
      });
      toggleForm();
    }
  };
  const submitHandlerLogin = async (e) => {
 
    e.preventDefault();
    if (!logEmail || !logPassword) {
      toast.current.show({
        severity: "warn",
        summary: "Incomplete Fields",
        detail: "Please fill all fields!",
        life: 3000,
      });
    } else {
      dispatch(signIn(logEmail, logPassword));
    }
  };
  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };
  useEffect(() => {
    if (loginError) {
      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail: "Invalid Credentials!",
        life: 3000,
      });
    }
    dispatch(userLoginFail(null));
  }, [dispatch,loginError]);
  // useEffect(() => {
  //   if (registered) {
  //     toast.current.show({
  //       severity: "success",
  //       summary: "Success",
  //       detail: registered.message,
  //       life: 3000,
  //     });
  //   }
  //   toggleForm();
  //   // dispatch(userLoginFail(null));
  // }, [registered]);
  useEffect(() => {
    if (error) {
      toast.current.show({
        severity: "error",
        summary: "Registration Failed",
        detail: error,
        life: 3000,
      });
    }
    dispatch(userSignupFail(null));
  }, [dispatch,error]);
  return (
    <div>
      <SimpleBackdrop loading={loading} />
      <SimpleBackdrop loading={loginLoading} />
      <Toast ref={toast} />
      <section>
        <div className='container'>
          <div className='user signinBx'>
            <div className='imgBx'>
              <img src={process.env.PUBLIC_URL + "/assets/img1.jpg"} alt='' />
            </div>
            <div className='formBx'>
              <form action='' onSubmit={submitHandlerLogin}>
                <h2>Sign In</h2>
                <input
                  type='text'
                  name=''
                  placeholder='Username'
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                />
                <input
                  type='password'
                  name=''
                  placeholder='Password'
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                />
                <input type='submit' name='' value='Login' />
                <p className='signup'>
                  Don't have an account ?
                  <a href='#' onClick={toggleForm}>
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className='user signupBx'>
            <div className='formBx'>
              <form action='' onSubmit={submitHandler}>
                <h2>Create an account</h2>
                <input
                  type='text'
                  name=''
                  placeholder='Username'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type='email'
                  name=''
                  placeholder='Email Address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type='password'
                  name=''
                  placeholder='Create Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type='password'
                  name=''
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input type='submit' name='' value='Sign Up' />
                <p className='signup'>
                  Already have an account ?
                  <a href='#' onClick={toggleForm}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
            <div className='imgBx'>
              <img src={process.env.PUBLIC_URL + "/assets/img2.jpg"} alt='' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
