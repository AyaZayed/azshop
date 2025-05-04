export const dynamic = "force-static";

import getSettings from "@/utils/db/settings";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Contact Us",
};

export default async function Contact() {
  const { storePhone, storeEmail, storeInstagram } = await getSettings();

  return (
    <section className="pt-32 pb-20 p-8 flex flex-col gap-16 items-center">
      <h1>Contact Us</h1>
      <div className="flex flex-col gap-4 leading-7 md:w-3/4">
        <p>
          {`Thank you for your interest in our skin care products. If you have any questions or concerns, please don't hesitate to contact us. We are always happy to help and will do our best to respond to your inquiry as soon as possible.`}
        </p>
        <p>{`Here's how you can get in touch with us:`}</p>
        <p className="mt-6">
          Call us:{" "}
          <Link
            href={`tel:${storePhone}`}
            className="text-base font-secondary font-semibold hover:text-sf_primary transition-all ease-in-out duration-300">
            {storePhone}`
          </Link>
        </p>
        <p>
          Instagram:{" "}
          <Link
            href={storeInstagram}
            className="font-semibold hover:text-sf_primary transition-all ease-in-out duration-300">
            @{storeInstagram}
          </Link>
        </p>
        <p>
          Email:{" "}
          <Link
            href={`mailto:${storeEmail}`}
            className="font-semibold hover:text-sf_primary transition-all ease-in-out duration-300">
            {storeEmail}`
          </Link>
        </p>
        <p className="mt-10">
          Thank you for choosing our products for your skin care needs. We look
          forward to hearing from you soon.
        </p>
      </div>
    </section>
  );
}
