import React from "react";
import { Oswald, Inter } from "next/font/google";
import { IData } from "@/types/datas.type";
import WorkCard from "../components/shared/WorkCard";

const oswald = Oswald();
const inter = Inter();

const getData = async () => {
  try {
    const res = await fetch("https://api.api-store.workers.dev/api/fitlog", {
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
    <section className="max-w-[97%] mx-auto">
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
      <div className="grid mb-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutData.map((data: IData) => {
          return <WorkCard key={data.id} data={data} />;
        })}
      </div>
    </section>
  );
};

export default Library;
