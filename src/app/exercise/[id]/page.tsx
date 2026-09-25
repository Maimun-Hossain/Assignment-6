import { IData } from "@/types/datas.type";
import Image from "next/image";
import { Oswald, Inter } from "next/font/google";
import { FaCalendarPlus, FaRegBookmark } from "react-icons/fa6";

const oswald = Oswald();
const inter = Inter();

interface IDataDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getData = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await res.json();
  return data;
};

const page = async ({ params }: IDataDetailsPageProps) => {
  const { id } = await params;
  const workoutData = await getData();
  const work = workoutData.find(
    (data: IData) => data.id === Number(id),
  ) as IData;
  console.log(work);
  return (
    <main className="max-w-[97%] mx-auto py-8 text-white">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="relative h-125 lg:h-full overflow-hidden rounded-xl">
          <Image
            src={work.image}
            alt={work.name}
            fill
            className="object-cover"
          />
        </div>
        <div className={`${inter.className} flex flex-col`}>
          <h1
            className={`${oswald.className} text-3xl font-bold uppercase`}
          >
            {work.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-5 text-gray-400">
            {work.description}
          </p>
          <div className="mt-3 flex gap-2">
            {work.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#c6ff00] px-3 py-1 text-[10px] font-bold text-black"
              >
                {muscle}
              </span>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-[#282c35] bg-[#151820]">
            <div className="flex items-center justify-between border-b border-[#282c35] px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Equipment
              </span>
              <span className="text-xs">{work.equipment}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#282c35] px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Difficulty
              </span>
              <span className="text-xs">{work.difficulty}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#282c35] px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Sets
              </span>
              <span className="text-xs">{work.sets}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#282c35] px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Reps
              </span>
              <span className="text-xs">{work.reps}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#282c35] px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Duration
              </span>
              <span className="text-xs">{work.duration} min</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#282c35] px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Calories
              </span>
              <span className="text-xs">{work.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[10px] font-semibold uppercase text-gray-400">
                Rating
              </span>
              <span className="text-xs">{work.rating}</span>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-bold uppercase">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3 text-xs text-gray-300">
              {work.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-lg bg-[#c6ff00] px-5 py-2.5 text-xs font-semibold text-black hover:bg-[#b5eb00] flex gap-2 items-center cursor-pointer">
              <FaCalendarPlus /> Add to todays plan
            </button>

            <button className="rounded-lg border border-[#343945] px-5 py-2.5 text-xs text-gray-300 hover:bg-[#181b22] flex gap-2 items-center cursor-pointer">
              <FaRegBookmark /> Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
