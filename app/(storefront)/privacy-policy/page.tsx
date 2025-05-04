import getSettings from "@/utils/db/settings";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Privacy Policy",
};

export default async function PrivacyPolicy() {
  const { storeEmail } = await getSettings();

  return (
    <section className="pt-32 pb-20 p-8 flex flex-col gap-16 items-center">
      <h1>Privacy Policy</h1>
      <div className="flex flex-col gap-4 leading-7 md:w-3/4">
        <p>
          We take your privacy seriously and are committed to protecting your
          personal information. This policy explains how we collect, use, and
          protect your information when you use our website or purchase our
          products. By using our website or purchasing our products, you agree
          to the terms of this policy.
        </p>
        <p className="font-semibold">Information We Collect</p>
        <p>
          We may collect the following information when you use our website or
          purchase our products:
        </p>
        <ul className="list-disc pl-10">
          <li>
            <p>
              Personal information: This may include your name, email address,
              phone number, and shipping address.
            </p>
          </li>
          <li>
            <p>
              Payment information: This may include your credit card number and
              billing address.
            </p>
          </li>
          <li>
            <p>
              Usage information: This may include information about how you use
              our website, such as your browsing history and preferences.
            </p>
          </li>
        </ul>
        <p className="font-semibold">How We Use Your Information</p>
        <p>We use your information for the following purposes:</p>
        <ul className="list-disc pl-10">
          <li>
            <p>To process your orders and payments.</p>
          </li>
          <li>
            <p>
              To communicate with you about your orders, including shipping and
              delivery updates.
            </p>
          </li>
          <li>
            <p>
              To personalize your shopping experience by providing product
              recommendations and promotions.
            </p>
          </li>
          <li>
            <p>
              To improve our website and services by analyzing usage data and
              customer feedback.
            </p>
          </li>
          <li>
            <p>To comply with legal and regulatory requirements.</p>
          </li>
        </ul>
        <p>
          We will never sell or share your information with third parties for
          marketing purposes.
        </p>
        <p className="font-semibold">How We Protect Your Information</p>
        <p>
          We take reasonable measures to protect your information from
          unauthorized access, use, and disclosure. This includes using secure
          servers, encryption, and password protection.
        </p>
        <p>
          However, no security system is completely foolproof, and we cannot
          guarantee the security of your information. You are responsible for
          maintaining the confidentiality of your account information and
          password.
        </p>
        <p className="font-semibold">Cookies and Other Technologies</p>
        <p>
          We may use cookies and other tracking technologies to improve your
          browsing experience and provide personalized content and promotions.
          You can disable cookies in your browser settings, but this may limit
          your access to certain features of our website.
        </p>
        <p className="font-semibold">Third-Party Websites</p>
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of these websites. We
          encourage you to review the privacy policies of any third-party
          websites you visit.
        </p>
        <p className="font-semibold">Changes to this Policy</p>
        <p>
          We reserve the right to modify this privacy policy at any time. We
          will notify you of any changes by posting the updated policy on our
          website. Your continued use of our website or products after the
          changes are posted constitutes your acceptance of the revised policy.
        </p>
        <p className="font-semibold">Contact Us</p>
        <p>
          {`If you have any questions or concerns about our privacy policy, please
                  don't hesitate to contact us at `}
          <Link
            href={`mailto:${storeEmail}`}
            className="font-semibold hover:text-sf_primary 
            transition-all ease-in-out duration-300 ">
            {storeEmail}
          </Link>
        </p>
      </div>
    </section>
  );
}
