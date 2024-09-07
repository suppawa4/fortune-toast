"use client";
export default function Loading() {
  return (
    <div className="flex justify-center items-center my-80">
      <img
        src="/infinite-spinner.svg"
        width={150}
        height={150}
        alt="loading..."
      />
    </div>
  );
}
