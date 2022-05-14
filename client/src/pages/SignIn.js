import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const navigate = useNavigate();
  //register variables
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegistermail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  //login variables
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  //register function
  //Creates an user profile
  async function registerUser(event) {
    if (!registerUsername || !registerEmail || !registerPassword)
      return
    event.preventDefault();
    const response = await fetch("https://outlist.herokuapp.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registerUsername,
        registerEmail,
        registerPassword,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      setHasAccount(true)
    }
  }

  //login function
  //Pass information to backend to log in user
  async function loginUser(event) {
    if (!loginEmail || !loginPassword)
      return
    event.preventDefault();
    const response = await fetch("https://outlist.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginEmail,
        loginPassword,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      //modal
      navigate("/profile");
    } else {
      alert("Please check your Email and Password");
    }
  }

  //Switches between signup and login
  function handleClick() {
    setHasAccount(prevHasAccount => !prevHasAccount)
  }

  return (
    <div class="text-slate-200">
      {
        hasAccount ? (
          <div class="flex items-center justify-center">
            <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg bg-slate-600">
              <h3 class="text-2xl font-bold text-center">Login to your Outlist Account</h3>
              <div class="mt-4">
                <form onSubmit={loginUser}>
                  <label class="block">Email</label>
                  <input
                    class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 "
                    type="text"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <label class="block">Password</label>
                  <input
                    class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <div class="flex items-baseline justify-center gap-5">
                    <input type="submit" class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" />
                    <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={handleClick}>{hasAccount ? "Switch to Register" : "Switch to Login"}</button>
                  </div>
                </form>

              </div>
            </div>
          </div >

        ) : (
          <div class="flex items-center justify-center">
            <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg bg-slate-600">
              <h3 class="text-2xl font-bold text-center">Register an Outlist Account</h3>
              <div class="mt-4">
                <form onSubmit={registerUser}>
                  <label class="block">Username</label>
                  <input
                    class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    placeholder="Username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                  />
                  <label class="block">Email</label>
                  <input
                    class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="text"
                    placeholder="Email"
                    value={registerEmail}
                    onChange={(e) => setRegistermail(e.target.value)}
                  />
                  <label class="block">Password</label>
                  <input
                    class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    type="password"
                    placeholder="Password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <div class="flex items-baseline justify-center gap-5">
                    <input type="submit" class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" />
                    <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={handleClick}>{hasAccount ? "Switch to Register" : "Switch to Login"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}