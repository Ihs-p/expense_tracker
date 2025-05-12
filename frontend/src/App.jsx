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
import UserProvider from "./context/UserContext";
import {Toaster} from "react-hot-toast";
import { Expense } from "./pages/Dashboard/Expense";

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
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
    <Toaster 
    toastOptions = {{
      className:"",
      style:{
        fontSize:'13px'
      }
    }}
    />
     </UserProvider>
  );
};

export default App;

// const Root = () => {
//   const navigate  = useNavigate();
//   // useEffect(()=>{

//     const isAuthenticated = localStorage.getItem("token");
  
//     return isAuthenticated ? (
//       navigate('/dashboard')
//     ) : ( 
//       navigate('/login')  );
//   // },[navigate])
// };


const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [navigate]); // Add navigate as a dependency

  return null; // or a loading spinner if needed
};