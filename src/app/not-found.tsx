import Link from "next/link";
import { Inter, Oswald } from "next/font/google";

const oswald = Oswald();
const inter = Inter();

export default function NotFound() {
  return (
    <div
      className={`${inter.className} flex min-h-[60vh] items-center justify-center px-6 py-20 text-white`}
    >
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-bold uppercase text-[#c6ff00]">Error 404</p>
        <h1
          className={`${oswald.className} mt-3 text-5xl font-bold uppercase sm:text-6xl`}
        >
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-400">
          This page may have moved, or the address may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md bg-[#c6ff00] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#b5eb00]"
        >
          Back to workouts
        </Link>
      </div>
    </div>
  );
}
