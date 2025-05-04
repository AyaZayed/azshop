import prisma from "@/lib/db";
import { memoize } from "nextjs-better-unstable-cache";

const initialSettings = {
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

const getSettings = memoize(
  async () => {
    const settings = await prisma.settings.findFirst();
    if (!settings) {
      return initialSettings;
    }
    return settings;
  },
  {
    revalidateTags: ["settings"],
    persist: true,
    suppressWarnings: true,
  }
);

export default getSettings;
