require("dotenv").config();
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

module.exports = {
  cardDesc,
};
