"use client";

// ---------------------------------------------------------------------------
// DPP Lead Engine — the EU Digital Product Passport implementation business.
// Content ported from the dpp-lead-engine prototype; the prototype's violet /
// Inter styling was dropped and rebuilt on the portal's system (Store Green
// lead, orange + red rhythm, Geist, apple-* primitives) per DESIGN.md §2/§3/§7.
//
// Section order mirrors the source: hero → industries → why now → authority
// (dark band) → implementation path → resources → CTA.
// ---------------------------------------------------------------------------

import { motion } from "framer-motion";
import {
  Armchair,
  ArrowUpRight,
  BatteryCharging,
  Braces,
  BrainCircuit,
  ChevronRight,
  CircleDot,
  Cpu,
  Database,
  Factory,
  FileText,
  Flag,
  GitPullRequestArrow,
  Layers,
  ListChecks,
  Network,
  PlayCircle,
  Recycle,
  Rocket,
  ScanLine,
  ShieldCheck,
  Shirt,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OPEN_DPP_URL } from "@/lib/dpp-tools";
import ContactDialog from "../contact-dialog";
import Footer from "../footer";
import LocaleSwitcher from "../locale-switcher";
import PassportArt from "./passport-art";

// ---------------------------------------------------------------------------
// Motion presets — same values as the homepage (see DESIGN.md §6)
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

const INDUSTRY_ICONS = [BatteryCharging, Shirt, Cpu, Armchair, Factory];
const WHY_ICONS = [Flag, Network, Recycle, Database];
const CAPABILITY_ICONS = [Workflow, GitPullRequestArrow, Layers, BrainCircuit];
const STEP_ICONS = [ScanLine, Layers, Braces, ShieldCheck, Rocket];
const RESOURCE_ICONS = [Braces, ListChecks];

// Tri-color rotation for the why-now cards — green leads, orange/red pace it
const WHY_TONES = [
  { fg: "#00794c", bg: "rgba(0,121,76,0.1)" },
  { fg: "#3ab27f", bg: "rgba(58,178,127,0.14)" },
  { fg: "#f58220", bg: "rgba(245,130,32,0.12)" },
  { fg: "#e11b22", bg: "rgba(225,27,34,0.09)" },
];

// Zig-zag column spans so the 4 cards never read as an equal grid (DESIGN.md §5)
const WHY_SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

type WhyItem = { tag: string; title: string; desc: string; link: string };
type ResourceItem = { tag: string; title: string; desc: string; cta: string };
type StepItem = { n: string; title: string; desc: string };
type TrustItem = { value: string; label: string };

// ---------------------------------------------------------------------------
// Nav — same shell as AppleNav / EnterpriseNav
// ---------------------------------------------------------------------------

