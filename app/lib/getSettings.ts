import prisma from "./db";

export default async function getSettings() {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    return {
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
  return {
    storeName: settings.storeName,
    storeDescription: settings.storeDescription,
    storeEmail: settings.storeEmail,
    storePhone: settings.storePhone,
    storeAddress: settings.storeAddress,
    storeInstagram: settings.storeInstagram,
    storeFacebook: settings.storeFacebook,
    currency: settings.currency,
    currencySymbol: settings.currencySymbol,
    primaryColor: settings.primaryColor,
    secondaryColor: settings.secondaryColor,
    backgroundColor: settings.backgroundColor,
  };
}
