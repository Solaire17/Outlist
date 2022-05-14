import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import FileBase from "react-file-base64";

export default function Create() {
  const [isUser, setIsUser] = useState(false);
  let navigate = useNavigate();
  const [clothing, setClothing] = useState([
    {
      userId: "",
      username: "",
      title: "",
      link: "",
      cost: "",
      rating: "",
      category: "",
      color: "",
      size: "",
      image: "",
    },
  ]);

  //checks user's token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        setIsUser(false);
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        setIsUser(true);
        populateProfile();
      }
    }
  }, []);

  //gets user data if user token is valid
  async function populateProfile() {
    const req = await fetch("http://localhost:3001/api/profile", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setClothing((prevClothingData) => {
        return {
          ...prevClothingData,
          userId: data.userId,
          username: data.username,
        };
      });
    } else {
      alert(data.error);
    }
  }

  //
  const createClothing = () => {
    const {
      userId,
      username,
      title,
      link,
      cost,
      rating,
      category,
      color,
      size,
      image,
    } = clothing;
    Axios.post("http://localhost:3001/createClothing", {
      userId,
      username,
      title,
      link,
      cost,
      rating,
      category,
      color,
      size,
      image,
    })
  };

  //handles input change
  function handleChange(event) {
    const { name, value } = event.target;
    setClothing((prevClothingData) => {
      return {
        ...prevClothingData,
        [name]: value,
      };
    });
  }

  return (
    <div>
      {isUser ? (
        <div class="flex items-center justify-center text-slate-200">
          <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg bg-slate-600">
            <h3 class="text-2xl font-bold text-center">Create Clothing</h3>
            <label class="block">Title</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Title"
              onChange={handleChange}
              name="title"
              value={clothing.title}
            />
            <label class="block">Link</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Link"
              onChange={handleChange}
              name="link"
              value={clothing.link}
            />
            <label class="block">Cost</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Cost"
              onChange={handleChange}
              name="cost"
              value={clothing.cost}
            />
            <label class="block">Rating</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Rating"
              onChange={handleChange}
              name="rating"
              value={clothing.rating}
            />
            <label class="block">Category</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Category"
              onChange={handleChange}
              name="category"
              value={clothing.category}
            />
            <label class="block">Color</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Color"
              onChange={handleChange}
              name="color"
              value={clothing.color}
            />
            <label class="block">Size</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Size..."
              onChange={handleChange}
              name="size"
              value={clothing.size}
            />
            <label class="block">Image </label>
            <FileBase
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="file"
              multiple={false}
              onDone={({ base64 }) => setClothing({ ...clothing, image: base64 })}
            />
            <button
              class="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              onClick={() => {
                if (!clothing.title || !clothing.link || !clothing.cost || !clothing.rating || !clothing.category || !clothing.color || !clothing.size || !clothing.image)
                  return
                createClothing();
                navigate(`/profile`);
              }}
            >
              Create
            </button>
          </div>
        </div>
      ) : (
        //displayed text if not logged in
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <strong class="font-bold">You are not Logged in! </strong>
          <button
            onClick={() => {
              navigate(`/signin`);
            }}
          >
            Click here to go to Login Page
          </button>
        </div>
      )}
    </div>
  );
}