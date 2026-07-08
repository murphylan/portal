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
    icons: [{ rel: "icon", url: "/favicon.svg" }],
    // 缩略图是预生成的静态 PNG（见 scripts/build-og.mjs，`pnpm gen:og` 重建，
    // 与 Versebe/Speakbe/english 同一套 fontkit+sharp 方案）。standalone 部署由
    // deploy/deploy.sh 把 public/ 拷进 .next/standalone/，Node 以 image/png 响应。
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "https://murphylan.cloud",
      siteName: "Murphy Cloud",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Murphy Cloud" }],
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: ["/og.png"],
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
            color="#8b5cf6"
            showSpinner={false}
            shadow="0 0 10px #8b5cf6,0 0 5px #8b5cf6"
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
