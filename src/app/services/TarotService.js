import { promises as fs } from "fs";
import path from "path";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const gemini = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

const cardDesc = async (card) => {
  const prompt = `บอกความหมายโดยสรุปเป็นparagraphสั้นๆ ของ tarot card ${card} และอธิบายคุณลักษณะคนที่ได้ไพ่นี้
  โดยไม่สนทิศทางของไพ่ response ออกมาเป็นparagraphเท่านั้น`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
const getTarot = async () => {
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
  return responseData;
};

export { cardDesc, getTarot };
