import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Murphy Cloud - 一站式企业应用解决方案",
  description:
    "Murphy 云服务平台整合项目管理、活动运营、智能识别等核心能力，为您的业务提供强大的数字化支持。",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
  openGraph: {
    title: "Murphy Cloud - 一站式企业应用解决方案",
    description:
      "整合项目管理、活动运营、智能识别等核心能力，为您的业务提供强大的数字化支持。",
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
    title: "Murphy Cloud - 一站式企业应用解决方案",
    description:
      "整合项目管理、活动运营、智能识别等核心能力，为您的业务提供强大的数字化支持。",
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
