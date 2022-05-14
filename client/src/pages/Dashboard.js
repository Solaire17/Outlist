import React from "react";
import { useState, useEffect } from "react";
import CardDashboard from "../components/CardDashboard"
import Axios from "axios";

export default function Dashboard() {

  const [listOfClothing, setListOfClothing] = useState([]);

  //call to backend to populate listOfClothing array
  useEffect(() => {
    Axios.get("http://localhost:3001/getClothings").then((response) => {
      setListOfClothing(response.data);
    });
  }, []);

  //maps all clothing items
  const cards = listOfClothing.map(item => {
    return (
      <div>
        <CardDashboard
          key={item.eventId}
          {...item}

        />
      </div>
    )
  })

  return (
    <div class="text-slate-200 grid grid-cols-3 mx-20 gap-y-4 my-8 gap-x-10" >
      {cards}
    </div>
  );
}