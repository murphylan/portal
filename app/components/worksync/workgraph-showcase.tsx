"use client";

// ---------------------------------------------------------------------------
// WorkGraph — the WorkSync successor: a semantic task platform where tasks are
// nodes, relationships are edges and templates are the ontology.
//
// Every claim on this page is taken from the product's own sources — the help
// center (TaskGraph/docs/manual) for behaviour, and compose.prod.yml /
// Containerfile / docs/taskgraph-design.md for the deployment and performance
// section — no invented metrics (DESIGN.md §7). Visual language follows the
// /dpp pages (apple-* primitives, Store Green lead, orange/red rhythm), NOT
// the older violet worksync-showcase.
//
// Section order: hero → three differences → main line 0-6 → task graph (dark)
// → one resource mechanism → governance → subscriptions (dark) → platform
// → CTA.
// ---------------------------------------------------------------------------

import { motion } from "framer-motion";
import {
  Boxes,
  Braces,
  CheckCircle2,
  ChevronRight,
  FilePlus2,
  FileText,
  Fingerprint,
  Gauge,
  GitPullRequestArrow,
  KeyRound,
  Link2,
  Lock,
  Network,
  PackageCheck,
  Paperclip,
  PenTool,
  Radio,
  RefreshCw,
  Route,
  ScrollText,
  Server,
  ShieldCheck,
  Sparkles,
  Trash2,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactDialog from "../contact-dialog";
import Footer from "../footer";
import LocaleSwitcher from "../locale-switcher";

// ---------------------------------------------------------------------------
// Motion presets — same values as the homepage and /dpp (DESIGN.md §6)
// ---------------------------------------------------------------------------

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring },
};
const revealProps = {
  variants: staggerContainer,
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.15 },
};

// ---------------------------------------------------------------------------
// Icon tables — copy comes from i18n, order matches the message arrays
// ---------------------------------------------------------------------------

const DIFF_ICONS = [Boxes, Network, ShieldCheck];
const STEP_ICONS = [
  KeyRound,
  Boxes,
  FilePlus2,
  Network,
  Route,
  CheckCircle2,
  Radio,
];
const RESOURCE_ICONS = [FileText, Workflow, PenTool, Paperclip, Link2];
const GOVERNANCE_ICONS = [ShieldCheck, ScrollText, KeyRound, Trash2];
const API_ICONS = [Radio, Fingerprint, RefreshCw, Braces, GitPullRequestArrow];
const PLATFORM_ICONS = [Server, Gauge, Lock, PackageCheck];

// Spans are chosen so every row fills its track and no row reads as an equal
// 3-up grid (DESIGN.md §5/§7). A span of 12 switches the card to the wide
// horizontal layout below, otherwise the copy would sit in the left third of a
// full-bleed card with nothing beside it.
const DIFF_SPANS = ["lg:col-span-6", "lg:col-span-6", "lg:col-span-12"];
const RESOURCE_SPANS = [
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-12",
];
// 4 + 3 cards over two rows of differing card width — 7 items in a 4-column
// grid left an obvious hole in the second row.
const STEP_SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
];

// Tri-color rotation — green leads, orange/red pace it (DESIGN.md §2)
const DIFF_TONES = [
  { fg: "#00794c", bg: "rgba(0,121,76,0.1)" },
  { fg: "#f58220", bg: "rgba(245,130,32,0.12)" },
  { fg: "#e11b22", bg: "rgba(225,27,34,0.09)" },
];

type Fact = { value: string; label: string };
type DiffItem = { tag: string; title: string; desc: string; note: string };
type Step = { n: string; title: string; desc: string };
type Legend = { k: string; v: string };
type Cap = { title: string; desc: string };
type ResourceItem = { kind: string; title: string; desc: string };
type ApiItem = { tag: string; title: string; desc: string };
type Shot = { alt: string; caption: string };

// ---------------------------------------------------------------------------
// Nav — same shell as AppleNav / DppNav
// ---------------------------------------------------------------------------

