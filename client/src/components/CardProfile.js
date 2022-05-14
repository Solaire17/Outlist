

import React from 'react'
import { useNavigate } from "react-router-dom";

export default function CardProfile(props) {
    let navigate = useNavigate();
    return (
        <div class="max-w-sm bg-slate-700 rounded-lg border border-slate-700 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <img class="object-cover h-48 w-96 rounded-t-lg " src={props.image} />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white truncate ...">{props.username}: {props.title}</h5>
                <p class="mb-3 font-normal text-slate-200 dark:text-gray-400 truncate ...">Price: ${props.cost}</p>
                <p class="mb-3 font-normal text-slate-200 dark:text-gray-400 truncate ...">Rating: {props.rating}</p>
                <p class="mb-3 font-normal text-slate-200 dark:text-gray-400 truncate ...">Category: {props.category}</p>
                <p class="mb-3 font-normal text-slate-200 dark:text-gray-400 truncate ...">Color: {props.color}</p>
                <p class="mb-3 font-normal text-slate-200 dark:text-gray-400 truncate ...">Size: {props.size}</p>
                <p class="mb-3 font-normal text-slate-200 dark:text-gray-400">Link: {props.link}</p>
                <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => {
                    navigate(`/edit/${props.eventId}`)
                }}> Edit </button>
                <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={() => {
                    navigate(`/delete/${props.eventId}`)
                }}> Delete </button>
            </div>
        </div >
    )
}