// `base` is set by pages other than /dpp (e.g. the tools hub) so the section
// anchors resolve back to the marketing page instead of the current route.
export function DppNav({ base = "" }: { base?: string }) {
  const t = useTranslations("Dpp.nav");
  const common = useTranslations("Common");

  const anchors = [
    { href: "#why", label: t("why") },
    { href: "#capability", label: t("capability") },
    { href: "#path", label: t("path") },
    { href: "#resources", label: t("resources") },
  ];
  const linkClass =
    "hidden text-sm text-[#5b6167] transition-colors hover:text-[#16181c] md:inline";

  return (
    <nav className="apple-nav fixed inset-x-0 top-0 z-50 flex h-12 items-center">
      <span
        aria-hidden
        className="brand-stripe absolute inset-x-0 bottom-0 h-[3px]"
      />
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-medium tracking-tight text-[#16181c] transition-colors hover:text-[#00794c]"
        >
          {common("brand")}
        </Link>

        <div className="flex items-center gap-5">
          {anchors.map((link) =>
            base ? (
              <Link
                key={link.href}
                href={`${base}${link.href}`}
                className={linkClass}
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ),
          )}
          <Link href="/dpp/tools" className={linkClass}>
            {t("tools")}
          </Link>
          <LocaleSwitcher className="hidden text-[#5b6167] sm:inline-flex" />
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-accent cursor-pointer text-sm py-1! px-3!"
            >
              {t("consult")}
            </button>
          </ContactDialog>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Section heading — mirrors the homepage's SectionHeading
// ---------------------------------------------------------------------------

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
    <div className="max-w-[52ch]">
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
        className="apple-headline text-3xl sm:text-4xl md:text-[42px]"
        style={{ color: dark ? "#ffffff" : "#16181c" }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className="apple-body mt-4 text-sm sm:text-base"
          style={{
            color: dark ? "rgba(255,255,255,0.6)" : "rgba(20,24,28,0.58)",
          }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Readiness gauge — real SVG ring (the prototype faked this with a CSS border)
// ---------------------------------------------------------------------------

function ReadinessGauge({ score, of }: { score: string; of: string }) {
  const value = Number(score) || 0;
  const r = 34;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="relative h-[92px] w-[92px] shrink-0">
      {/* The ring carries the accessible name; the visible numerals are
          aria-hidden so the score is announced exactly once. */}
      <svg
        viewBox="0 0 80 80"
        className="h-full w-full -rotate-90"
        fill="none"
        role="img"
      >
        <title>{`${score}${of}`}</title>
        <circle
          cx="40"
          cy="40"
          r={r}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          stroke="#3ab27f"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="flex items-baseline gap-0.5">
          <span className="font-mono text-2xl font-semibold text-white">
            {score}
          </span>
          <span className="font-mono text-[10px] text-white/55">{of}</span>
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function DppShowcase() {
  const t = useTranslations("Dpp");
  const common = useTranslations("Common");

  const trust = t.raw("hero.trust") as TrustItem[];
  const industries = t.raw("industries.items") as string[];
  const whyItems = t.raw("why.items") as WhyItem[];
  const capabilities = t.raw("authority.items") as StepItem[];
  const steps = t.raw("path.steps") as StepItem[];
  const resourceItems = t.raw("resources.items") as ResourceItem[];

  // The why-now cards deep-link into the sections that answer them. Labels must
  // match what the target section actually delivers — there is no Timeline page
  // yet (strategy §5.1), so card 1 points at the phased path instead.
  const whyTargets = ["#path", "#capability", "#resources", "#contact"];

  return (
    <div className="overflow-x-hidden">
      <DppNav />

      {/* ===== 1. Hero — asymmetric, passport card on the right ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden px-6 pt-28 pb-14 lg:pt-32">
        <div
          aria-hidden
          className="orb orb-a -top-28 right-[-10%] h-[560px] w-[560px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="orb orb-b bottom-[-16%] left-[-8%] h-[460px] w-[460px]"
          style={{
            background:
              "radial-gradient(circle, rgba(58,178,127,0.18) 0%, transparent 72%)",
          }}
        />
        <div
          aria-hidden
          className="orb orb-c top-[26%] left-[40%] h-[300px] w-[300px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,130,32,0.07) 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left — copy */}
          <motion.div
            className="lg:col-span-6"
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
              <CircleDot className="h-3 w-3" />
              {t("hero.badge")}
            </span>
            <h1
              className="apple-headline mb-5"
              style={{
                color: "#16181c",
                fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              }}
            >
              {t.rich("hero.title", {
                accent: (chunks) => (
                  <span className="relative whitespace-nowrap text-[#00794c]">
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
                href="#path"
                className="apple-pill inline-flex items-center gap-1.5 text-sm font-normal"
                style={{ color: "#00794c", borderColor: "#00794c" }}
              >
                <PlayCircle className="h-3.5 w-3.5" />
                {t("hero.ctaSecondary")}
              </a>
            </div>

            {/* Trust strip — tri-color left borders, same as the homepage */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              {trust.map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-l-2 pl-3"
                  style={{
                    borderColor: ["#00925c", "#f58220", "#e11b22"][i],
                  }}
                >
                  <div
                    className="font-mono text-xl font-semibold"
                    style={{ color: "#16181c", letterSpacing: "-0.02em" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(20,24,28,0.55)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — passport card with floating callouts */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            {/* pb leaves room for the lower callout to hang off the card's
                bottom edge instead of covering its data fields */}
            <div className="relative mx-auto max-w-[420px] pb-10">
              <div className="rounded-3xl bg-white/60 p-2 shadow-[0_30px_70px_-32px_rgba(20,24,28,0.35)] backdrop-blur-sm">
                <PassportArt />
              </div>

              {/* Callout: validation passed */}
              <div className="absolute -right-2 top-[22%] flex items-center gap-2.5 rounded-2xl border border-[rgba(20,24,28,0.08)] bg-white px-3.5 py-2.5 shadow-[0_16px_36px_-18px_rgba(20,24,28,0.3)] sm:-right-6">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00794c]/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00794c]" />
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

              {/* Callout: supply chain connected */}
              <div className="absolute bottom-0 -left-2 flex items-center gap-2.5 rounded-2xl border border-[rgba(20,24,28,0.08)] bg-white px-3.5 py-2.5 shadow-[0_16px_36px_-18px_rgba(20,24,28,0.3)] sm:-left-6">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f58220]/12">
                  <Network className="h-3.5 w-3.5 text-[#f58220]" />
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

      {/* ===== 2. Industries strip ===== */}
      <section className="apple-section-light border-y border-[rgba(20,24,28,0.06)] px-6 py-8">
        <div className="mx-auto max-w-[1400px]">
          <p
            className="eyebrow-mono mb-5 text-center"
            style={{ color: "rgba(20,24,28,0.45)" }}
          >
            {t("industries.label")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {industries.map((name, i) => {
              const Icon = INDUSTRY_ICONS[i];
              return (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "#5b6167" }}
                >
                  <Icon className="h-4 w-4 text-[#00794c]" />
                  {name}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. Why now — zig-zag editorial grid ===== */}
      <section id="why" className="apple-section-light px-6 py-16 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("why.eyebrow")}
            title={t("why.title")}
            lead={t("why.lead")}
          />

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-12"
            {...revealProps}
          >
            {whyItems.map((item, i) => {
              const Icon = WHY_ICONS[i];
              const tone = WHY_TONES[i];
              return (
                <motion.article
                  key={item.title}
                  variants={cardVariants}
                  className={`group flex flex-col rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00794c]/40 hover:shadow-[0_28px_60px_-30px_rgba(0,121,76,0.4)] ${WHY_SPANS[i]}`}
                >
                  <span
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: tone.bg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: tone.fg }} />
                  </span>
                  <span
                    className="eyebrow-mono text-[0.65rem]"
                    style={{ color: "rgba(20,24,28,0.4)" }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="mt-2 text-lg font-semibold"
                    style={{ color: "#16181c" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2.5 max-w-[52ch] text-sm"
                    style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </p>
                  <a
                    href={whyTargets[i]}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#00794c]"
                  >
                    {item.link}
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. Authority — dark band (see DESIGN.md §2) ===== */}
      <section
        id="capability"
        className="apple-section-dark px-6 py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div className="lg:col-span-5" {...revealProps}>
            <motion.div variants={cardVariants}>
              <SectionHeading
                eyebrow={t("authority.eyebrow")}
                tone="dark"
                title={t.rich("authority.title", {
                  accent: (chunks) => (
                    <span className="text-[#3ab27f]">{chunks}</span>
                  ),
                })}
                lead={t("authority.description")}
              />
            </motion.div>

            <motion.blockquote
              variants={cardVariants}
              className="mt-8 border-l-2 border-[#3ab27f] pl-5"
            >
              <p className="text-base font-medium leading-relaxed text-white/90">
                {t("authority.quote")}
              </p>
            </motion.blockquote>

            <motion.a
              variants={cardVariants}
              href={OPEN_DPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-[#3ab27f]"
            >
              {t("authority.link")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </motion.a>
          </motion.div>

          <motion.div className="lg:col-span-7" {...revealProps}>
            {capabilities.map((cap, i) => {
              const Icon = CAPABILITY_ICONS[i];
              return (
                <motion.article
                  key={cap.n}
                  variants={cardVariants}
                  className="grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-2 border-t border-white/10 py-7 sm:grid-cols-[2.5rem_2.75rem_1fr]"
                >
                  <span className="font-mono text-xs text-white/35 sm:pt-3">
                    {cap.n}
                  </span>
                  <span className="hidden h-11 w-11 items-center justify-center rounded-xl bg-[#3ab27f]/14 sm:flex">
                    <Icon className="h-5 w-5 text-[#3ab27f]" />
                  </span>
                  <div className="col-span-2 sm:col-span-1">
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {cap.title}
                    </h3>
                    <p
                      className="max-w-[56ch] text-sm"
                      style={{
                        color: "rgba(255,255,255,0.62)",
                        lineHeight: 1.6,
                      }}
                    >
                      {cap.desc}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 5. Implementation path — 5-step rail ===== */}
      <section
        id="path"
        className="paper-dots apple-section-light relative overflow-hidden px-6 py-16 md:py-24"
      >
        <div
          aria-hidden
          className="orb orb-b pointer-events-none absolute -right-[6%] top-[8%] h-[420px] w-[420px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.1) 0%, transparent 72%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("path.eyebrow")}
            title={t("path.title")}
            lead={t("path.lead")}
          />

          <motion.ol
            className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-5"
            {...revealProps}
          >
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const featured = i === 0;
              return (
                <motion.li
                  key={step.n}
                  variants={cardVariants}
                  className={`relative flex flex-col rounded-3xl border p-6 ${
                    featured
                      ? "border-[#00794c]/45 bg-[#f2fbf6] shadow-[0_18px_44px_-24px_rgba(0,121,76,0.45)]"
                      : "border-[rgba(20,24,28,0.08)] bg-white shadow-[0_2px_16px_rgba(20,24,28,0.05)]"
                  }`}
                >
                  {/* rail connector — decorative, desktop only */}
                  {i < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="brand-stripe absolute -right-3 top-11 hidden h-[2px] w-6 rounded-full opacity-45 lg:block"
                    />
                  ) : null}

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
                      {t("path.featured")}
                    </span>
                  ) : null}
                </motion.li>
              );
            })}
          </motion.ol>

          <div className="mt-12">
            <ContactDialog>
              <button
                type="button"
                className="apple-btn-accent inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium"
              >
                {t("path.cta")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </ContactDialog>
          </div>
        </div>
      </section>

      {/* ===== 6. Resource center — uneven grid, dark lead card ===== */}
      <section
        id="resources"
        className="apple-section-light border-t border-[rgba(20,24,28,0.06)] px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={t("resources.eyebrow")}
              title={t("resources.title")}
              lead={t("resources.lead")}
            />
            <Link
              href="/dpp/tools"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#00794c]"
            >
              {t("resources.all")}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-12"
            {...revealProps}
          >
            {/* Lead card — free readiness assessment */}
            <motion.div
              variants={cardVariants}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0e1012] p-7 lg:col-span-6"
            >
              <span
                aria-hidden
                className="brand-stripe absolute inset-x-0 top-0 h-[3px]"
              />
              <div className="flex items-start justify-between gap-6">
                <span className="inline-flex items-center rounded-full border border-[#3ab27f]/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-[#3ab27f]">
                  {t("resources.main.tag")}
                </span>
                <ReadinessGauge
                  score={t("resources.main.score")}
                  of={t("resources.main.scoreOf")}
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                {t("resources.main.title")}
              </h3>
              <p
                className="mt-2.5 max-w-[44ch] text-sm"
                style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.6 }}
              >
                {t("resources.main.desc")}
              </p>
              <div className="mt-auto pt-6">
                <ContactDialog>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[#3ab27f]"
                  >
                    {t("resources.main.cta")}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </ContactDialog>
              </div>
            </motion.div>

            {/* Secondary resources */}
            {resourceItems.map((item, i) => {
              const Icon = RESOURCE_ICONS[i];
              return (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  className="flex flex-col rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00794c]/40 lg:col-span-3"
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00794c]/10">
                    <Icon className="h-5 w-5 text-[#00794c]" />
                  </span>
                  <span
                    className="eyebrow-mono text-[0.65rem]"
                    style={{ color: "rgba(20,24,28,0.4)" }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    className="mt-2 text-base font-semibold"
                    style={{ color: "#16181c" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2.5 text-[13px]"
                    style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </p>
                  <div className="mt-auto pt-6">
                    <ContactDialog>
                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[#00794c]"
                      >
                        {item.cta}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </ContactDialog>
                  </div>
                </motion.div>
              );
            })}

            {/* Industry guide — a wide strip rather than a third equal card,
                so the row never reads as a 3-up grid (DESIGN.md §5) */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-start gap-5 rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] sm:flex-row sm:items-center lg:col-span-12"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f58220]/10">
                <FileText className="h-5 w-5 text-[#f58220]" />
              </span>
              <div className="flex-1">
                <span
                  className="eyebrow-mono text-[0.65rem]"
                  style={{ color: "rgba(20,24,28,0.4)" }}
                >
                  {t("resources.guide.tag")}
                </span>
                <h3
                  className="mt-1.5 text-base font-semibold"
                  style={{ color: "#16181c" }}
                >
                  {t("resources.guide.title")}
                </h3>
                <p
                  className="mt-1.5 text-[13px]"
                  style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                >
                  {t("resources.guide.desc")}
                </p>
              </div>
              <ContactDialog>
                <button
                  type="button"
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-sm font-medium text-[#00794c]"
                >
                  {t("resources.guide.cta")}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </ContactDialog>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 7. Conversion CTA ===== */}
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
            className="apple-body mx-auto mt-4 max-w-[52ch] text-sm sm:text-base"
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
              href="/enterprise"
              className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
              style={{ color: "#00794c", borderColor: "#00794c" }}
            >
              {common("learnMore")}
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
