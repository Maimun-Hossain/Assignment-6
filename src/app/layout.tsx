import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import DataProvider from "@/context/DataProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Browse workouts, build today's plan, and track your training.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full bg-[#0C0D10] antialiased`}
    >
      <body className="min-h-screen bg-[#0C0D10]">
        <DataProvider>
          <div className="">
            <div className="sticky top-0 z-50 border-b-2 border-b-[#1c1f26FF] bg-[#0C0D10]">
              <Navbar></Navbar>
            </div>
            {children}
            <div className="border-t-2 border-t-[#1c1f26FF]">
              <Footer></Footer>
            </div>
          </div>
          <ToastContainer
            theme="dark"
            position="bottom-right"
            autoClose={2500}
          />
        </DataProvider>
      </body>
    </html>
  );
}
