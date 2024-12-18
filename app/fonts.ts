import localFont from "next/font/local";
import { Nunito } from "next/font/google";

export const fontNunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
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

export const fontAveria = localFont({
  src: [
    {
      path: "../public/fonts/Averia/AveriaSerifGWF-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-averia",
});

export const fontMaison = localFont({
  src: [
    {
      path: "../public/fonts/MaisonNeue/MaisonNeueMedium.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-secondary",
});

export const fontOPTIDutch = localFont({
  src: [
    {
      path: "../public/fonts/OPTIDutch/OPTIDutch-Oldstyle.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-optidutch",
});
