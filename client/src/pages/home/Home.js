import React, { useEffect } from "react";
import './home.css'

import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import CreateToDo from "../../Components/singleToDo/CreateToDo";

const Home = () => {
    const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);
    useEffect(() => {
      if (userInfo == null) {
        navigate("/login");
      }
    }, [navigate,userInfo]);
  return (
    <div className='bg-blue-300 w-full ' style={{ height: "100vh"  }}>
      <Navbar />
      <div className='  bg-blue-300'>
    
        {/* <h1 className='text-red-600 mt-16'>Welcome Back {userData.user.username}</h1> */}
          <CreateToDo/>
        </div>
      
     
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
