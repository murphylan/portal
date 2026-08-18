import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import WorkGraphShowcase from "../../components/worksync/workgraph-showcase";

const siteUrl = "https://murphylan.cloud";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("WorkGraph");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// WorkGraph is a product, so it gets its own SoftwareApplication node. It is
// declared as the successor of WorkSync (`isBasedOn`) rather than a separate
// unrelated app, because the page positions it as the upgrade.
function getStructuredData(locale: string) {
  const isZh = locale === "zh";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WorkGraph",
    applicationCategory: "ProjectManagementApplication",
    operatingSystem: "Web",
    description: isZh
      ? "以任务为节点、关系为边、模板为本体的语义化任务平台：任务图谱、层级与依赖、文档与图表等同源资源、两层 RBAC、Webhook 与 JSON-LD 读接口。"
      : "A semantic task platform where tasks are nodes, relationships are edges and templates are the ontology: task graph, hierarchy and dependencies, one resource mechanism for docs and diagrams, two-layer RBAC, webhooks and a JSON-LD read API.",
    isBasedOn: {
      "@type": "SoftwareApplication",
      name: "WorkSync",
      url: `${siteUrl}${isZh ? "" : "/en"}/worksync`,
    },
    publisher: {
      "@type": "Organization",
      name: isZh ? "Murphy 云" : "Murphy Cloud",
      url: siteUrl,
    },
    url: `${siteUrl}${isZh ? "" : "/en"}/worksync/workgraph`,
  };
}

export default async function WorkGraphPage() {
  const locale = await getLocale();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is generated from static product metadata.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(locale)),
        }}
      />
      <WorkGraphShowcase />
    </>
  );
}
