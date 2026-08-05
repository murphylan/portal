import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { OPEN_DPP_URL } from "@/lib/dpp-tools";
import DppShowcase from "../components/dpp/dpp-showcase";

const siteUrl = "https://murphylan.cloud";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Dpp");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// Service entity for the consulting/delivery business — the homepage JSON-LD
// only describes the SaaS products (ItemList<SoftwareApplication>), so DPP
// needs its own graph node.
function getStructuredData(locale: string) {
  const isZh = locale === "zh";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isZh
      ? "DPP 数字产品护照落地工程"
      : "Digital Product Passport Implementation",
    serviceType: "EU Digital Product Passport implementation",
    description: isZh
      ? "面向出口欧盟的制造企业，提供 ESPR / 数字产品护照的合规落地工程：数据盘点、数据模型、系统对接、载体与验证、上线运营。"
      : "ESPR / EU Digital Product Passport implementation engineering for manufacturers exporting to the EU: data audit, data modelling, system integration, data carriers and verification, launch and operations.",
    provider: {
      "@type": "Organization",
      name: isZh ? "Murphy 云" : "Murphy Cloud",
      url: siteUrl,
      // open-dpp backs the upstream-contributor claim in the authority section
      sameAs: ["https://github.com/murphylan", OPEN_DPP_URL],
    },
    areaServed: [
      { "@type": "Country", name: "China" },
      { "@type": "AdministrativeArea", name: "European Union" },
    ],
    url: `${siteUrl}${isZh ? "" : "/en"}/dpp`,
  };
}

export default async function DppPage() {
  const locale = await getLocale();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static service metadata.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(locale)),
        }}
      />
      <DppShowcase />
    </>
  );
}
