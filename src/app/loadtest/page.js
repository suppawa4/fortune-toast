import Image from "next/image";
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Image
        src="/infinite-spinner.svg"
        width={150}
        height={150}
        alt="loading..."
      />
    </div>
  );
}