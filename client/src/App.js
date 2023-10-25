import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/LoginAndRegister/Login";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css"; // icons
import ViewEditToDo from "./pages/EditToDo/ViewEditToDo";



function App() {
  const token = localStorage.getItem("token");
  const userInfo = localStorage.getItem("userInfo");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={token ? <Navigate to='/home' /> : <Navigate to='/login' />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/single-view/:id" element={<ViewEditToDo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
