import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import UserProvider from "./context/userContext";

const App = () => {


  return (
    
    <UserProvider>
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signup" exact element={<Signup/>} />

          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
        </Routes>
      </Router>
    </div>
     </UserProvider>
  );
};

export default App;

const Root = () => {
  const navigate  = useNavigate();
  useEffect(()=>{

    const isAuthenticated = !!localStorage.getItem("token");
  
    return isAuthenticated ? (
      navigate('/dashboard')
    ) : ( 
      navigate('/login')  );
  })
};
