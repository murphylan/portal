import { ENGLISH_URL, VERSEBE_URL } from "@/lib/product-urls";

/**
 * 免费 PWA 引流小应用配置（数据驱动）。
 *
 * 新增一款应用（如「一分钟演说家」上线后）只需：
 *   1. 在此数组加一项（id / url / 图标 / 主题色 / status）
 *   2. 在 messages/{zh,en}.json 的 `FreeApps.items.<id>` 补文案
 *   3. 把图标放到 public/apps/<id>/app-icon-192.png
 * 首页板块、/apps 落地页、Footer 会自动渲染出来。
 *
 * 文案（name / short / desc）走 i18n，按 `id` 取 `FreeApps.items.<id>`。
 */
export type FreeApp = {
  /** 唯一标识，同时作为 i18n key 与 public/apps/<id> 目录名 */
  id: string;
  /** 线上地址；status 为 "coming" 时可为 null */
  url: string | null;
  /** 图标路径（portal 自托管，避免跨域/未上线导致的裂图） */
  icon: string;
  /** 主题色（取自各应用 manifest 的 theme_color） */
  theme: string;
  /** 浅色背景（取自各应用 manifest 的 background_color） */
  bg: string;
  /** live = 已上线可访问；coming = 敬请期待 */
  status: "live" | "coming";
};

export const FREE_APPS: FreeApp[] = [
  {
    id: "english",
    url: ENGLISH_URL,
    icon: "/apps/english/app-icon-192.png",
    theme: "#14532d",
    bg: "#ddf7cf",
    status: "live",
  },
  {
    id: "versebe",
    url: VERSEBE_URL,
    icon: "/apps/versebe/app-icon-192.png",
    theme: "#b03a2e",
    bg: "#f5efe1",
    status: "live",
  },
  {
    // 后续上线：一分钟演说家。上线后改 status:"live" 并补 url/icon 即可。
    id: "speaker",
    url: null,
    icon: "/apps/speaker/app-icon-192.png",
    theme: "#1d4ed8",
    bg: "#dbeafe",
    status: "coming",
  },
];
