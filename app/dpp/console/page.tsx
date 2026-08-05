import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import DppConsole from "../../components/dpp/dpp-console";

// Internal demo view: no public entry point, kept out of the index and the
// sitemap (see app/robots.ts).
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Dpp.console");

  return {
    title: t("metaTitle"),
    robots: { index: false, follow: false },
  };
}

export default function DppConsolePage() {
  return <DppConsole />;
}
