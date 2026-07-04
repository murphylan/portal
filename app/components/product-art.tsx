"use client";

// ---------------------------------------------------------------------------
// Crisp, per-product vector illustrations (flat "UI mockup" style, brand green).
// Vector = sharp at any size, so it never goes blurry like the old stock photos.
// One scene per product, tone-aware (light / dark section backgrounds).
// ---------------------------------------------------------------------------

type Tone = "light" | "dark";

function palette(tone: Tone) {
  const dark = tone === "dark";
  return {
    card: dark ? "#14392c" : "#ffffff",
    edge: dark ? "#2a5f49" : "#e2f0ea",
    ink: dark ? "#eafff6" : "#153e30",
    accent: dark ? "#34c759" : "#059669",
    accent2: dark ? "#7ce39b" : "#34c759",
    soft: dark ? "rgba(52,199,89,0.16)" : "rgba(5,150,105,0.10)",
    line: dark ? "rgba(255,255,255,0.16)" : "rgba(21,62,48,0.14)",
    chip: dark ? "#1b4736" : "#eef8f3",
  };
}

type P = ReturnType<typeof palette>;

const SVG_PROPS = {
  viewBox: "0 0 420 320",
  className: "w-full h-auto",
  fill: "none" as const,
};

// --- WorkSync: docs sidebar + kanban board -------------------------------
function WorkSyncArt(c: P) {
  return (
    <svg {...SVG_PROPS} role="img" aria-label="WorkSync">
      <rect
        x="34"
        y="38"
        width="352"
        height="244"
        rx="18"
        fill={c.card}
        stroke={c.edge}
        strokeWidth="2"
      />
      <line x1="34" y1="72" x2="386" y2="72" stroke={c.edge} strokeWidth="2" />
      <circle cx="54" cy="55" r="4" fill={c.accent} />
      <circle cx="70" cy="55" r="4" fill={c.edge} />
      <circle cx="86" cy="55" r="4" fill={c.edge} />
      {/* sidebar / doc list */}
      <rect x="50" y="86" width="80" height="180" rx="10" fill={c.soft} />
      <rect x="62" y="100" width="52" height="9" rx="4" fill={c.accent} />
      <rect x="62" y="120" width="56" height="7" rx="3.5" fill={c.line} />
      <rect x="62" y="136" width="44" height="7" rx="3.5" fill={c.line} />
      <rect x="62" y="152" width="56" height="7" rx="3.5" fill={c.line} />
      <rect x="62" y="168" width="38" height="7" rx="3.5" fill={c.line} />
      {/* kanban columns */}
      {[146, 226, 306].map((x, col) => (
        <g key={x}>
          <rect x={x} y="92" width="68" height="14" rx="7" fill={c.chip} />
          {[0, 1, 2].slice(0, col === 1 ? 3 : col === 2 ? 1 : 2).map((r) => {
            const y = 116 + r * 46;
            const hot = col === 1 && r === 0;
            return (
              <g key={r}>
                <rect
                  x={x}
                  y={y}
                  width="68"
                  height="38"
                  rx="9"
                  fill={c.card}
                  stroke={hot ? c.accent : c.edge}
                  strokeWidth={hot ? 2.5 : 1.5}
                />
                <rect
                  x={x + 10}
                  y={y + 10}
                  width="34"
                  height="6"
                  rx="3"
                  fill={hot ? c.accent : c.line}
                />
                <rect
                  x={x + 10}
                  y={y + 22}
                  width="46"
                  height="5"
                  rx="2.5"
                  fill={c.line}
                />
              </g>
            );
          })}
        </g>
      ))}
      {/* AI sparkle */}
      <g transform="translate(352 96)">
        <path
          d="M0 -11 L3 -3 L11 0 L3 3 L0 11 L-3 3 L-11 0 L-3 -3 Z"
          fill={c.accent2}
        />
      </g>
    </svg>
  );
}

