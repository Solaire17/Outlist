import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CardProfile from "../components/CardProfile"

export default function Profile() {
    const navigate = useNavigate();
    const [listOfClothing, setListOfClothing] = useState([]);
    const [isUser, setIsUser] = useState(false);

    //verify user is correct
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

    //maps all clothing items
    const cards = listOfClothing.map(item => {
        return (
            <CardProfile
                key={item.eventId}
                {...item}
            />
        )
    })

    //verify user is loggedin
    async function populateProfile() {
        const req = await fetch("https://outlist.herokuapp.com/api/myclothes", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        });

        const data = await req.json();
        if (data.status === "ok") {
            setListOfClothing(data.clothes);
        } else {

            alert(data.error);
        }
    }

    return (
        <div class="text-slate-200">
            {isUser ? (
                <div>
                    <div class="flex items-baseline justify-center gap-5">
                        <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => navigate(`/create`)}>Create Clothing</button>
                    </div>
                    <div class="grid grid-cols-3 mx-20 gap-y-4 my-8 gap-x-10">
                        {cards}
                    </div>
                </div>) : (
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
