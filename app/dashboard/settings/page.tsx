import SettingsForm from "@/app/dashboard/settings/SettingsForm";
import { getAllSettings } from "@/utils/db/settings";
import React from "react";

export default async function SettingsPage() {
  const settings = await getAllSettings();
  return <SettingsForm settings={settings} />;
}