// --- Xiaozu: xiangqi board + AI suggested move ---------------------------
function XiaozuArt(c: P) {
  const pieces: Array<[number, number, string, boolean]> = [
    [96, 92, "車", false],
    [188, 92, "馬", false],
    [280, 118, "炮", false],
    [142, 176, "卒", true],
    [232, 214, "帥", false],
  ];
  return (
    <svg {...SVG_PROPS} role="img" aria-label="小卒">
      <rect
        x="52"
        y="44"
        width="316"
        height="232"
        rx="16"
        fill={c.card}
        stroke={c.edge}
        strokeWidth="2"
      />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1="78"
          y1={80 + i * 52}
          x2="342"
          y2={80 + i * 52}
          stroke={c.line}
          strokeWidth="1.5"
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`v${i}`}
          x1={96 + i * 46}
          y1="80"
          x2={96 + i * 46}
          y2="240"
          stroke={c.line}
          strokeWidth="1.5"
        />
      ))}
      {/* river */}
      <rect x="78" y="150" width="264" height="20" fill={c.soft} />
      {/* suggested move arrow */}
      <path
        d="M142 176 C 175 150, 205 150, 232 118"
        stroke={c.accent2}
        strokeWidth="2.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
      {pieces.map(([x, y, ch, hot]) => (
        <g key={ch}>
          <circle
            cx={x}
            cy={y}
            r="18"
            fill={hot ? c.accent : c.card}
            stroke={hot ? c.accent : c.edge}
            strokeWidth="2.5"
          />
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={hot ? "#ffffff" : c.ink}
          >
            {ch}
          </text>
        </g>
      ))}
      {/* AI badge */}
      <g transform="translate(320 66)">
        <rect x="-30" y="-14" width="60" height="28" rx="14" fill={c.accent} />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#ffffff"
        >
          AI
        </text>
      </g>
    </svg>
  );
}

// --- Sign: phone check-in QR + vote / form / gift chips -------------------
function SignArt(c: P) {
  return (
    <svg {...SVG_PROPS} role="img" aria-label="Sign">
      {/* phone */}
      <rect
        x="164"
        y="46"
        width="96"
        height="212"
        rx="20"
        fill={c.card}
        stroke={c.edge}
        strokeWidth="2"
      />
      <rect x="176" y="66" width="72" height="120" rx="10" fill={c.soft} />
      {/* QR */}
      <g transform="translate(188 78)">
        {[
          [0, 0],
          [24, 0],
          [0, 24],
          [10, 12],
          [24, 24],
          [36, 6],
          [6, 36],
          [30, 34],
        ].map(([x, y], i) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={i % 2 ? 8 : 12}
            height={i % 2 ? 8 : 12}
            rx="2"
            fill={c.accent}
          />
        ))}
      </g>
      <rect x="184" y="198" width="56" height="10" rx="5" fill={c.accent} />
      <rect x="192" y="220" width="40" height="7" rx="3.5" fill={c.line} />
      {/* vote chip top-left */}
      <g transform="translate(54 70)">
        <rect
          x="0"
          y="0"
          width="86"
          height="70"
          rx="12"
          fill={c.card}
          stroke={c.edge}
          strokeWidth="1.5"
        />
        <rect x="14" y="44" width="12" height="14" rx="3" fill={c.line} />
        <rect x="37" y="30" width="12" height="28" rx="3" fill={c.accent2} />
        <rect x="60" y="20" width="12" height="38" rx="3" fill={c.accent} />
      </g>
      {/* form chip bottom-left */}
      <g transform="translate(58 176)">
        <rect
          x="0"
          y="0"
          width="82"
          height="74"
          rx="12"
          fill={c.card}
          stroke={c.edge}
          strokeWidth="1.5"
        />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <rect
              x="14"
              y={16 + r * 20}
              width="12"
              height="12"
              rx="3"
              fill={r === 0 ? c.accent : c.chip}
              stroke={c.edge}
              strokeWidth="1.2"
            />
            <rect
              x="34"
              y={20 + r * 20}
              width="34"
              height="6"
              rx="3"
              fill={c.line}
            />
          </g>
        ))}
      </g>
      {/* gift chip right */}
      <g transform="translate(284 150)">
        <rect
          x="0"
          y="16"
          width="74"
          height="66"
          rx="12"
          fill={c.card}
          stroke={c.edge}
          strokeWidth="1.5"
        />
        <rect x="0" y="30" width="74" height="14" fill={c.accent} rx="3" />
        <rect x="30" y="16" width="14" height="66" fill={c.accent2} />
        <path
          d="M37 16 C 24 2, 8 12, 37 22 C 66 12, 50 2, 37 16 Z"
          fill={c.accent}
        />
      </g>
    </svg>
  );
}

