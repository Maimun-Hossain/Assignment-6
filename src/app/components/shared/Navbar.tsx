import Image from "next/image";
import { Oswald, Inter } from "next/font/google";
import Link from "next/link";
import logo from "../../../../public/logo.png";
const oswald = Oswald();
const inter = Inter();

const Navbar = () => {
  const links = (
    <>
      <li>
        <Link href="/" className="text-[#9ca3afFF]">
          Workouts
        </Link>
      </li>
      <li>
        <Link href="/my-plan" className="text-[#9ca3afFF]">
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
            className="menu menu-sm dropdown-content bg-[#0C0D10] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Image src={logo} alt="logo" width={28} height={28}></Image>
        <a className={`pl-2 text-xl font-bold text-white ${oswald.className}`}>FITLOG</a>
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
            0
          </div>
        </Link>
        <Link
          href="/my-plan"
          className="flex items-center gap-1 text-[#9ca3afFF]"
        >
          Saved{" "}
          <div className="badge badge-sm px-2 py-3 border border-[#9ca3afFF] bg-transparent rounded-full text-white font-bold">
            0
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
