/* eslint-disable @next/next/no-img-element */
import { shopFacebook, shopInstagram, shopName } from "@/utils/constants";
import { ArrowRight, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full mt-10 px-4 md:px-6 lg:px-10 py-2 md:py-4 text-sf_sedcondary font-bold uppercase flex flex-col gap-4 md:gap-12">
      <div className="footer-content grid grid-rows-2 md:grid-rows-1 gap-8 md:gap-4 md:grid-cols-3 h-full">
        <div className="relative z-10 w-full md:col-span-2 flex flex-col">
          <Image
            src="/footer-logo.svg"
            alt="logo"
            width={600}
            height={58}
            className="lg:translate-x-[35px]"
          />
          <Image
            src="/footer-sun.svg"
            alt="sun animation"
            width={100}
            height={100}
            className="absolute right-0 lg:right-[20px] bottom-[10px] z-10"
          />
          <ul className="z-30 flex flex-col gap-2 lg:absolute lg:left-0 lg:bottom-0 lg:translate-x-[30px] ">
            <li>
              <Link
                href="/faq"
                className="flex items-center gap-1 hover:text-sf_primary">
                faq <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link
                href="/shipping-returns"
                className="flex items-center gap-1 hover:text-sf_primary">
                Shipping & <br /> Returns <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="flex items-center gap-1 hover:text-sf_primary">
                Privacy Policy <ArrowRight className="w-4 h-4" />
              </Link>
            </li>
            <li className="socials flex items-center gap-1">
              <Link href={shopInstagram} className="hover:text-sf_primary">
                <Instagram />
              </Link>
              <Link href={shopFacebook} className="hover:text-sf_primary">
                <Facebook />
              </Link>
            </li>
          </ul>
        </div>
        <div className="relative w-full h-full">
          <Image src={"/video2webp.webp"} alt="logo" fill unoptimized />
        </div>
      </div>
      <div className="copyright capitalize font-normal py-2 font-secondary md:translate-x-[30px]">
        <p>{shopName} &copy; 2024 - All rights reserved</p>
      </div>
    </footer>
  );
}