// --- Shopping: phone storefront + cart + buy ------------------------------
function ShoppingArt(c: P) {
  return (
    <svg {...SVG_PROPS} role="img" aria-label="小商城">
      <rect
        x="118"
        y="44"
        width="150"
        height="234"
        rx="22"
        fill={c.card}
        stroke={c.edge}
        strokeWidth="2"
      />
      <rect x="150" y="56" width="86" height="8" rx="4" fill={c.line} />
      {/* product grid */}
      {[
        [134, 78],
        [200, 78],
        [134, 158],
        [200, 158],
      ].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="52" height="70" rx="10" fill={c.chip} />
          <rect x={x} y={y} width="52" height="42" rx="10" fill={c.soft} />
          <circle
            cx={x + 26}
            cy={y + 21}
            r="12"
            fill={i === 0 ? c.accent : c.accent2}
            opacity={i === 0 ? 1 : 0.55}
          />
          <rect
            x={x + 8}
            y={y + 50}
            width="30"
            height="6"
            rx="3"
            fill={c.line}
          />
          <rect
            x={x + 8}
            y={y + 60}
            width="18"
            height="6"
            rx="3"
            fill={c.accent}
          />
        </g>
      ))}
      {/* buy bar */}
      <rect x="134" y="240" width="118" height="24" rx="12" fill={c.accent} />
      <rect
        x="170"
        y="249"
        width="46"
        height="6"
        rx="3"
        fill="#ffffff"
        opacity="0.9"
      />
      {/* floating cart */}
      <g transform="translate(300 92)">
        <circle cx="0" cy="0" r="34" fill={c.accent} />
        <path
          d="M-14 -10 H14 L10 8 H-10 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <circle cx="-7" cy="15" r="3.5" fill="#ffffff" />
        <circle cx="8" cy="15" r="3.5" fill="#ffffff" />
        <path
          d="M-18 -14 H-12 L-14 -10"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      {/* price tag */}
      <g transform="translate(96 176)">
        <path
          d="M0 0 L34 0 L48 16 L20 42 L-8 16 Z"
          fill={c.card}
          stroke={c.edge}
          strokeWidth="2"
        />
        <circle cx="10" cy="12" r="5" fill={c.accent} />
      </g>
    </svg>
  );
}

// --- TimeSlot: calendar + clock + booked check ----------------------------
function TimeSlotArt(c: P) {
  return (
    <svg {...SVG_PROPS} role="img" aria-label="TimeSlot">
      <rect
        x="46"
        y="46"
        width="272"
        height="228"
        rx="18"
        fill={c.card}
        stroke={c.edge}
        strokeWidth="2"
      />
      <rect x="46" y="46" width="272" height="42" rx="18" fill={c.accent} />
      <rect
        x="66"
        y="62"
        width="70"
        height="10"
        rx="5"
        fill="#ffffff"
        opacity="0.9"
      />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={70 + i * 38} cy="106" r="4" fill={c.line} />
      ))}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => {
          const booked = (row === 1 && col === 2) || (row === 2 && col === 4);
          const today = row === 2 && col === 4;
          return (
            <rect
              key={`${row}-${col}`}
              x={54 + col * 38}
              y={124 + row * 34}
              width="30"
              height="26"
              rx="7"
              fill={booked ? c.accent : c.chip}
              stroke={c.edge}
              strokeWidth="1"
              opacity={today ? 1 : booked ? 0.55 : 1}
            />
          );
        }),
      )}
      {/* clock overlay */}
      <g transform="translate(292 226)">
        <circle
          cx="0"
          cy="0"
          r="34"
          fill={c.card}
          stroke={c.accent}
          strokeWidth="3"
        />
        <path
          d="M0 -18 V0 L13 9"
          stroke={c.accent}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

const ART: Record<string, (c: P) => React.ReactElement> = {
  worksync: WorkSyncArt,
  xiaozu: XiaozuArt,
  sign: SignArt,
  shopping: ShoppingArt,
  timeslot: TimeSlotArt,
};

export default function ProductArt({ id, tone }: { id: string; tone: Tone }) {
  const c = palette(tone);
  const render = ART[id] ?? WorkSyncArt;
  return render(c);
}
