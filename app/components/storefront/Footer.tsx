import { ArrowRight, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LogoSVG, SunSVG } from "../SVGs";
import getSettings from "@/utils/db/settings";

const links = [
  {
    label: "Orders",
    href: "/orders",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
  {
    label: `Delivery &\n Returns`,
    href: "/delivery-returns",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export default async function Footer() {
  const { storeName, storeInstagram, storeFacebook } = await getSettings();

  return (
    <footer className="w-full mt-10 px-4 md:px-6 lg:px-10 py-2 md:py-4 text-sf_sedcondary font-bold uppercase flex flex-col gap-4 md:gap-12">
      <div className="footer-content grid grid-rows-2 md:grid-rows-1 gap-8 md:gap-4 md:grid-cols-3 h-full">
        <div className="relative z-10 w-full md:col-span-2 flex flex-col">
          <LogoSVG className="lg:w-[80%] lg:translate-x-[35px] fill-sf_sedcondary" />
          <SunSVG
            className="absolute right-0 lg:right-[50px] bottom-[10px] z-10 fill-sf_sedcondary"
            width={100}
            height={100}
          />
          <ul className="z-30 flex flex-col gap-3 lg:absolute lg:left-0 lg:-bottom-[55px] lg:translate-x-[30px]">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-1 hover:text-sf_primary whitespace-pre-line">
                  <span>{link.label}</span>
                  <ArrowRight />
                </Link>
              </li>
            ))}
            <li className="socials flex items-center gap-1">
              <Link
                href={storeInstagram}
                aria-labelledby="instagram"
                className="hover:text-sf_primary"
                aria-label="instagram">
                <Instagram />
              </Link>
              <Link
                href={storeFacebook}
                aria-labelledby="facebook"
                className="hover:text-sf_primary"
                aria-label="facebook">
                <Facebook />
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative w-full h-full">
          <Image
            src={"/video2webp.webp"}
            alt="logo"
            fill
            unoptimized
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-6 copyright capitalize font-normal py-2 font-secondary md:translate-x-[30px]">
        <p>{storeName} &copy; 2025 - All rights reserved</p>
      </div>
    </footer>
  );
}
