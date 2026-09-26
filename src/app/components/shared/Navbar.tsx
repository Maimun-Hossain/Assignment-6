"use client";
import Image from "next/image";
import { Oswald, Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { DataContext } from "@/context/DataProvider";
import logo from "../../../../public/logo.png";
const oswald = Oswald();
const inter = Inter();

const Navbar = () => {
  const pathname = usePathname();
  const { addPlan, addSave } = useContext(DataContext);
  const linkClass = (href: string) =>
    `transition-colors ${pathname === href ? "bg-[#1a2312FF] rounded-full text-[#c2f800FF]" : "text-[#9ca3afFF] hover:text-white"}`;
  const links = (
    <>
      <li>
        <Link href="/" className={linkClass("/")}>
          Workouts
        </Link>
      </li>
      <li>
        <Link href="/my-plan" className={linkClass("/my-plan")}>
          My Plan
        </Link>
      </li>
    </>
  );
  return (
    <div className={`navbar md:px-0 max-w-[97%] mx-auto ${inter.className}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#9ca3afFF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-box bg-[#0C0D10] p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Image src={logo} alt="logo" width={28} height={28}></Image>
        <Link
          href="/"
          className={`pl-2 text-xl font-bold text-white ${oswald.className}`}
        >
          FITLOG
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-4">
        <Link
          href="/my-plan"
          className="flex items-center text-[#9ca3afFF] gap-1"
        >
          Plan{" "}
          <div className="badge badge-sm bg-[#ccff00] border-none px-2 py-3 rounded-full font-bold">
            {addPlan.length}
          </div>
        </Link>
        <Link
          href="/my-plan"
          className="flex items-center gap-1 text-[#9ca3afFF]"
        >
          Saved{" "}
          <div className="badge badge-sm px-2 py-3 border border-[#9ca3afFF] bg-transparent rounded-full text-white font-bold">
            {addSave.length}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
