import { getLocale } from "next-intl/server";
import {
  CHESS_URL,
  SHOPPING_URL,
  SIGN_URL,
  TIMESLOT_URL,
  WORKSYNC_URL,
} from "@/lib/product-urls";
import AppleShowcase from "./components/apple-showcase";

const siteUrl = "https://murphylan.cloud";

function getStructuredData(locale: string) {
  const isZh = locale === "zh";
  const products = [
    {
      name: "WorkSync",
      description: isZh
        ? "项目文档与协作平台，覆盖文档、任务看板、PlantUML、AI 图表助手与协作白板。"
        : "Project documentation and collaboration platform with docs, task boards, PlantUML, AI diagrams, and whiteboards.",
      url: WORKSYNC_URL,
    },
    {
      name: "小卒",
      alternateName: "Xiaozu",
      description: isZh
        ? "中国象棋智能辅助平台：AI 教练实时分析、走法建议、一键自动代走与在线对弈。"
        : "Chinese chess AI assistant: real-time analysis, move suggestions, one-tap auto-move, and online play.",
      url: CHESS_URL,
    },
    {
      name: "Sign",
      alternateName: "Murphy Sign",
      description: isZh
        ? "企业活动互动平台，覆盖签到、投票、抽奖、表单。"
        : "Event engagement platform for check-in, voting, lottery, and forms.",
      url: SIGN_URL,
    },
    {
      name: "小商城",
      alternateName: "Mobile Store",
      description: isZh
        ? "H5 移动电商平台，支持商品浏览、购物车、订单管理与搜索筛选。"
        : "H5 mobile commerce platform with product browsing, cart, orders, and search.",
      url: SHOPPING_URL,
    },
    {
      name: "TimeSlot",
      description: isZh
        ? "课外学习预约系统，支持课程、教师、学员与时段预约管理。"
        : "Course booking system for classes, teachers, students, and schedule management.",
      url: TIMESLOT_URL,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: isZh ? "Murphy 云" : "Murphy Cloud",
    url: siteUrl,
    sameAs: ["https://github.com/murphylan"],
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          ...product,
        },
      })),
    },
  };
}

export default async function Home() {
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
      <AppleShowcase />
    </>
  );
}
