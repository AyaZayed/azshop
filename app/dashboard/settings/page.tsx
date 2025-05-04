import SettingsForm from "@/app/dashboard/settings/SettingsForm";
import getSettings from "@/utils/db/settings";
import React from "react";

export default async function SettingsPage() {
  const settings = await getSettings();
  return <SettingsForm settings={settings} />;
}
