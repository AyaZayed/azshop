import React from "react";
import getSettings from "../lib/getSettings";

export default async function Currency() {
  const currency = (await getSettings()).currencySymbol;

  return <span>{currency}</span>;
}
