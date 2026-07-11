import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  const locale = await getLocale();

  return {
    // 绝对基址：让 og:image / 图标解析为完整 HTTPS 链接（微信抓取缩略图需要）。
    metadataBase: new URL("https://murphylan.cloud"),
    title: t("rootTitle"),
    description: t("rootDescription"),
    // SVG for browser tabs; PNG + apple-touch-icon give WeChat / iOS a square
    // raster brand thumbnail (they don't use SVG favicons or wide og:image here).
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    // 缩略图是预生成的静态 PNG（见 scripts/build-og.mjs，`pnpm gen:og` 重建，
    // 与 Versebe/Speakbe/english 同一套 fontkit+sharp 方案）。standalone 部署由
    // deploy/deploy.sh 把 public/ 拷进 .next/standalone/，Node 以 image/png 响应。
    // 分享缩略图用方形品牌 logo（微信小卡片首选方形图，不会被居中裁坏）。
    // 宽幅 og.png 作为大卡片场景的次选保留。
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://murphylan.cloud",
      siteName: "Murphy Cloud",
      images: [
        { url: "/og-logo.png", width: 640, height: 640, alt: "Murphy 云" },
        { url: "/og.png", width: 1200, height: 630, alt: "Murphy Cloud" },
      ],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/og-logo.png"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <head>
        {/* Geist 字体 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <NextTopLoader
            color="#00794c"
            showSpinner={false}
            shadow="0 0 10px #00794c,0 0 5px #00794c"
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
