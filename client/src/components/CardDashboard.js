

import React from 'react'

export default function CardDashboard(props) {
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
            </div>
        </div>
    )
}