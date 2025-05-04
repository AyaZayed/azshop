import getSettings from "@/utils/db/settings";
import React from "react";

export default async function Currency() {
  const { currencySymbol } = await getSettings();

  return <span>{currencySymbol}</span>;
}
