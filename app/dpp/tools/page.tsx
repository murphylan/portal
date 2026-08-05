import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import DppTools from "@/app/components/dpp/dpp-tools";
import { DPP_TOOL_GROUPS } from "@/lib/dpp-tools";

const siteUrl = "https://murphylan.cloud";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Dpp.tools");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// ItemList of the eight tools — these are the long-tail entry points the lead
// engine depends on, so they get their own graph node rather than riding on the
// /dpp Service entity.
//
// No per-tool `url`: the tool app is still in development and every CTA on the
// page books a session instead, so pointing search engines at tool URLs that
// don't resolve yet would be advertising 404s. Add `url: dppToolUrl(tool.id)`
// back when the app ships (see lib/dpp-tools.ts).
async function getStructuredData(locale: string) {
  const t = await getTranslations("Dpp.tools");
  const tools = DPP_TOOL_GROUPS.flatMap((group) => group.tools);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    url: `${siteUrl}${locale === "zh" ? "" : "/en"}/dpp/tools`,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "WebApplication",
        name: t(`items.${tool.id}.title`),
        description: t(`items.${tool.id}.desc`),
        applicationCategory: "BusinessApplication",
      },
    })),
  };
}

export default async function DppToolsPage() {
  const locale = await getLocale();
  const structuredData = await getStructuredData(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static tool metadata.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DppTools />
    </>
  );
}
