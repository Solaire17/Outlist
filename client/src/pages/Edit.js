import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import FileBase from "react-file-base64";
import jwt_decode from "jwt-decode";

export default function Edit() {

  let navigate = useNavigate();
  let { id } = useParams();
  const [isUser, setIsUser] = useState(false);
  const [newClothing, setNewClothing] = useState([
    {
      newTitle: "",
      newLink: "",
      newCost: "",
      newRating: "",
      newCategory: "",
      newColor: "",
      newSize: "",
      newImage: "",
    },
  ]);

  //call to the backend to get current clothing information
  useEffect(() => {
    Axios.get(`http://localhost:3001/getClothing/${id}`).then((response) => {
      setNewClothing((prevClothingData) => {
        return {
          ...prevClothingData,
          newTitle: response.data.title,
          newLink: response.data.link,
          newCost: response.data.cost,
          newRating: response.data.rating,
          newCategory: response.data.category,
          newColor: response.data.color,
          newSize: response.data.size,
          newImage: response.data.image,
        };
      });
    });
  }, []);

  ////verify user is loggedin
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
    const req = await fetch(`http://localhost:3001/getClothingId/${id}`, {
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

  //call to backend to update clothing information
  const updateClothing = (eventId) => {
    const {
      newTitle,
      newLink,
      newCost,
      newRating,
      newCategory,
      newColor,
      newSize,
      newImage
    } = newClothing;

    Axios.put(`http://localhost:3001/update/${eventId}`, {
      title: newTitle,
      link: newLink,
      cost: newCost,
      rating: newRating,
      category: newCategory,
      color: newColor,
      size: newSize,
      image: newImage,
    });
  };

  //information from the backend to update information in the frontend
  function handleUpdate(event) {
    const { name, value } = event.target;
    setNewClothing((prevClothingData) => {
      return {
        ...prevClothingData,
        [name]: value,
      };
    });
  }

  return (
    <div class="text-slate-200">
      {isUser ? (
        <div class="flex items-center justify-center text-slate-200">
          <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg bg-slate-600">
            <h3 class="text-2xl font-bold text-center">Edit Clothing</h3>
            <label class="block">Title</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Title"
              onChange={handleUpdate}
              name="newTitle"
              value={newClothing.newTitle}
            />
            <label class="block">Link</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Link"
              onChange={handleUpdate}
              name="newLink"
              value={newClothing.newLink}
            />
            <label class="block">Cost</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Cost"
              onChange={handleUpdate}
              name="newCost"
              value={newClothing.newCost}
            />
            <label class="block">Rating</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Rating"
              onChange={handleUpdate}
              name="newRating"
              value={newClothing.newRating}
            />
            <label class="block">Category</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Category"
              onChange={handleUpdate}
              name="newCategory"
              value={newClothing.newCategory}
            />
            <label class="block">Color</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Color"
              onChange={handleUpdate}
              name="newColor"
              value={newClothing.newColor}
            />
            <label class="block">Size</label>
            <input
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="text"
              placeholder="Size"
              onChange={handleUpdate}
              name="newSize"
              value={newClothing.newSize}
            />
            <label class="block">Image </label>
            <FileBase
              class="text-slate-600 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setNewClothing({ ...newClothing, newImage: base64 })
              }
            />
            <button
              class="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              onClick={() => {
                if (!newClothing.newTitle || !newClothing.newLink || !newClothing.newCost || !newClothing.newRating || !newClothing.newCategory || !newClothing.newColor || !newClothing.newSize || !newClothing.newImage)
                  return
                updateClothing(id);
                navigate(`/profile`);
              }}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}