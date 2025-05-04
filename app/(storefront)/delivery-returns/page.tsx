export const dynamic = "force-static";

import getSettings from "@/utils/db/settings";
import { orderDispatch, refundDays, returnDays } from "@/lib/constants";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Delivery & Returns Policy",
};

export default async function DeliveryReturns() {
  const { storeAddress, storePhone, storeEmail, storeInstagram } =
    await getSettings();

  return (
    <section className="pt-32 pb-20 p-8 flex flex-col gap-16 items-center">
      <h1>Delivery & Returns Policy</h1>
      <div className="flex flex-col gap-4 leading-7 md:w-3/4">
        <p>
          We offer delivery services throughout {storeAddress} storePhone,
          storeEmail, storeInstagram for all orders placed on our website. We
          use reputable courier companies to ensure your order arrives in a
          timely and secure manner. Here are some important points to note:
        </p>
        <ol className="list-disc pl-10">
          <li>
            <p>
              Delivery timeframes may vary depending on your location and the
              availability of the product. We aim to deliver your order within
              <span className="font-secondary text-base"> 3-5 </span> business
              days.
            </p>
          </li>
          <li>
            <p>Delivery charges are different from state to another</p>
          </li>
          <li>
            <p>
              All orders will be dispatched within{" "}
              <span className="font-secondary text-base">{orderDispatch}</span>{" "}
              day from confirming your order, except for weekends and public
              holidays.
            </p>
          </li>
          <li>
            <p>
              Once your order has been dispatched, we will provide you with a
              tracking number so you can monitor the progress of your delivery.
            </p>
          </li>
          <li>
            <p>
              Please ensure that someone is available to receive the delivery at
              the specified address. In case of a missed delivery, a second
              attempt will be made. If the second attempt is unsuccessful, your
              order will be returned to us and you will be responsible for any
              additional delivery charges.
            </p>
          </li>
        </ol>
        <p className="font-semibold">Return Policy</p>
        <p>
          We want you to be completely satisfied with your products.so no
          exchange or return for any products except the products with any
          defects in or damaged, arrived in bad condition , we offer a{" "}
          <span className="font-secondary text-base"> {returnDays}</span>-day
          return policy. Here are some important points to note:
        </p>
        <ol className="list-disc pl-10">
          <li>
            <p>
              All products must be returned in their original condition and
              packaging, with all accessories and tags attached.
            </p>
          </li>
          <li>
            <p>
              We reserve the right to refuse any returns that do not meet our
              requirements.
            </p>
          </li>
          <li>
            <p>
              {`To initiate a return, please contact us via Instagram or What's
              app and provide your order number and reason for the return.`}
            </p>
          </li>
          <li>
            <p>
              Once your return is approved, we will provide you with
              instructions on how to send the product back to us.
            </p>
          </li>
          <li>
            <p>
              Once we receive the product and verify that it meets our return
              policy requirements, we will issue a refund to your original
              payment method within
              <span className="font-secondary text-base">
                {" "}
                {refundDays}{" "}
              </span>{" "}
              business days.
            </p>
          </li>
          <li>
            <p>
              Please note that shipping charges are non-refundable and you will
              be responsible for any return shipping costs.
            </p>
          </li>
        </ol>
        <p>
          {`If you have any questions or concerns about our delivery and return
          policy, please don't hesitate to contact us.`}
        </p>
        <p>
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
        <p>
          We are committed to providing our customers with a positive shopping
          experience and will do everything we can to ensure your satisfaction.
        </p>
      </div>
    </section>
  );
}
