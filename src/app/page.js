import Image from "next/image";

export default async function Home() {
  const response = await fetch(
    "http://localhost:3000/api/tarot",
    //   {
    //   cache: "no-store",
    //   next: { revalidate: 0 }
    // }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const card = await response.json();
  console.log(card);

  return (
    <div>
      <Image width={200} height={300} alt={card.name} src={card.img} priority />
      <h1 className="font-bold">{card.name}</h1>
      <p>{card.desc}</p>
    </div>
  );
}
