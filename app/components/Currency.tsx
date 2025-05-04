import getSettings from "@/utils/db/settings";
import React from "react";

export default async function Currency() {
  const currency = (await getSettings()).currencySymbol;

  return <span>{currency}</span>;
}
