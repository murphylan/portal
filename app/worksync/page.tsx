import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import WorkSyncShowcase from "../components/worksync/worksync-showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("worksyncTitle"),
    description: t("worksyncDescription"),
  };
}

export default function WorkSyncPage() {
  return <WorkSyncShowcase />;
}
