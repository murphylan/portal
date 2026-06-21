import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import QRCode from "qrcode";
import { FREE_APPS } from "@/lib/free-apps";
import AppsShowcase from "../components/apps-showcase";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Apps");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AppsPage() {
  // 服务端生成各应用地址的二维码（data URL），桌面端扫码即可在手机上打开并安装。
  const qr: Record<string, string> = {};
  for (const app of FREE_APPS) {
    if (app.url) {
      qr[app.id] = await QRCode.toDataURL(app.url, {
        margin: 1,
        width: 240,
        color: { dark: "#1d1d1f", light: "#ffffff" },
      });
    }
  }

  return <AppsShowcase qr={qr} />;
}
