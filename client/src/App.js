import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create"
import Edit from "./pages/Edit"
import Delete from "./pages/Delete"
import ErrorPage from "./pages/ErrorPage"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import jwt_decode from "jwt-decode";

export default function App() {
  const [isUser, setIsUser] = useState(false);

  //verify if user is logged in or not
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        setIsUser(false)
        localStorage.removeItem("token");
      } else {
        setIsUser(true)
      }
    }
  });


  return (
    <Router>
      {/*  */}
      <nav class="font-semibold flex flex-wrap justify-center items-center bg-slate-800 text-white" >

        <Link to="/" class="p-5 absolute left-0 px-4 py-3">Outlist</Link>
        <Link to="/" class="p-5">Dashboard</Link>
        <Link to="/profile" class="p-5">Profile</Link>
        {isUser ? (<button class="p-5 font-semibold absolute right-0 px-4 py-3" onClick={() => {
          localStorage.removeItem("token")
          setIsUser(false)
        }
        }>Logout</button>) : (<Link to="/signin" class="p-5">Sign In</Link>)}
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/delete/:id" element={<Delete />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router >
  );
}