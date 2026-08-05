"use client";

// ---------------------------------------------------------------------------
// Digital Product Passport card — the DPP page's hero visual. Same conventions
// as product-art.tsx: vector so it stays sharp at any size, painted in the
// 7-Eleven tri-color with green leading and orange/red for rhythm.
//
// The field labels/values are baked in English on purpose — this is an
// illustration of a passport record (like the fake kanban cards inside
// WorkSyncArt), not localisable page copy. The floating callouts that sit
// *outside* the card do come from i18n; see dpp-showcase.tsx.
//
// Swapping in a real passport screenshot later: replace the whole <svg> with
// an <Image>; the caller only does <PassportArt />.
// ---------------------------------------------------------------------------

const C = {
  card: "#ffffff",
  edge: "#dfeee7",
  ink: "#153e30",
  accent: "#00794c", // green — primary
  accent2: "#3ab27f", // green — light
  soft: "rgba(0,121,76,0.09)",
  line: "rgba(21,62,48,0.14)",
  chip: "#eef8f3",
  orange: "#f58220",
  red: "#e11b22",
  steel: "#5b6167",
};

const DATA = [
  { label: "PRODUCT ID", value: "DPP-EU-08492" },
  { label: "CARBON FOOTPRINT", value: "14.8 kg CO₂e" },
  { label: "RECYCLED CONTENT", value: "28.4%" },
  { label: "COMPLIANCE", value: "ESPR Ready", accent: true },
];

export default function PassportArt() {
  return (
    <svg
      viewBox="0 0 420 470"
      className="h-auto w-full"
      fill="none"
      role="img"
      aria-label="Digital Product Passport"
    >
      {/* card shell */}
      <rect
        x="8"
        y="8"
        width="404"
        height="454"
        rx="22"
        fill={C.card}
        stroke={C.edge}
      />
      {/* tri-color identity stripe along the top edge */}
      <clipPath id="dpp-card-top">
        <rect x="8" y="8" width="404" height="14" rx="7" />
      </clipPath>
      <g clipPath="url(#dpp-card-top)">
        <rect x="8" y="8" width="135" height="14" fill={C.accent} />
        <rect x="143" y="8" width="135" height="14" fill={C.orange} />
        <rect x="278" y="8" width="134" height="14" fill={C.red} />
      </g>

      {/* header: mark + wordmark + menu dots */}
      <rect x="30" y="40" width="26" height="26" rx="8" fill={C.accent} />
      <text
        x="43"
        y="58"
        fill="#ffffff"
        fontSize="14"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
      >
        D
      </text>
      <text
        x="66"
        y="57"
        fill={C.steel}
        fontSize="9"
        fontWeight="600"
        letterSpacing="1.6"
        fontFamily="var(--font-mono)"
      >
        DIGITAL PRODUCT PASSPORT
      </text>

      {/* product stage — battery pack under a scan sweep */}
      <rect x="30" y="80" width="360" height="168" rx="14" fill={C.chip} />
      <circle
        cx="210"
        cy="164"
        r="82"
        stroke={C.accent}
        strokeOpacity="0.18"
        strokeDasharray="3 5"
      />
      <circle cx="210" cy="164" r="56" stroke={C.accent} strokeOpacity="0.12" />

      {/* battery */}
      <rect x="176" y="140" width="16" height="6" rx="2" fill={C.ink} />
      <rect x="164" y="146" width="92" height="62" rx="10" fill={C.ink} />
      <rect x="176" y="160" width="5" height="34" rx="2.5" fill={C.accent2} />
      <text
        x="196"
        y="172"
        fill="rgba(255,255,255,0.72)"
        fontSize="7"
        letterSpacing="1.1"
        fontFamily="var(--font-mono)"
      >
        VOLT
      </text>
      <text
        x="196"
        y="196"
        fill="#ffffff"
        fontSize="22"
        fontWeight="700"
        letterSpacing="-1"
        fontFamily="var(--font-sans)"
      >
        48
      </text>

      {/* scan sweep — transform-only animation, see DESIGN.md §6 */}
      <g className="dpp-scan">
        <rect x="58" y="163" width="304" height="2" rx="1" fill={C.accent} />
        <rect
          x="58"
          y="165"
          width="304"
          height="10"
          fill="url(#dpp-scan-fade)"
          opacity="0.5"
        />
      </g>
      <defs>
        <linearGradient id="dpp-scan-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* product name row + verified badge */}
      <text
        x="30"
        y="278"
        fill={C.steel}
        fontSize="8"
        letterSpacing="1.2"
        fontFamily="var(--font-mono)"
      >
        PRODUCT
      </text>
      <text
        x="30"
        y="296"
        fill={C.ink}
        fontSize="14"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        Industrial Battery Pack
      </text>
      <rect x="298" y="274" width="92" height="24" rx="12" fill={C.soft} />
      <path
        d="M312 286.5l4 4 7.5-8"
        stroke={C.accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="330"
        y="290"
        fill={C.accent}
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        Verified
      </text>
      <line x1="30" y1="314" x2="390" y2="314" stroke={C.line} />

      {/* 2×2 passport data grid */}
      {DATA.map((field, i) => {
        const x = 30 + (i % 2) * 186;
        const y = 340 + Math.floor(i / 2) * 44;
        return (
          <g key={field.label}>
            <text
              x={x}
              y={y}
              fill={C.steel}
              fontSize="7.5"
              letterSpacing="1.1"
              fontFamily="var(--font-mono)"
            >
              {field.label}
            </text>
            <text
              x={x}
              y={y + 16}
              fill={field.accent ? C.accent : C.ink}
              fontSize="12"
              fontWeight="600"
              fontFamily="var(--font-mono)"
            >
              {field.value}
            </text>
          </g>
        );
      })}
      <line x1="30" y1="404" x2="390" y2="404" stroke={C.line} />

      {/* footer: QR + freshness + signal */}
      <rect x="30" y="418" width="34" height="34" rx="6" fill={C.ink} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) =>
          (r + c) % 2 === 0 ? (
            <rect
              key={`${r}-${c}`}
              x={36 + c * 7}
              y={424 + r * 7}
              width="5"
              height="5"
              rx="1"
              fill={r === 0 && c === 0 ? C.accent2 : "rgba(255,255,255,0.85)"}
            />
          ) : null,
        ),
      )}
      <text
        x="74"
        y="432"
        fill={C.steel}
        fontSize="7.5"
        letterSpacing="1.1"
        fontFamily="var(--font-mono)"
      >
        SCAN TO VERIFY
      </text>
      <text
        x="74"
        y="447"
        fill={C.ink}
        fontSize="10"
        fontFamily="var(--font-sans)"
      >
        Updated 2 min ago
      </text>
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={352 + i * 10}
          y={444 - i * 8}
          width="5"
          height={8 + i * 8}
          rx="2"
          fill={i === 2 ? C.accent : C.accent2}
          opacity={i === 2 ? 1 : 0.55}
        />
      ))}
    </svg>
  );
}
