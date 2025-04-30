"use server";

import { parseWithZod } from "@conform-to/zod";
import isAdmin from "../lib/isAdmin";
import { settingsSchema } from "../lib/zodSchemas";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";
import getSymbolFromCurrency from "currency-symbol-map";

export async function editSettings(prevState: unknown, formData: FormData) {
  isAdmin();

  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.settings.update({
    where: {
      id: "1",
    },
    data: {
      storeName: submission.value.storeName,
      storeDescription: submission.value.storeDescription,
      storeEmail: submission.value.storeEmail,
      storePhone: submission.value.storePhone,
      storeAddress: submission.value.storeAddress,
      storeInstagram: submission.value.storeInstagram,
      storeFacebook: submission.value.storeFacebook,
      currency: submission.value.currency,
      currencySymbol: getSymbolFromCurrency(submission.value.currency),
      primaryColor: submission.value.primaryColor,
      secondaryColor: submission.value.secondaryColor,
      backgroundColor: submission.value.backgroundColor,
    },
  });

  revalidatePath("/dashboard/settings");
}
