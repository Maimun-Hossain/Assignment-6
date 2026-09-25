import Image from "next/image";
import { Oswald, Inter } from "next/font/google";
import logo from "../../../../public/logo.png";

const oswald = Oswald();
const inter = Inter();

const Footer = () => {
  return (
    <footer className="footer md:px-0 max-w-[97%] mx-auto sm:footer-horizontal text-neutral-content items-center p-4">
      <aside className="grid-flow-col items-center">
        <Image
          src={logo}
          alt="logo"
          height={20}
          className="origin-center rotate-135"
          width={20}
        ></Image>
        <h3 className={`${oswald.className} font-bold text-white`}>FITLOG</h3>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <p className={`${inter.className} text-xs text-[#6b7280FF]`}>
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
