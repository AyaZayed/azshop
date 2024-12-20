import localFont from "next/font/local";
import { Nunito } from "next/font/google";
import { Rubik } from "next/font/google";

export const fontNunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nunito",
});

export const fontBogart = localFont({
  src: [
    {
      path: "../public/fonts/Bogart/Bogart-Regular-trial.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-primary",
});

export const fontRubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-secondary",
});
