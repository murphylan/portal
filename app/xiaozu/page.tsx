import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import XiaozuShowcase from "../components/xiaozu/xiaozu-showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("xiaozuTitle"),
    description: t("xiaozuDescription"),
  };
}

export default function XiaozuPage() {
  return <XiaozuShowcase />;
}
