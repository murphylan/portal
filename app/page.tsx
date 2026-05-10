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
      offers: [
        {
          "@type": "Offer",
          name: isZh ? "在线会员" : "Online membership",
          price: "199",
          priceCurrency: "CNY",
          description: isZh ? "¥199 / 年" : "¥199 / year",
        },
        {
          "@type": "Offer",
          name: isZh ? "客户内网安装" : "Private intranet install",
          price: "1999",
          priceCurrency: "CNY",
          description: isZh ? "一次性付费" : "One-time payment",
        },
        {
          "@type": "Offer",
          name: isZh ? "源码授权" : "Source license",
          price: "19999",
          priceCurrency: "CNY",
          description: isZh ? "一次性付费" : "One-time payment",
        },
      ],
    },
    {
      name: "小卒",
      alternateName: "Xiaozu",
      description: isZh
        ? "基于 Pikafish 引擎的中国象棋 AI 辅助平台，支持实时分析与在线对弈。"
        : "Chinese chess AI assistant powered by Pikafish, with realtime analysis and online play.",
      url: CHESS_URL,
      offers: {
        "@type": "Offer",
        price: "19.9",
        priceCurrency: "CNY",
        description: isZh ? "¥19.9 / 月" : "¥19.9 / month",
      },
    },
    {
      name: "Sign",
      alternateName: "Murphy Sign",
      description: isZh
        ? "企业活动互动平台，覆盖签到、投票、抽奖、表单。"
        : "Event engagement platform for check-in, voting, lottery, and forms.",
      url: SIGN_URL,
      offers: getSubscriptionOffers(isZh),
    },
    {
      name: "小商城",
      alternateName: "Mobile Store",
      description: isZh
        ? "H5 移动电商平台，支持商品浏览、购物车、订单管理与搜索筛选。"
        : "H5 mobile commerce platform with product browsing, cart, orders, and search.",
      url: SHOPPING_URL,
      offers: getSubscriptionOffers(isZh),
    },
    {
      name: "TimeSlot",
      description: isZh
        ? "课外学习预约系统，支持课程、教师、学员与时段预约管理。"
        : "Course booking system for classes, teachers, students, and schedule management.",
      url: TIMESLOT_URL,
      offers: getSubscriptionOffers(isZh),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: isZh ? "Murphy 云" : "Murphy Cloud",
    url: siteUrl,
    sameAs: ["https://github.com/murphylan"],
    makesOffer: products.map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        ...product,
      },
    })),
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

function getSubscriptionOffers(isZh: boolean) {
  return [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "CNY",
      description: isZh ? "基础免费套餐" : "Basic free plan",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "39",
      priceCurrency: "CNY",
      description: isZh
        ? "¥39 / 月，年付 ¥374（8 折）"
        : "¥39 / month, ¥374 yearly (20% off)",
    },
    {
      "@type": "Offer",
      name: "Team",
      price: "99",
      priceCurrency: "CNY",
      description: isZh
        ? "¥99 / 月，年付 ¥950（8 折）"
        : "¥99 / month, ¥950 yearly (20% off)",
    },
  ];
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
