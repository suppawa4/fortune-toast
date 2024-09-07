"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/app/components/loading";

export default function Home() {
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const initCard = async () => {
    const cachedCard = localStorage.getItem("tarotCard");
    if (cachedCard) {
      setCard(JSON.parse(cachedCard));
      setIsLoading(false);
    } else {
      try {
        const response = await fetch("/api/tarot");
        const newCard = await response.json();

        localStorage.setItem("tarotCard", JSON.stringify(newCard));
        setCard(newCard);
      } catch (error) {
        console.error("Error fetching tarot card:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    initCard();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-8">
      <div className="flex flex-col justify-center items-center gap-3 text-white">
        <img
          className="border-gray-500 border rounded-md shadow-2xl"
          style={{ width: "70%" }}
          src={card.img}
          alt={card.name}
        />
        <div>
          <h1 className="text-center font-bold text-2xl mb-1">{card.name}</h1>
          <img src="underlined.svg" alt="underlined" width={250} />
        </div>
        <p>{card.desc}</p>
      </div>
    </div>
  );
}
