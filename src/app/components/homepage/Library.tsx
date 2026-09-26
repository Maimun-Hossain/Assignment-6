import React from "react";
import { Oswald, Inter } from "next/font/google";
import LibraryResults from "./LibraryResults";

const oswald = Oswald();
const inter = Inter();

const getData = async () => {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const Library = async () => {
  const workoutData = await getData();
  return (
    <section id="library" className="max-w-[97%] mx-auto scroll-mt-24">
      <div>
        <h1 className={`${oswald.className} text-3xl font-bold text-white`}>
          THE LIBRARY
        </h1>
        <p
          className={`${inter.className} mt-1 mb-8 text-sm font-normal text-[#9ca3afFF]`}
        >
          Twelve lifts covering every major muscle group.
        </p>
      </div>
      <LibraryResults workoutData={workoutData} />
    </section>
  );
};

export default Library;
