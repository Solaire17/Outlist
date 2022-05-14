import React from 'react'
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  let navigate = useNavigate();
  return (
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
      <strong class="font-bold">You are on the wrong page! </strong>
      <button
        onClick={() => {
          navigate(`/`);
        }}
      >
        Click here to view clothes
      </button>
    </div>
  )
}