function WorkGraphNav() {
  const t = useTranslations("WorkGraph.nav");
  const common = useTranslations("Common");

  const anchors = [
    { href: "#diff", label: t("diff") },
    { href: "#graph", label: t("graph") },
    { href: "#resources", label: t("resources") },
    { href: "#governance", label: t("governance") },
    { href: "#api", label: t("api") },
  ];
  const linkClass =
    "hidden text-sm text-[#5b6167] transition-colors hover:text-[#16181c] lg:inline";

  return (
    <nav className="apple-nav fixed inset-x-0 top-0 z-50 flex h-12 items-center">
      <span
        aria-hidden
        className="brand-stripe absolute inset-x-0 bottom-0 h-[3px]"
      />
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-baseline gap-2.5">
          <Link
            href="/"
            className="text-lg font-medium tracking-tight text-[#16181c] transition-colors hover:text-[#00794c]"
          >
            {common("brand")}
          </Link>
          <span className="eyebrow-mono text-[#00794c]">WorkGraph</span>
        </div>

        <div className="flex items-center gap-5">
          {anchors.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
          <Link
            href="/worksync"
            className="hidden text-sm text-[#5b6167] transition-colors hover:text-[#16181c] sm:inline"
          >
            WorkSync
          </Link>
          <LocaleSwitcher className="hidden text-[#5b6167] sm:inline-flex" />
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-accent cursor-pointer text-sm py-1! px-3!"
            >
              {t("demo")}
            </button>
          </ContactDialog>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Shared section heading — mirrors the homepage / DPP one
// ---------------------------------------------------------------------------

// Two-column heading: title on the left, lead sitting on the right at the
// title's baseline. A single narrow column left the right two thirds of every
// section empty, and clamping a 42px headline with a 16px-derived `ch` measure
// broke it into ragged three-line wraps.
function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="grid gap-x-14 gap-y-5 lg:grid-cols-12 lg:items-end">
      <div className={lead ? "lg:col-span-7" : "lg:col-span-9"}>
        <span
          className="eyebrow-mono mb-4 inline-flex items-center gap-2.5"
          style={{ color: dark ? "#3ab27f" : "#00794c" }}
        >
          <span
            aria-hidden
            className="brand-stripe inline-block h-3 w-6 rounded-[2px]"
          />
          {eyebrow}
        </span>
        <h2
          className="apple-headline text-balance text-3xl sm:text-4xl md:text-[42px]"
          style={{ color: dark ? "#ffffff" : "#16181c" }}
        >
          {title}
        </h2>
      </div>
      {lead ? (
        <p
          className="apple-body text-sm sm:text-base lg:col-span-5 lg:pb-1"
          style={{
            color: dark ? "rgba(255,255,255,0.62)" : "rgba(20,24,28,0.58)",
          }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Product screenshot in a restrained browser chrome. Deliberately not the
// violet ScreenPlaceholder — border and surface come from DESIGN.md §2.
// ---------------------------------------------------------------------------

function Shot({
  src,
  alt,
  caption,
  tone = "light",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 760px",
}: {
  src: string;
  alt: string;
  caption?: string;
  tone?: "light" | "dark";
  priority?: boolean;
  sizes?: string;
}) {
  const dark = tone === "dark";
  return (
    <figure className="w-full">
      <div
        className="overflow-hidden rounded-2xl border shadow-[0_30px_70px_-34px_rgba(20,24,28,0.4)]"
        style={{
          borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(20,24,28,0.08)",
          background: dark ? "#16181c" : "#ffffff",
        }}
      >
        <div
          className="flex items-center gap-1.5 border-b px-3.5 py-2"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(20,24,28,0.06)",
            background: dark ? "rgba(255,255,255,0.04)" : "#f6f7f6",
          }}
        >
          <span className="h-2 w-2 rounded-full bg-[#e11b22]/60" />
          <span className="h-2 w-2 rounded-full bg-[#f58220]/60" />
          <span className="h-2 w-2 rounded-full bg-[#00794c]/60" />
        </div>
        <div className="relative aspect-16/10">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-top"
          />
        </div>
      </div>
      {caption ? (
        <figcaption
          className="mt-3 font-mono text-[11px]"
          style={{
            color: dark ? "rgba(255,255,255,0.5)" : "rgba(20,24,28,0.45)",
          }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// Concept diagrams ship as PlantUML SVG. next/image refuses SVG unless
// dangerouslyAllowSVG is on, and these are our own build artifacts, so they
// go through a plain <img>.
function Diagram({
  src,
  alt,
  caption,
  // Tall portrait diagrams (the RBAC flow) would otherwise dictate the height
  // of a whole two-column row. Cap them and let the SVG centre itself.
  maxH,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxH?: string;
}) {
  return (
    <figure className="w-full">
      <div className="flex items-center justify-center rounded-2xl border border-[rgba(20,24,28,0.08)] bg-white p-5 shadow-[0_2px_16px_rgba(20,24,28,0.05)]">
        {/* biome-ignore lint/performance/noImgElement: self-hosted PlantUML SVG; next/image blocks SVG by default */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={
            maxH
              ? `h-auto w-auto max-w-full ${maxH}`
              : "h-auto w-full max-w-full"
          }
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[11px] text-[rgba(20,24,28,0.45)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function WorkGraphShowcase() {
  const t = useTranslations("WorkGraph");

  const facts = t.raw("hero.facts") as Fact[];
  const diffItems = t.raw("diff.items") as DiffItem[];
  const steps = t.raw("line.steps") as Step[];
  const lineShots = t.raw("line.shots") as Shot[];
  const legend = t.raw("graph.legend") as Legend[];
  const caps = t.raw("graph.caps") as Cap[];
  const limits = t.raw("graph.limits") as Fact[];
  const resourceItems = t.raw("resources.items") as ResourceItem[];
  const resourceShots = t.raw("resources.shots") as Shot[];
  const governanceItems = t.raw("governance.items") as Cap[];
  const apiItems = t.raw("api.items") as ApiItem[];
  const headers = t.raw("api.headers") as string[];
  const platformItems = t.raw("platform.items") as Cap[];

  return (
    <div className="overflow-x-hidden">
      <WorkGraphNav />

      {/* ===== 1. Hero — asymmetric, the graph screenshot carries it ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden px-6 pt-28 pb-14 lg:pt-32">
        <div
          aria-hidden
          className="orb orb-a -top-28 right-[-12%] h-[560px] w-[560px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="orb orb-b bottom-[-18%] left-[-8%] h-[460px] w-[460px]"
          style={{
            background:
              "radial-gradient(circle, rgba(58,178,127,0.18) 0%, transparent 72%)",
          }}
        />
        <div
          aria-hidden
          className="orb orb-c top-[30%] left-[42%] h-[300px] w-[300px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,130,32,0.07) 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left — copy */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
              style={{
                borderColor: "rgba(0,121,76,0.24)",
                background: "rgba(0,121,76,0.06)",
                color: "#00794c",
              }}
            >
              <Network className="h-3 w-3" />
              {t("hero.badge")}
            </span>
            <h1
              className="apple-headline mb-5"
              style={{
                color: "#16181c",
                fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)",
              }}
            >
              {t.rich("hero.title", {
                accent: (chunks) => (
                  <span className="relative text-[#00794c]">
                    {chunks}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-1 h-[6px] rounded-full"
                      style={{ background: "rgba(0,121,76,0.16)" }}
                    />
                  </span>
                ),
              })}
            </h1>
            <p
              className="apple-body mb-8 max-w-[48ch] text-[15px] sm:text-base"
              style={{ color: "rgba(20,24,28,0.6)" }}
            >
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <ContactDialog>
                <button
                  type="button"
                  className="apple-btn-accent inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium"
                >
                  {t("hero.ctaPrimary")}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </ContactDialog>
              <a
                href="#graph"
                className="apple-pill inline-flex items-center gap-1.5 text-sm font-normal"
                style={{ color: "#00794c", borderColor: "#00794c" }}
              >
                <Network className="h-3.5 w-3.5" />
                {t("hero.ctaSecondary")}
              </a>
            </div>

            {/* Fact strip — every number is a real product limit, not a boast */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              {facts.map((fact, i) => (
                <div
                  key={fact.label}
                  className="border-l-2 pl-3"
                  style={{ borderColor: ["#00925c", "#f58220", "#e11b22"][i] }}
                >
                  <div
                    className="font-mono text-xl font-semibold"
                    style={{ color: "#16181c", letterSpacing: "-0.02em" }}
                  >
                    {fact.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(20,24,28,0.55)" }}
                  >
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — the graph itself, with two of its own badges called out */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            <div className="relative pb-8">
              <Shot
                src="/workgraph/ui-graph.png"
                alt={t("hero.shotAlt")}
                caption={t("hero.shotCaption")}
                priority
                sizes="(max-width: 1024px) 100vw, 820px"
              />

              {/* Kept inside the shot: at 1400-1450px viewports an outward
                  offset put the right-hand badge under the page's
                  overflow-x-hidden clip and it got sliced off. Both sit over
                  the graph canvas — what they annotate — rather than across
                  the app's own left nav, where they read as a render glitch. */}
              <div className="absolute left-[6%] top-[22%] hidden items-center gap-2.5 rounded-2xl border border-[rgba(20,24,28,0.08)] bg-white px-3.5 py-2.5 shadow-[0_16px_36px_-18px_rgba(20,24,28,0.3)] sm:flex lg:left-[24%]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00794c]/10">
                  <Lock className="h-3.5 w-3.5 text-[#00794c]" />
                </span>
                <span className="flex flex-col">
                  <b className="text-[11px] font-semibold text-[#16181c]">
                    {t("hero.floatOne.title")}
                  </b>
                  <small className="font-mono text-[9px] text-[#5b6167]">
                    {t("hero.floatOne.desc")}
                  </small>
                </span>
              </div>

              <div className="absolute right-3 bottom-[18%] hidden items-center gap-2.5 rounded-2xl border border-[rgba(20,24,28,0.08)] bg-white px-3.5 py-2.5 shadow-[0_16px_36px_-18px_rgba(20,24,28,0.3)] sm:flex lg:right-6">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e11b22]/10">
                  <RefreshCw className="h-3.5 w-3.5 text-[#e11b22]" />
                </span>
                <span className="flex flex-col">
                  <b className="text-[11px] font-semibold text-[#16181c]">
                    {t("hero.floatTwo.title")}
                  </b>
                  <small className="font-mono text-[9px] text-[#5b6167]">
                    {t("hero.floatTwo.desc")}
                  </small>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. Three differences ===== */}
      <section
        id="diff"
        className="apple-section-light border-t border-[rgba(20,24,28,0.06)] px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("diff.eyebrow")}
            title={t("diff.title")}
            lead={t("diff.lead")}
          />

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-12"
            {...revealProps}
          >
            {diffItems.map((item, i) => {
              const Icon = DIFF_ICONS[i];
              const tone = DIFF_TONES[i];
              const wide = DIFF_SPANS[i] === "lg:col-span-12";
              return (
                <motion.article
                  key={item.tag}
                  variants={cardVariants}
                  className={`rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00794c]/40 hover:shadow-[0_28px_60px_-30px_rgba(0,121,76,0.4)] ${DIFF_SPANS[i]} ${
                    wide
                      ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
                      : "flex flex-col"
                  }`}
                >
                  {/* Wide card: the icon moves beside the title instead of
                      above it. Stacked, the left block was 120px tall against
                      a 45px paragraph, and `items-center` then dropped the
                      title well below the copy it belongs to. */}
                  <div
                    className={
                      wide ? "flex items-center gap-4 lg:col-span-4" : undefined
                    }
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        wide ? "shrink-0" : "mb-5"
                      }`}
                      style={{ background: tone.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: tone.fg }} />
                    </span>
                    <div>
                      <span
                        className="eyebrow-mono text-[0.65rem]"
                        style={{ color: "rgba(20,24,28,0.4)" }}
                      >
                        {item.tag}
                      </span>
                      <h3
                        className="mt-1.5 text-lg font-semibold"
                        style={{ color: "#16181c" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p
                    className={`text-sm ${wide ? "lg:col-span-5 lg:mt-0" : ""} mt-2.5`}
                    style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </p>
                  <p
                    className={`font-mono text-[11px] ${
                      wide
                        ? "mt-5 border-t border-[rgba(20,24,28,0.06)] pt-4 lg:col-span-3 lg:mt-0 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6"
                        : "mt-5 border-t border-[rgba(20,24,28,0.06)] pt-4"
                    }`}
                    style={{ color: tone.fg }}
                  >
                    {item.note}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Centred, not pinned left: a left-aligned 1000px figure inside a
              1400px column read as a mistake. */}
          <div className="mx-auto mt-12 max-w-[1120px]">
            <Diagram
              src="/workgraph/dg-concepts.svg"
              alt={t("diff.figureAlt")}
              caption={t("diff.figureCaption")}
            />
          </div>
        </div>
      </section>

      {/* ===== 3. Main line 00 → 06 ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden border-t border-[rgba(20,24,28,0.06)] px-6 py-16 md:py-24">
        <div
          aria-hidden
          className="orb orb-b pointer-events-none absolute -right-[8%] top-[6%] h-[420px] w-[420px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.1) 0%, transparent 72%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("line.eyebrow")}
            title={t("line.title")}
            lead={t("line.lead")}
          />

          <motion.ol
            className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-12"
            {...revealProps}
          >
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const featured = i === 3;
              return (
                <motion.li
                  key={step.n}
                  variants={cardVariants}
                  className={`flex flex-col rounded-3xl border p-6 ${STEP_SPANS[i]} ${
                    featured
                      ? "border-[#00794c]/45 bg-[#f2fbf6] shadow-[0_18px_44px_-24px_rgba(0,121,76,0.45)]"
                      : "border-[rgba(20,24,28,0.08)] bg-white shadow-[0_2px_16px_rgba(20,24,28,0.05)]"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "rgba(0,121,76,0.1)" }}
                    >
                      <Icon className="h-[18px] w-[18px] text-[#00794c]" />
                    </span>
                    <span className="font-mono text-sm font-semibold tracking-[0.12em] text-[#f58220]">
                      {step.n}
                    </span>
                  </div>
                  <h3
                    className="mb-2.5 text-[15px] font-semibold"
                    style={{ color: "#16181c" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[13px]"
                    style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                  >
                    {step.desc}
                  </p>
                  {featured ? (
                    <span className="mt-4 inline-flex w-max items-center gap-1 rounded-full bg-[#f58220] px-2.5 py-1 font-mono text-[10px] font-semibold text-white">
                      <Sparkles className="h-3 w-3" />
                      {t("line.featured")}
                    </span>
                  ) : null}
                </motion.li>
              );
            })}
          </motion.ol>

          {/* Equal halves: both shots are locked to the same 16/10 frame, so a
              7/5 split gave two different heights and left a wedge of dead
              space beside the shorter one. 6/6 makes the row symmetric and the
              captions land on one baseline for free. */}
          <motion.div
            className="mt-12 grid gap-6 lg:grid-cols-2"
            {...revealProps}
          >
            <motion.div variants={cardVariants}>
              <Shot
                src="/workgraph/ui-templates.png"
                alt={lineShots[0].alt}
                caption={lineShots[0].caption}
                sizes="(max-width: 1024px) 100vw, 660px"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <Shot
                src="/workgraph/ui-task-tree.png"
                alt={lineShots[1].alt}
                caption={lineShots[1].caption}
                sizes="(max-width: 1024px) 100vw, 660px"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4. Task graph — the flagship, on the dark band ===== */}
      <section id="graph" className="apple-section-dark px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("graph.eyebrow")}
            tone="dark"
            title={t.rich("graph.title", {
              accent: (chunks) => (
                <span className="text-[#3ab27f]">{chunks}</span>
              ),
            })}
            lead={t("graph.lead")}
          />

          {/* Legend + hard limits together are almost exactly as tall as the
              screenshot beside them. The four capabilities used to sit under
              the shot inside the same column, which is what left ~600px of
              dead space at the bottom of the left one — they now run full
              width below the row. */}
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <motion.div className="lg:col-span-5" {...revealProps}>
              <motion.div variants={cardVariants}>
                <p className="eyebrow-mono mb-4 text-white/45">
                  {t("graph.legendTitle")}
                </p>
                <dl className="grid gap-y-2.5">
                  {legend.map((row) => (
                    <div
                      key={row.k}
                      className="grid grid-cols-[1fr_auto] items-baseline gap-3 border-b border-white/10 pb-2.5"
                    >
                      <dt className="font-mono text-[11px] text-white/75">
                        {row.k}
                      </dt>
                      <dd className="text-[13px] text-white/55">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              <motion.div variants={cardVariants} className="mt-9">
                <p className="eyebrow-mono mb-4 text-white/45">
                  {t("graph.limitsTitle")}
                </p>
                <div className="grid gap-4">
                  {limits.map((limit, i) => (
                    <div
                      key={limit.label}
                      className="border-l-2 pl-3.5"
                      style={{
                        borderColor: ["#3ab27f", "#f58220", "#e11b22"][i],
                      }}
                    >
                      <div className="font-mono text-lg font-semibold text-white">
                        {limit.value}
                      </div>
                      <div className="text-xs text-white/55">{limit.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-7" {...revealProps}>
              <motion.div variants={cardVariants}>
                <Shot
                  src="/workgraph/ui-task-peek.png"
                  alt={t("graph.shotAlt")}
                  caption={t("graph.shotCaption")}
                  tone="dark"
                  sizes="(max-width: 1024px) 100vw, 780px"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="mt-16" {...revealProps}>
            <motion.p
              variants={cardVariants}
              className="eyebrow-mono mb-2 text-white/45"
            >
              {t("graph.capsTitle")}
            </motion.p>
            <div className="grid gap-x-14 md:grid-cols-2">
              {caps.map((cap) => (
                <motion.article
                  key={cap.title}
                  variants={cardVariants}
                  className="border-t border-white/10 py-6"
                >
                  <h3 className="mb-2 text-base font-semibold text-white">
                    {cap.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}
                  >
                    {cap.desc}
                  </p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 5. One resource mechanism, five kinds ===== */}
      <section
        id="resources"
        className="apple-section-light px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("resources.eyebrow")}
            title={t("resources.title")}
            lead={t("resources.lead")}
          />

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-12"
            {...revealProps}
          >
            {resourceItems.map((item, i) => {
              const Icon = RESOURCE_ICONS[i];
              const wide = RESOURCE_SPANS[i] === "lg:col-span-12";
              return (
                <motion.article
                  key={item.kind}
                  variants={cardVariants}
                  className={`rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00794c]/40 ${RESOURCE_SPANS[i]} ${
                    wide
                      ? "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10"
                      : "flex flex-col"
                  }`}
                >
                  <div
                    className={
                      wide
                        ? "flex items-center gap-4 lg:col-span-5"
                        : "mb-5 flex items-center justify-between gap-4"
                    }
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00794c]/10">
                      <Icon className="h-5 w-5 text-[#00794c]" />
                    </span>
                    {wide ? (
                      <h3
                        className="text-base font-semibold"
                        style={{ color: "#16181c" }}
                      >
                        {item.title}
                      </h3>
                    ) : null}
                    <code
                      className={`rounded-md bg-[#f6f7f6] px-2 py-1 font-mono text-[10px] text-[#5b6167] ${wide ? "lg:ml-auto" : ""}`}
                    >
                      {item.kind}
                    </code>
                  </div>
                  {wide ? null : (
                    <h3
                      className="text-base font-semibold"
                      style={{ color: "#16181c" }}
                    >
                      {item.title}
                    </h3>
                  )}
                  <p
                    className={`text-[13px] ${wide ? "mt-4 lg:col-span-7 lg:mt-0" : "mt-2.5"}`}
                    style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>

          {/* Equal halves, same reason as the pair in the main-line section. */}
          <motion.div
            className="mt-10 grid gap-6 lg:grid-cols-2"
            {...revealProps}
          >
            <motion.div variants={cardVariants}>
              <Shot
                src="/workgraph/ui-resources.png"
                alt={resourceShots[0].alt}
                caption={resourceShots[0].caption}
                sizes="(max-width: 1024px) 100vw, 660px"
              />
            </motion.div>
            <motion.div variants={cardVariants}>
              <Shot
                src="/workgraph/ui-diagrams.png"
                alt={resourceShots[1].alt}
                caption={resourceShots[1].caption}
                sizes="(max-width: 1024px) 100vw, 660px"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 6. Governance ===== */}
      <section
        id="governance"
        className="apple-section-light border-t border-[rgba(20,24,28,0.06)] px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("governance.eyebrow")}
            title={t("governance.title")}
            lead={t("governance.lead")}
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <motion.div className="lg:col-span-5" {...revealProps}>
              <motion.div variants={cardVariants}>
                <Diagram
                  src="/workgraph/dg-rbac.svg"
                  alt={t("governance.figureAlt")}
                  caption={t("governance.figureCaption")}
                  maxH="max-h-[680px]"
                />
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-7" {...revealProps}>
              {governanceItems.map((item, i) => {
                const Icon = GOVERNANCE_ICONS[i];
                return (
                  <motion.article
                    key={item.title}
                    variants={cardVariants}
                    /* The last rule closes the ledger so the column reads as a
                       finished block against the tall diagram beside it. */
                    className={`grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t border-[rgba(20,24,28,0.08)] py-7 ${
                      i === governanceItems.length - 1
                        ? "border-b border-b-[rgba(20,24,28,0.08)]"
                        : ""
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00794c]/10">
                      <Icon className="h-[18px] w-[18px] text-[#00794c]" />
                    </span>
                    <div>
                      <h3
                        className="mb-2 text-base font-semibold"
                        style={{ color: "#16181c" }}
                      >
                        {item.title}
                      </h3>
                      {/* 54ch on a 14px paragraph is ~400px — a real reading
                          measure. (Unlike the heading, the clamp and the font
                          size live on the same element here, so `ch` means
                          what it says.) */}
                      <p
                        className="max-w-[54ch] text-sm"
                        style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          {/* A log table wants the whole measure — it was pinned to 1000px on
              the left of a 1400px column. */}
          <div className="mt-14">
            <Shot
              src="/workgraph/ui-admin-logs.png"
              alt={t("governance.shotAlt")}
              caption={t("governance.shotCaption")}
              sizes="(max-width: 1024px) 100vw, 1400px"
            />
          </div>
        </div>
      </section>

      {/* ===== 7. Subscriptions & semantic projection — dark band ===== */}
      <section id="api" className="apple-section-dark px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("api.eyebrow")}
            tone="dark"
            title={t.rich("api.title", {
              accent: (chunks) => (
                <span className="text-[#3ab27f]">{chunks}</span>
              ),
            })}
            lead={t("api.lead")}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <motion.div className="lg:col-span-5" {...revealProps}>
              <motion.div
                variants={cardVariants}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
              >
                <p className="eyebrow-mono mb-3.5 text-white/45">
                  {t("api.headersTitle")}
                </p>
                <div className="grid gap-2">
                  {/* min-w-0: as grid items the default min-width:auto would
                      widen the track instead of letting these long header
                      lines scroll inside the card on narrow viewports. */}
                  {headers.map((line) => (
                    <code
                      key={line}
                      className="block min-w-0 overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed text-[#3ab27f]"
                    >
                      {line}
                    </code>
                  ))}
                </div>
                {/* The product ships as TaskGraph in code, CLI and webhook
                    headers; say so here rather than quietly renaming what
                    integrators actually receive. */}
                <p className="mt-4 border-t border-white/10 pt-4 text-[13px] text-white/55">
                  {t("api.nameNote")}
                </p>
                <p className="mt-2.5 text-[13px] text-white/55">
                  {t("api.tokenNote")}
                </p>
              </motion.div>

              <motion.div variants={cardVariants} className="mt-6">
                <Shot
                  src="/workgraph/ui-subscriptions.png"
                  alt={t("api.shotAlt")}
                  caption={t("api.shotCaption")}
                  tone="dark"
                  sizes="(max-width: 1024px) 100vw, 540px"
                />
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-7" {...revealProps}>
              {apiItems.map((item, i) => {
                const Icon = API_ICONS[i];
                return (
                  <motion.article
                    key={item.title}
                    variants={cardVariants}
                    className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t border-white/10 py-6"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3ab27f]/14">
                      <Icon className="h-[18px] w-[18px] text-[#3ab27f]" />
                    </span>
                    <div>
                      <span className="eyebrow-mono text-[0.65rem] text-white/40">
                        {item.tag}
                      </span>
                      <h3 className="mt-1.5 mb-2 text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p
                        className="max-w-[62ch] text-sm"
                        style={{
                          color: "rgba(255,255,255,0.62)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>

          {/* The widest artefact on the page: a sequence chart across six
              lifelines. It was squeezed into 7 of 12 columns. */}
          <motion.div className="mt-14" {...revealProps}>
            <motion.div variants={cardVariants}>
              <Diagram
                src="/workgraph/dg-subscribe-deliver.svg"
                alt={t("api.figureAlt")}
                caption={t("api.figureCaption")}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 8. Platform — deployment shape and the performance decisions
           behind it. Every number here is checkable in the product repo:
           service list and published-port policy from deploy/compose.prod.yml,
           the build posture from Containerfile, and the 200ms P95 / index /
           pagination rules from docs/taskgraph-design.md (NFR-1, §5.3). ===== */}
      <section className="apple-section-light px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("platform.eyebrow")}
            title={t("platform.title")}
            lead={t("platform.lead")}
          />

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2"
            {...revealProps}
          >
            {platformItems.map((item, i) => {
              const Icon = PLATFORM_ICONS[i];
              return (
                <motion.article
                  key={item.title}
                  variants={cardVariants}
                  className="flex gap-4 rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-6 shadow-[0_2px_16px_rgba(20,24,28,0.05)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00794c]/10">
                    <Icon className="h-[18px] w-[18px] text-[#00794c]" />
                  </span>
                  <div>
                    <h3
                      className="mb-2 text-[15px] font-semibold"
                      style={{ color: "#16181c" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-[13px]"
                      style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 9. Conversion CTA ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden border-t border-[rgba(20,24,28,0.06)] px-6 py-20 md:py-28">
        <div
          aria-hidden
          className="orb orb-a pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <span
            aria-hidden
            className="brand-stripe mx-auto mb-6 block h-[3px] w-24 rounded-full"
          />
          <p
            className="eyebrow-mono mb-4"
            style={{ color: "rgba(20,24,28,0.45)" }}
          >
            {t("cta.badge")}
          </p>
          <h2
            className="apple-headline text-3xl sm:text-4xl md:text-[44px]"
            style={{ color: "#16181c" }}
          >
            {t("cta.title")}
          </h2>
          <p
            className="apple-body mx-auto mt-4 max-w-[54ch] text-sm sm:text-base"
            style={{ color: "rgba(20,24,28,0.6)" }}
          >
            {t("cta.description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ContactDialog>
              <button
                type="button"
                className="apple-btn-accent inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium"
              >
                {t("cta.button")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </ContactDialog>
            <Link
              href="/worksync"
              className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
              style={{ color: "#00794c", borderColor: "#00794c" }}
            >
              {t("cta.back")}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs text-[#5b6167]">
            {t("cta.note")}
          </p>
        </div>
      </section>

      <Footer showContactId />
    </div>
  );
}
