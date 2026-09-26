import Image from "next/image";
import { Oswald, Inter } from "next/font/google";
import banner from "../../../../public/banner.png";
import { FaArrowDown } from "react-icons/fa6";
import Link from "next/link";

const oswald = Oswald();
const inter = Inter();

const Banner = () => {
  return (
    <div className="hero my-12 rounded-2xl border border-[#222630FF] bg-[#15171dFF] max-w-[97%] mx-auto">
      <div className="hero-content w-full md:px-0 justify-between flex-col lg:flex-row-reverse">
        <Image src={banner} alt="banner"></Image>
        <div className={`${inter.className}`}>
          <h6 className="text-xs font-bold text-[#c2f800FF]">
            WORKOUT LIBRARY
          </h6>
          <h1
            className={`${oswald.className} text-5xl font-bold text-white my-5`}
          >
            TRAIN WITH INTENT. LOG <br />
            EVERY SET.
          </h1>
          <p className="mb-5 text-md font-normal text-[#9ca3afFF]">
            {`FitLog is a dark, no-nonsense gym companion: pick a lift, lock it`}{" "}
            <br />
            {`into today's plan, and watch the week's work add up.`}
          </p>
          <Link
            href="#library"
            className="inline-flex items-center gap-2 rounded-md bg-[#c2f800FF] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#b5eb00]"
          >
            BROWSE WORKOUTS <FaArrowDown />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
