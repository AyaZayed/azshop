import SettingsForm from "@/app/components/dashboard/SettingsForm";
import prisma from "@/app/lib/db";
import React from "react";

export default async function SettingsPage() {
  let settings = await prisma.settings.findFirst();
  if (!settings) {
    settings = {
      id: "1",
      storeName: "",
      storeDescription: "",
      storeEmail: "",
      storePhone: "",
      storeAddress: "",
      storeInstagram: "",
      storeFacebook: "",
      currency: "USD",
      currencySymbol: "$",
      primaryColor: "#000000",
      secondaryColor: "#000000",
      backgroundColor: "#000000",
    };
  }
  return <SettingsForm settings={settings} />;
}
