"use client";
import { editSettings } from "@/app/actions/settingsActions";
import SubmitButton from "@/app/components/SubmitButtons";
import { supportedCurrencies } from "@/app/lib/currencies";
import { settingsSchema } from "@/app/lib/zodSchemas";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Settings } from "@prisma/client";

import React from "react";
import { useFormState } from "react-dom";

type Props = {
  settings?: Settings;
};

export default function SettingsForm({ settings }: Props) {
  const currencies = supportedCurrencies.map((c) => c.code);
  const [lastResult, action] = useFormState(editSettings, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      {lastResult?.status === "success" && <Alert>Success</Alert>}
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Store Name</Label>
                <Input
                  id="name"
                  type="text"
                  key={fields.storeName.key}
                  name={fields.storeName.name}
                  defaultValue={settings?.storeName}
                  placeholder="Le Rub"
                  className="capitalize"
                />
                <p className="text-sm text-red-500">
                  {fields.storeName.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Store Email</Label>
                <Input
                  id="email"
                  type="email"
                  key={fields.storeEmail.key}
                  name={fields.storeEmail.name}
                  defaultValue={settings?.storeEmail}
                  placeholder="lerub@contact.com"
                />
                <p className="text-sm text-red-500">
                  {fields.storeEmail.errors}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 box-content">
              <div className="flex flex-col gap-2">
                <Label htmlFor="desc">Store Description</Label>
                <Textarea
                  id="desc"
                  placeholder="Le Rub is a store"
                  className="h-full first-letter:capitalize"
                  key={fields.storeDescription.key}
                  name={fields.storeDescription.name}
                  defaultValue={settings?.storeDescription}
                />
                <p className="text-sm text-red-500">
                  {fields.storeDescription.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Store Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    key={fields.storePhone.key}
                    name={fields.storePhone.name}
                    defaultValue={settings?.storePhone}
                    placeholder="+1 (123) 456-7890"
                  />
                  <p className="text-sm text-red-500">
                    {fields.storePhone.errors}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="address">Store Address</Label>
                  <Input
                    id="address"
                    type="text"
                    key={fields.storeAddress.key}
                    name={fields.storeAddress.name}
                    defaultValue={settings?.storeAddress}
                    placeholder="123 Main Street"
                    className="capitalize"
                  />
                  <p className="text-sm text-red-500">
                    {fields.storeAddress.errors}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="insta">Store Instagram</Label>
                <Input
                  id="insta"
                  type="text"
                  key={fields.storeInstagram.key}
                  name={fields.storeInstagram.name}
                  defaultValue={settings?.storeInstagram}
                  placeholder="www.Instagram.com"
                />
                <p className="text-sm text-red-500">
                  {fields.storeInstagram.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="facebook">Store Facebook</Label>
                <Input
                  id="facebook"
                  type="text"
                  key={fields.storeFacebook.key}
                  name={fields.storeFacebook.name}
                  defaultValue={settings?.storeFacebook}
                  placeholder="www.facebook.com"
                />
                <p className="text-sm text-red-500">
                  {fields.storeFacebook.errors}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  key={fields.currency.key}
                  defaultValue={settings?.currency}
                  name={fields.currency.name}>
                  <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-red-500">{fields.currency.errors}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="primary">Primary Color</Label>
                  <Input
                    id="primary"
                    type="color"
                    key={fields.primaryColor.key}
                    name={fields.primaryColor.name}
                    defaultValue={settings?.primaryColor || "#ff5500"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="secondary">Secondary Color</Label>
                  <Input
                    id="secondary"
                    type="color"
                    key={fields.secondaryColor.key}
                    defaultValue={settings?.secondaryColor || "#a54547"}
                    name={fields.secondaryColor.name}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="background">Background Color</Label>
                  <Input
                    id="background"
                    type="color"
                    key={fields.backgroundColor.key}
                    defaultValue={settings?.backgroundColor || "#f6f2ed"}
                    name={fields.backgroundColor.name}
                  />
                </div>
              </div>
            </div>
            <SubmitButton label="Save Settings" />
          </CardContent>
        </Card>
      </form>
    </>
  );
}
