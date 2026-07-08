// 生成微信/社交分享缩略图 public/og.png（1200×630）。
//
// portal 是 `output: standalone` 常驻 Node 服务，og:image 仍是 public/ 下的静态文件
// （deploy/deploy.sh 会把 public/ 拷进 .next/standalone/）。此前这张图靠浏览器/设计工具
// 手动导出、不可复现；改为与 Versebe/Speakbe/english 同一套技术（fontkit 字形转矢量 +
// sharp 栅格化）在构建期一次性生成，产物入库。改动 logo/文案时重跑：
//   npm i fontkit sharp && pnpm gen:og
//
// 环境变量：PORTAL_ROOT 覆盖仓库根；PORTAL_OG_FONT 覆盖字体路径。
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import * as fontkit from "fontkit";
import sharp from "sharp";

const REPO_ROOT =
  process.env.PORTAL_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONT_PATH =
  process.env.PORTAL_OG_FONT || "/System/Library/Fonts/Hiragino Sans GB.ttc";
const OUT_PATH = path.join(REPO_ROOT, "public", "og.png");

const WIDTH = 1200;
const HEIGHT = 630;

// 品牌色（与 scripts/og-image.svg 深绿主题一致）。
const GREEN = "#34c759";
const WHITE = "#ffffff";
const SOFT = "rgba(255,255,255,0.92)";

function pickFace(collection, preferred) {
  const faces = collection.fonts || [collection];
  for (const name of preferred) {
    const hit = faces.find((f) => f.postscriptName === name);
    if (hit) return hit;
  }
  return faces[0];
}

// 左锚点：从 startX 起把文字排成矢量 <path>，返回 { svg, width }。
// 字体坐标系 y 向上、SVG y 向下，故 scale(s,-s) 翻转，落在基线 baselineY 上。
function runToPaths(font, text, sizePx, startX, baselineY, fill, letterSpacing = 0) {
  const s = sizePx / font.unitsPerEm;
  const run = font.layout(text);
  let penX = startX;
  const paths = [];
  run.glyphs.forEach((glyph, i) => {
    const d = glyph.path.toSVG();
    if (d && d.trim()) {
      paths.push(
        `<path d="${d}" transform="translate(${penX.toFixed(2)} ${baselineY}) scale(${s.toFixed(5)} ${(-s).toFixed(5)})"/>`,
      );
    }
    penX += run.positions[i].xAdvance * s + letterSpacing;
  });
  const width =
    run.positions.reduce((sum, p) => sum + p.xAdvance, 0) * s +
    letterSpacing * Math.max(0, run.glyphs.length - 1);
  return { svg: `<g fill="${fill}">${paths.join("")}</g>`, width };
}

// 居中单色行。
function centered(font, text, sizePx, cx, baselineY, fill, letterSpacing = 0) {
  const s = sizePx / font.unitsPerEm;
  const run = font.layout(text);
  const w =
    run.positions.reduce((sum, p) => sum + p.xAdvance, 0) * s +
    letterSpacing * Math.max(0, run.glyphs.length - 1);
  return runToPaths(font, text, sizePx, cx - w / 2, baselineY, fill, letterSpacing).svg;
}

function buildSvg(collection) {
  const bold = pickFace(collection, ["HiraginoSansGB-W6"]);
  const regular = pickFace(collection, ["HiraginoSansGB-W3"]);
  const cx = WIDTH / 2;

  // 混排字标「Murphy 云」：Murphy 白、云 绿，整体居中。
  const wmSize = 150;
  const left = runToPaths(bold, "Murphy ", wmSize, 0, 0, WHITE);
  const right = runToPaths(bold, "云", wmSize, 0, 0, GREEN);
  const wmTotal = left.width + right.width;
  const wmX = cx - wmTotal / 2;
  const wmBaseline = 372;
  const wmLeft = runToPaths(bold, "Murphy ", wmSize, wmX, wmBaseline, WHITE);
  const wmRight = runToPaths(bold, "云", wmSize, wmX + left.width, wmBaseline, GREEN);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="bg" cx="32%" cy="26%" r="90%">
      <stop offset="0" stop-color="#15402f"/>
      <stop offset="0.55" stop-color="#0a281f"/>
      <stop offset="1" stop-color="#05130e"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="rgba(52,199,89,0.28)"/>
      <stop offset="0.7" stop-color="rgba(52,199,89,0)"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <circle cx="${cx}" cy="${HEIGHT / 2}" r="360" fill="url(#glow)"/>
  <circle cx="${cx}" cy="${HEIGHT / 2}" r="300" fill="none" stroke="rgba(255,255,255,0.05)"/>
  <!-- eyebrow -->
  ${centered(bold, "MURPHY CLOUD", 34, cx, 210, GREEN, 14)}
  <!-- 字标 Murphy 云 -->
  ${wmLeft.svg}${wmRight.svg}
  <!-- tagline -->
  ${centered(regular, "8+ 款云端产品 · 一站式解决方案", 44, cx, 468, SOFT)}
</svg>`;
}

async function main() {
  if (!fs.existsSync(FONT_PATH)) throw new Error(`找不到字体：${FONT_PATH}`);
  const svg = buildSvg(fontkit.openSync(FONT_PATH));
  await sharp(Buffer.from(svg)).png().toFile(OUT_PATH);
  console.log(`✓ 写出 ${OUT_PATH}（${WIDTH}×${HEIGHT}）`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
