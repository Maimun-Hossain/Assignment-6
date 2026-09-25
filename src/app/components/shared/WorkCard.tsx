import Image from "next/image";
import { Oswald, Inter } from "next/font/google";
import { FaRegClock, FaFireFlameCurved, FaRegStar } from "react-icons/fa6";
import { IData } from "@/types/datas.type";
import Link from "next/link";

const oswald = Oswald();
const inter = Inter();

interface IDataCardProps {
    data: IData;
}

const WorkCard = ({ data }: IDataCardProps) => {
  return (
    <Link href={`/exercise/${data.id}`}>
    <div className="overflow-hidden rounded-xl border border-[#292c35] bg-[#15171d] text-white hover:border-[#c6ff00] cursor-pointer">
      <figure className="relative h-60">
        <Image
          src={data.image}
          alt={data.name}
          fill
          sizes="(min-width: 1024px) calc((97vw - 48px) / 3), (min-width: 768px) calc((97vw - 24px) / 2), 97vw"
          className="object-cover"
        />
      </figure>
      <div className={`${inter.className} p-4`}>
        <div className="mb-3 flex gap-2">
          {data.muscleGroups.map((muscle, index) => (
            <span
              key={index}
              className="rounded-full bg-[#c6ff00] px-3 py-1 text-[10px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>
        <h2
          className={`${oswald.className} not-[]:text-sm font-extrabold uppercase tracking-wide`}
        >
          {data.name}
        </h2>
        <p className="mt-1 text-xs text-gray-500">{data.equipment}</p>
        <div className="mt-4 flex items-center border-t border-[#20242eFF] gap-4 py-2 text-[10px] text-gray-400">
          <div className="flex items-center gap-1">
            <FaRegClock className="text-[#c6ff00]" />
            <span>{data.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <FaFireFlameCurved className="text-[#c6ff00]" />
            <span>{data.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRegStar className="text-[#c6ff00]" />
            <span>{data.rating}</span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default WorkCard;
