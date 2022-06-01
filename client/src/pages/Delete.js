import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";

export default function Delete() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [isUser, setIsUser] = useState(false);

  //verify user is loggedin
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        setIsUser(false);
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        populateProfile();
      }
    }
  }, []);

  //verify user is correct
  async function populateProfile() {
    const req = await fetch(`https://outlist.herokuapp.com/getClothingId/${id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setIsUser(true);
    } else {
      setIsUser(false);
      alert(data.error);
    }
  }

  //call to backend to delete clothing
  const deleteClothing = (eventId) => {
    Axios.delete(`https://outlist.herokuapp.com/delete/${eventId}`);
  };

  return (
    <div class="text-slate-200">
      {isUser ? (
        <div class="flex items-baseline justify-center gap-5">
          <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => {
            deleteClothing(id);
            navigate(`/profile`);
          }}>Delete Clothing</button>
        </div>
      ) : (
        //displayed text if user is not logged in
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <strong class="font-bold">You are not Logged in or the wrong User! </strong>
          <button
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            Click here to go to your page
          </button>
        </div>
      )
      }
    </div>
  );
}