"use client";

// ---------------------------------------------------------------------------
// DPP Lead Engine operations console — internal view, ported from the
// dpp-lead-engine prototype's /dashboard.
//
// Two things to know before editing:
//  1. Every number and company on this page is fabricated. The page is
//     noindex'd (app/dpp/console/page.tsx) and carries a visible demo banner so
//     it can never read as a real customer reference (DESIGN.md §7).
//  2. The prototype's violet palette was replaced with the 7-Eleven ramp;
//     dashboard numerics run in mono per DESIGN.md §3.
// ---------------------------------------------------------------------------

import {
  Activity,
  BadgeCheck,
  Bell,
  Check,
  ChevronRight,
  CircleDot,
  Info,
  LayoutGrid,
  LifeBuoy,
  LineChart,
  Plus,
  Search,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  Waypoints,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

// --- static shape data (deliberately not localised: figures, not copy) ------

const NAV_ITEMS = [
  { id: "overview", icon: LayoutGrid },
  { id: "leads", icon: Target, badge: "12" },
  { id: "content", icon: LayoutGrid },
  { id: "tools", icon: Wrench },
  { id: "pipeline", icon: Waypoints },
  { id: "analytics", icon: LineChart },
] as const;

const SYSTEM_ITEMS = [
  { id: "settings", icon: Settings },
  { id: "help", icon: LifeBuoy },
] as const;

const KPI_ICONS = [TrendingUp, Activity, CircleDot, Wallet];

const FUNNEL_WIDTHS = ["100%", "76%", "54%", "34%", "20%"];

// Donut slices — green leads, orange/red/steel carry the tail
const SOURCE_SLICES = [
  { pct: 36, color: "#00794c" },
  { pct: 30, color: "#3ab27f" },
  { pct: 20, color: "#f58220" },
  { pct: 9, color: "#e11b22" },
  { pct: 5, color: "#5b6167" },
];

const LEAD_SCORES = [92, 84, 76, 68, 51];
const LEAD_TONES = ["#00794c", "#3ab27f", "#f58220", "#e11b22", "#5b6167"];

const CONTENT_PROGRESS = [
  { value: 18, goal: 24, tone: "#00794c" },
  { value: 7, goal: 12, tone: "#3ab27f" },
  { value: 26, goal: 32, tone: "#f58220" },
  { value: 5, goal: 8, tone: "#e11b22" },
];

const HIGH_INTENT_COUNT = 3;

type Kpi = { label: string; value: string; delta: string; note: string };
type FunnelRow = { label: string; value: string };
type FunnelMeta = { value: string; label: string };
type LegendRow = { label: string; value: string; pct: string };
type LeadRow = {
  company: string;
  contact: string;
  source: string;
  industry: string;
  stage: string;
  next: string;
};
type ContentCard = { title: string; note: string };

// Build the conic-gradient stops from the slice table
function donutGradient() {
  let acc = 0;
  const stops = SOURCE_SLICES.map((slice) => {
    const from = acc;
    acc += slice.pct;
    return `${slice.color} ${from}% ${acc}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export default function DppConsole() {
  const t = useTranslations("Dpp.console");

  const [active, setActive] = useState<string>("overview");
  const [rangeIndex, setRangeIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const kpis = t.raw("kpis") as Kpi[];
  const ranges = t.raw("ranges") as string[];
  const funnelRows = t.raw("funnel.rows") as FunnelRow[];
  const funnelMetas = t.raw("funnel.metas") as FunnelMeta[];
  const legend = t.raw("source.legend") as LegendRow[];
  const leadRows = t.raw("leads.rows") as LeadRow[];
  const contentCards = t.raw("content.cards") as ContentCard[];
  const tasks = t.raw("tasks.items") as string[];

  const visibleLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leadRows.map((lead, i) => ({ lead, i }));
    return leadRows
      .map((lead, i) => ({ lead, i }))
      .filter(({ lead }) =>
        `${lead.company}${lead.contact}${lead.industry}`
          .toLowerCase()
          .includes(q),
      );
  }, [query, leadRows]);

  // Clear the pending dismiss on unmount so a late timer can't set state
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  function notify(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }

  const navButtonClass = (id: string) =>
    `flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
      active === id
        ? "bg-[#00794c] font-medium text-white"
        : "text-white/60 hover:bg-white/6 hover:text-white"
    }`;

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#f6f7f6] text-[#16181c]">
      {/* Demo-data notice — this console is fabricated end to end */}
      <div className="flex items-start gap-2.5 bg-[#f58220] px-5 py-2.5 text-white">
        <Info className="mt-px h-4 w-4 shrink-0" />
        <p className="text-xs leading-relaxed">{t("demoBanner")}</p>
      </div>

      <div className="flex">
        {/* ===== Sidebar ===== */}
        <aside className="sticky top-0 hidden h-[100dvh] w-[248px] shrink-0 flex-col bg-[#0e1012] px-4 py-5 lg:flex">
          <div className="mb-8 flex items-center gap-2.5 px-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00794c] text-base font-bold text-white">
              D
            </span>
            <span className="flex flex-col leading-tight">
              <b className="text-sm font-semibold text-white">DPP</b>
              <span className="font-mono text-[10px] tracking-wide text-white/45">
                {t("brandSub")}
              </span>
            </span>
          </div>

          <nav aria-label={t("navLabelWork")} className="flex flex-1 flex-col">
            <p className="eyebrow-mono mb-2 px-3 text-[0.62rem] text-white/30">
              {t("navLabelWork")}
            </p>
            <div className="flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const label = t(`nav.${item.id}`);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={navButtonClass(item.id)}
                    onClick={() => {
                      setActive(item.id);
                      notify(t("toast.switched", { label }));
                    }}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{label}</span>
                    {"badge" in item && item.badge ? (
                      <em className="rounded-full bg-[#e11b22] px-1.5 py-0.5 font-mono text-[10px] font-medium not-italic text-white">
                        {item.badge}
                      </em>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <p className="eyebrow-mono mt-7 mb-2 px-3 text-[0.62rem] text-white/30">
              {t("navLabelSystem")}
            </p>
            <div className="flex flex-col gap-0.5">
              {SYSTEM_ITEMS.map((item) => {
                const Icon = item.icon;
                const label = t(`nav.${item.id}`);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={navButtonClass(item.id)}
                    onClick={() => {
                      setActive(item.id);
                      notify(t("toast.switched", { label }));
                    }}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-white/5 px-3 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3ab27f]/20 font-mono text-xs font-semibold text-[#3ab27f]">
              MY
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <b className="truncate text-xs font-semibold text-white">
                {t("user.name")}
              </b>
              <span className="truncate text-[11px] text-white/45">
                {t("user.role")}
              </span>
            </span>
          </div>
        </aside>

        {/* ===== Workspace ===== */}
        <div className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-[rgba(20,24,28,0.07)] bg-[#f6f7f6]/85 px-5 py-3 backdrop-blur-md">
            <p className="flex min-w-0 items-center gap-1.5 truncate font-mono text-xs text-[#5b6167]">
              DPP Lead Engine
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="text-[#16181c]">{t("nav.overview")}</span>
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={t("leads.search")}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[rgba(20,24,28,0.1)] bg-white text-[#5b6167] transition-colors hover:text-[#00794c]"
              >
                <Search className="h-4 w-4" />
              </button>
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(20,24,28,0.1)] bg-white text-[#5b6167]">
                <Bell className="h-4 w-4" />
                <i className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#e11b22]" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00794c] font-mono text-[11px] font-semibold text-white">
                MY
              </span>
            </div>
          </header>

          {/* Mobile nav strip — the sidebar is desktop-only */}
          <div className="overflow-x-auto border-b border-[rgba(20,24,28,0.07)] bg-white px-5 py-2.5 lg:hidden">
            <div className="flex w-max items-center gap-2">
              {NAV_ITEMS.map((item) => {
                const label = t(`nav.${item.id}`);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                      active === item.id
                        ? "bg-[#00794c] font-medium text-white"
                        : "bg-[rgba(20,24,28,0.05)] text-[#5b6167]"
                    }`}
                    onClick={() => {
                      setActive(item.id);
                      notify(t("toast.switched", { label }));
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-auto max-w-[1400px] px-5 py-7">
            {/* Page heading */}
            <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow-mono mb-2 text-[#00794c]">
                  {t("eyebrow")}
                </p>
                <h1 className="apple-headline text-2xl sm:text-3xl">
                  {t("greeting")}
                </h1>
                <p className="apple-body mt-2 max-w-[52ch] text-sm text-[#5b6167]">
                  {t("greetingSub", { count: HIGH_INTENT_COUNT })}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <select
                  aria-label={t("eyebrow")}
                  value={rangeIndex}
                  onChange={(e) => setRangeIndex(Number(e.target.value))}
                  className="h-9 cursor-pointer rounded-full border border-[rgba(20,24,28,0.12)] bg-white px-3.5 text-xs text-[#16181c]"
                >
                  {ranges.map((label, i) => (
                    <option key={label} value={i}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => notify(t("toast.newLead"))}
                  className="apple-btn-accent inline-flex h-9 cursor-pointer items-center gap-1.5 py-0! text-xs font-medium"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t("newLead")}
                </button>
              </div>
            </div>

            {/* KPI row */}
            <section
              aria-label={t("eyebrow")}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {kpis.map((kpi, i) => {
                const Icon = KPI_ICONS[i];
                const tone = LEAD_TONES[i];
                return (
                  <article
                    key={kpi.label}
                    className="rounded-2xl border border-[rgba(20,24,28,0.07)] bg-white p-5 shadow-[0_2px_12px_rgba(20,24,28,0.04)]"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: `${tone}1a` }}
                      >
                        <Icon className="h-4 w-4" style={{ color: tone }} />
                      </span>
                      <em className="rounded-full bg-[#00794c]/10 px-2 py-0.5 font-mono text-[11px] font-medium not-italic text-[#00794c]">
                        {kpi.delta}
                      </em>
                    </div>
                    <p className="text-xs text-[#5b6167]">{kpi.label}</p>
                    <h2 className="mt-1 font-mono text-2xl font-semibold tracking-tight">
                      {kpi.value}
                    </h2>
                    <small className="mt-1.5 block text-[11px] text-[#5b6167]">
                      {kpi.note}
                    </small>
                  </article>
                );
              })}
            </section>

            {/* Funnel + source */}
            <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]">
              {/* Funnel */}
              <article className="rounded-2xl border border-[rgba(20,24,28,0.07)] bg-white p-5 shadow-[0_2px_12px_rgba(20,24,28,0.04)]">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">
                      {t("funnel.title")}
                    </h3>
                    <p className="mt-1 text-xs text-[#5b6167]">
                      {t("funnel.lead", { range: ranges[rangeIndex] })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => notify(t("toast.funnel"))}
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-[#00794c]"
                  >
                    {t("funnel.action")}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Hovering one row dims the others. Done in CSS rather than
                    with state so the rows stay non-interactive elements. */}
                <div className="group/funnel flex flex-col gap-3">
                  {funnelRows.map((row, i) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[minmax(72px,auto)_1fr] items-center gap-x-4 gap-y-1.5 opacity-100 transition-opacity duration-200 group-hover/funnel:opacity-45 hover:opacity-100! sm:grid-cols-[110px_72px_1fr]"
                    >
                      <span className="text-xs text-[#5b6167]">
                        {row.label}
                      </span>
                      <strong className="font-mono text-sm font-semibold tabular-nums">
                        {row.value}
                      </strong>
                      <div className="col-span-2 h-2.5 overflow-hidden rounded-full bg-[rgba(20,24,28,0.05)] sm:col-span-1">
                        <i
                          className="block h-full rounded-full"
                          style={{
                            width: FUNNEL_WIDTHS[i],
                            background:
                              "linear-gradient(90deg, #00794c 0%, #3ab27f 100%)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[rgba(20,24,28,0.07)] pt-5 sm:grid-cols-4">
                  {funnelMetas.map((meta) => (
                    <div key={meta.label}>
                      <span className="font-mono text-base font-semibold text-[#00794c]">
                        {meta.value}
                      </span>
                      <small className="mt-0.5 block text-[11px] text-[#5b6167]">
                        {meta.label}
                      </small>
                    </div>
                  ))}
                </div>
              </article>

              {/* Source donut */}
              <article className="flex flex-col rounded-2xl border border-[rgba(20,24,28,0.07)] bg-white p-5 shadow-[0_2px_12px_rgba(20,24,28,0.04)]">
                <div className="mb-5">
                  <h3 className="text-base font-semibold">
                    {t("source.title")}
                  </h3>
                  <p className="mt-1 text-xs text-[#5b6167]">
                    {t("source.lead")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div
                    className="relative h-[124px] w-[124px] shrink-0 rounded-full"
                    style={{ background: donutGradient() }}
                  >
                    <div className="absolute inset-[16px] flex flex-col items-center justify-center rounded-full bg-white">
                      <strong className="font-mono text-xl font-semibold">
                        128
                      </strong>
                      <span className="text-[10px] text-[#5b6167]">
                        {t("source.total")}
                      </span>
                    </div>
                  </div>
                  <div className="flex min-w-[150px] flex-1 flex-col gap-2">
                    {legend.map((row, i) => (
                      <p
                        key={row.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <i
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ background: SOURCE_SLICES[i].color }}
                        />
                        <span className="flex-1 text-[#5b6167]">
                          {row.label}
                        </span>
                        <b className="font-mono font-semibold tabular-nums">
                          {row.value}
                        </b>
                        <span className="w-8 text-right font-mono text-[11px] text-[#5b6167]">
                          {row.pct}
                        </span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-start gap-2.5 rounded-xl bg-[#00794c]/7 p-3.5 pt-3.5">
                  <Sparkles className="mt-px h-3.5 w-3.5 shrink-0 text-[#00794c]" />
                  <p className="text-[11px] leading-relaxed text-[#5b6167]">
                    <b className="block text-xs text-[#16181c]">
                      {t("source.insightTitle")}
                    </b>
                    {t("source.insightBody")}
                  </p>
                </div>
              </article>
            </section>

            {/* Leads table */}
            <section className="mt-4 rounded-2xl border border-[rgba(20,24,28,0.07)] bg-white p-5 shadow-[0_2px_12px_rgba(20,24,28,0.04)]">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold">
                    {t("leads.title")}
                  </h3>
                  <p className="mt-1 text-xs text-[#5b6167]">
                    {t("leads.lead")}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex h-9 items-center gap-2 rounded-full border border-[rgba(20,24,28,0.12)] bg-white px-3.5">
                    <Search className="h-3.5 w-3.5 shrink-0 text-[#5b6167]" />
                    <input
                      placeholder={t("leads.search")}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-[160px] bg-transparent text-xs outline-none placeholder:text-[#5b6167]"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => notify(t("toast.all"))}
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-[#00794c]"
                  >
                    {t("leads.all")}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Table scrolls inside its own box so the page never does */}
              <div className="-mx-5 overflow-x-auto px-5">
                <table className="w-full min-w-[820px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[rgba(20,24,28,0.07)]">
                      {(
                        [
                          "company",
                          "source",
                          "industry",
                          "score",
                          "stage",
                          "next",
                        ] as const
                      ).map((col) => (
                        <th
                          key={col}
                          className="eyebrow-mono pb-3 text-[0.62rem] font-medium text-[#5b6167]"
                        >
                          {t(`leads.cols.${col}`)}
                        </th>
                      ))}
                      <th className="pb-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {visibleLeads.map(({ lead, i }) => (
                      <tr
                        key={lead.company}
                        className="border-b border-[rgba(20,24,28,0.05)] last:border-0"
                      >
                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white"
                              style={{ background: LEAD_TONES[i] }}
                            >
                              {lead.company.slice(0, 1)}
                            </span>
                            <span className="flex flex-col leading-tight">
                              <b className="text-[13px] font-semibold">
                                {lead.company}
                              </b>
                              <span className="text-[11px] text-[#5b6167]">
                                {lead.contact}
                              </span>
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4 text-xs text-[#5b6167]">
                          {lead.source}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className="rounded-full bg-[rgba(20,24,28,0.05)] px-2.5 py-1 text-[11px] text-[#5b6167]">
                            {lead.industry}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-16 overflow-hidden rounded-full bg-[rgba(20,24,28,0.07)]">
                              <span
                                className="block h-full rounded-full bg-[#00794c]"
                                style={{ width: `${LEAD_SCORES[i]}%` }}
                              />
                            </span>
                            <b className="font-mono text-xs font-semibold tabular-nums">
                              {LEAD_SCORES[i]}
                            </b>
                          </div>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs"
                            style={{ color: LEAD_TONES[i] }}
                          >
                            <i
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: LEAD_TONES[i] }}
                            />
                            {lead.stage}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 font-mono text-[11px] text-[#5b6167]">
                          {lead.next}
                        </td>
                        <td className="py-3.5">
                          <button
                            type="button"
                            aria-label={t("toast.opening", {
                              company: lead.company,
                            })}
                            onClick={() =>
                              notify(
                                t("toast.opening", { company: lead.company }),
                              )
                            }
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#5b6167] transition-colors hover:bg-[#00794c]/8 hover:text-[#00794c]"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visibleLeads.length === 0 ? (
                  <p className="py-10 text-center text-xs text-[#5b6167]">
                    {t("leads.empty")}
                  </p>
                ) : null}
              </div>
            </section>

            {/* Content matrix + tasks */}
            <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_1fr]">
              <article className="rounded-2xl border border-[rgba(20,24,28,0.07)] bg-white p-5 shadow-[0_2px_12px_rgba(20,24,28,0.04)]">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">
                      {t("content.title")}
                    </h3>
                    <p className="mt-1 text-xs text-[#5b6167]">
                      {t("content.lead")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => notify(t("toast.content"))}
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-[#00794c]"
                  >
                    {t("content.action")}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {contentCards.map((card, i) => {
                    const p = CONTENT_PROGRESS[i];
                    return (
                      <div
                        key={card.title}
                        className="rounded-xl border border-[rgba(20,24,28,0.07)] p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[13px] font-medium">
                              {card.title}
                            </p>
                            <small className="text-[11px] text-[#5b6167]">
                              {card.note}
                            </small>
                          </div>
                          <strong className="font-mono text-lg font-semibold tabular-nums">
                            {p.value}
                            <i className="text-xs font-normal not-italic text-[#5b6167]">
                              {" / "}
                              {p.goal}
                            </i>
                          </strong>
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(20,24,28,0.07)]">
                          <b
                            className="block h-full rounded-full"
                            style={{
                              width: `${(p.value / p.goal) * 100}%`,
                              background: p.tone,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="flex flex-col rounded-2xl border border-[rgba(20,24,28,0.07)] bg-white p-5 shadow-[0_2px_12px_rgba(20,24,28,0.04)]">
                <div className="mb-5">
                  <h3 className="text-base font-semibold">
                    {t("tasks.title")}
                  </h3>
                  <p className="mt-1 text-xs text-[#5b6167]">
                    {t("tasks.lead")}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  {tasks.map((task) => (
                    <label
                      key={task}
                      className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl px-2 text-[13px] transition-colors hover:bg-[rgba(20,24,28,0.03)]"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 shrink-0 accent-[#00794c]"
                      />
                      <span>{task}</span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => notify(t("toast.task"))}
                  className="mt-auto inline-flex cursor-pointer items-center gap-1.5 pt-5 text-xs font-medium text-[#00794c]"
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t("tasks.add")}
                </button>
              </article>
            </section>

            <p className="mt-8 flex items-center gap-1.5 font-mono text-[11px] text-[#5b6167]">
              <BadgeCheck className="h-3.5 w-3.5" />
              {t("brandSub")} · {t("navLabelSystem")}
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast ? (
        <output className="dpp-toast fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#16181c] px-4 py-2.5 text-xs text-white shadow-[0_18px_40px_-18px_rgba(20,24,28,0.6)]">
          <Check className="h-3.5 w-3.5 text-[#3ab27f]" />
          {toast}
        </output>
      ) : null}
    </div>
  );
}
