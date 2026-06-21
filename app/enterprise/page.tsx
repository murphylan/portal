import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import EnterpriseShowcase from "../components/enterprise-showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Enterprise");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function EnterprisePage() {
  return <EnterpriseShowcase />;
}
