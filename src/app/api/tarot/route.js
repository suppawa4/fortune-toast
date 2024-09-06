import { cardDesc } from "@/app/services/TarotService";
import { promises as fs } from "fs";
import path from "path";

export async function GET(request) {
  let card = {};
  let allTarots = {};
  const initCard = async () => {
    const jsonPath = path.join(
      process.cwd(),
      "src",
      "app",
      "data",
      "tarot-images.json"
    );
    const fileContents = await fs.readFile(jsonPath, "utf8");
    allTarots = JSON.parse(fileContents);
    const cards = allTarots.cards;
    const randomIndex = Math.floor(Math.random() * cards.length);
    card = cards[randomIndex];
  };
  const getCardImg = (cardImg) => {
    return `/cards/${cardImg}`;
  };

  await initCard();
  const { name, number, arcana, suit, img } = card;
  const cardDescription = await cardDesc(name);

  const responseData = {
    name: name,
    desc: cardDescription.replace(/\n/g, "").trim(),
    img: getCardImg(img),
  };

  return new Response(JSON.stringify(responseData), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
