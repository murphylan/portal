/** 我们参与的上游开源项目，也是 /dpp 权威段「技术贡献」的落点。 */
export const OPEN_DPP_URL = "https://github.com/open-dpp/open-dpp";

/**
 * DPP 获客工具的对外地址。工具应用独立部署（dpp-lead-engine），
 * 沿用 lib/product-urls.ts 的 <name>.murphylan.cloud 域名约定。
 * 换域名或换路由前缀只改这里。
 *
 * 目前工具仍在开发中，站内所有工具 CTA 都走 ContactDialog（线下陪跑），
 * 没有任何地方调用 dppToolUrl。上线那天：把 dpp-tools.tsx 与 dpp-showcase.tsx
 * 里的 ContactDialog 按钮换回 <a href={dppToolUrl(slug)} target="_blank">，
 * 并去掉 Dpp.tools.notice 提示条。
 */
export const DPP_TOOLS_URL = "https://dpp.murphylan.cloud";

export function dppToolUrl(slug: string) {
  return `${DPP_TOOLS_URL}/tools/${slug}`;
}

/**
 * 战略文档 §5.1 的八个工具，按漏斗分两组：
 * 「合规自查」面向决策者（法规知识层），「开发者工具」面向技术团队（工程实践层）。
 * span 刻意不等宽 —— DESIGN.md §5 禁止等宽三卡。
 * id 同时是 i18n 的 key（Dpp.tools.items.<id>）和工具应用的路由 slug。
 */
export type DppTool = { id: string; span: string; lead: boolean };
export type DppToolGroup = { id: string; tools: DppTool[] };

export const DPP_TOOL_GROUPS: DppToolGroup[] = [
  {
    id: "selfcheck",
    tools: [
      { id: "readiness-assessment", span: "lg:col-span-6", lead: true },
      { id: "espr-checklist", span: "lg:col-span-3", lead: false },
      { id: "battery-checklist", span: "lg:col-span-3", lead: false },
    ],
  },
  {
    id: "developer",
    tools: [
      { id: "passport-validator", span: "lg:col-span-7", lead: false },
      { id: "json-validator", span: "lg:col-span-5", lead: false },
      { id: "qr-generator", span: "lg:col-span-5", lead: false },
      { id: "template-generator", span: "lg:col-span-4", lead: false },
      { id: "aas-explorer", span: "lg:col-span-3", lead: false },
    ],
  },
];
