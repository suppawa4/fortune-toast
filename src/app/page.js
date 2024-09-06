import Image from "next/image";
import { getTarot } from "./services/TarotService";

export default async function Home() {
  const card = await getTarot();

  console.log(card);

  return (
    <div>
      <Image width={200} height={300} alt={card.name} src={card.img} priority />
      <h1 className="font-bold">{card.name}</h1>
      <p>{card.desc}</p>
    </div>
  );
}
