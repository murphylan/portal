import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Murphy 云 - WorkSync 文档协作与更多在线工具",
  description:
    "Murphy 云：WorkSync 项目文档与协作平台（主力），以及活动现场互动工具（签到、投票、抽奖、表单）与中国象棋辅助工具。按需访问对应子站即可使用。",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    title: "Murphy 云 - WorkSync 文档协作与更多在线工具",
    description:
      "WorkSync 项目文档与协作；互动工具 sign.murphylan.cloud；象棋辅助 chess.murphylan.cloud。",
    url: "https://murphylan.cloud",
    siteName: "Murphy Cloud",
    images: [
      {
        url: "https://murphylan.cloud/og-image.png",
        width: 1200,
        height: 630,
        alt: "Murphy Cloud",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murphy 云 - WorkSync 文档协作与更多在线工具",
    description: "WorkSync 文档协作；互动工具与象棋辅助等在线 SaaS。",
    images: ["https://murphylan.cloud/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* Geist 字体 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
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
      </body>
    </html>
  );
}
