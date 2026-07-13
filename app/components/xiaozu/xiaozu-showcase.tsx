"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  Brain,
  ChevronRight,
  MonitorPlay,
  MousePointerClick,
  ScanLine,
  Share2,
  Sparkles,
  Swords,
  Target,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { CHESS_URL } from "@/lib/product-urls";
import ContactDialog from "../contact-dialog";
import Footer from "../footer";
import LocaleSwitcher from "../locale-switcher";
import ProductArt from "../product-art";

// ---------------------------------------------------------------------------
// Motion presets — mirror apple-showcase.tsx (see DESIGN.md §6)
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

// Icons paired with the three usage methods (copy comes from i18n)
const METHOD_ICONS = [MousePointerClick, MonitorPlay, Share2];
// Icons paired with the capability grid (copy comes from i18n)
const CAPABILITY_ICONS = [Brain, Target, ScanLine, Users];

// ---------------------------------------------------------------------------
// Scroll-aware navigation (matches AppleNav in apple-showcase.tsx)
// ---------------------------------------------------------------------------

function XiaozuNav() {
  const t = useTranslations("Xiaozu.nav");
  const common = useTranslations("Common");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > 100 && latest > prev);
  });

  return (
    <motion.nav
      className="apple-nav fixed top-0 left-0 right-0 z-50 h-12 flex items-center"
      initial={{ y: 0 }}
      animate={{ y: hidden ? -48 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <span
        aria-hidden
        className="brand-stripe absolute inset-x-0 bottom-0 h-[3px]"
      />
      <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#16181c] text-lg font-medium tracking-tight hover:text-[#00794c] transition-colors"
        >
          {common("brand")}
        </Link>

        <div className="flex items-center gap-5">
          <a
            href="#usage"
            className="text-[#5b6167] text-sm hover:text-[#16181c] transition-colors hidden sm:inline"
          >
            {t("usage")}
          </a>
          <a
            href="#capabilities"
            className="text-[#5b6167] text-sm hover:text-[#16181c] transition-colors hidden sm:inline"
          >
            {t("capabilities")}
          </a>
          <Link
            href="/"
            className="text-[#5b6167] text-sm hover:text-[#16181c] transition-colors hidden sm:inline"
          >
            {t("backHome")}
          </Link>
          <LocaleSwitcher className="hidden sm:inline-flex text-[#5b6167]" />
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-accent text-sm py-1! px-3! cursor-pointer"
            >
              {common("contact")}
            </button>
          </ContactDialog>
        </div>
      </div>
    </motion.nav>
  );
}

// ---------------------------------------------------------------------------
// Section heading — eyebrow + brand stripe + title + lead (mirrors apple-showcase)
// ---------------------------------------------------------------------------

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-[52ch]">
      <span
        className="eyebrow-mono mb-4 inline-flex items-center gap-2.5"
        style={{ color: "#00794c" }}
      >
        <span
          aria-hidden
          className="brand-stripe inline-block h-3 w-6 rounded-[2px]"
        />
        {eyebrow}
      </span>
      <h2
        className="apple-headline text-3xl sm:text-4xl md:text-[42px]"
        style={{ color: "#16181c" }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className="apple-body mt-4 text-sm sm:text-base"
          style={{ color: "rgba(20,24,28,0.58)" }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

type UsageMethod = {
  index: string;
  title: string;
  badge: string;
  summary: string;
  bullets: string[];
};
type Capability = { title: string; desc: string };

export default function XiaozuShowcase() {
  const t = useTranslations("Xiaozu");

  const methods = t.raw("usage.methods") as UsageMethod[];
  const capabilities = t.raw("capabilities.items") as Capability[];

  return (
    <div className="overflow-x-hidden">
      <XiaozuNav />

      {/* ===== 1. Hero — asymmetric, night-surface board art on the right ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden px-6 pt-28 pb-16 lg:pt-32">
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
          className="orb orb-c top-[24%] left-[38%] h-[300px] w-[300px]"
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
              className="eyebrow-mono mb-5 inline-flex items-center gap-3"
              style={{ color: "#00794c" }}
            >
              <span
                aria-hidden
                className="brand-stripe inline-block h-3.5 w-9 rounded-[2px]"
              />
              <Swords className="h-4 w-4" />
              {t("hero.eyebrow")}
            </span>
            <h1
              className="apple-headline mb-5"
              style={{
                color: "#16181c",
                fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
              }}
            >
              {t("hero.title")}
            </h1>
            <p
              className="apple-subhead mb-4 text-xl sm:text-2xl"
              style={{ color: "#16181c" }}
            >
              {t("hero.tagline")}
            </p>
            <p
              className="apple-body mb-8 max-w-[46ch] text-[15px] sm:text-base"
              style={{ color: "rgba(20,24,28,0.6)" }}
            >
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CHESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-accent inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {t("hero.openChess")}
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#usage"
                className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
                style={{ color: "#00794c", borderColor: "#00794c" }}
              >
                {t("hero.learnUsage")}
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Right — dark board art in a green media plane */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e1012] shadow-[0_28px_60px_-30px_rgba(0,0,0,0.7)]">
              <span
                aria-hidden
                className="brand-stripe absolute inset-x-0 top-0 z-10 h-[2px] opacity-70"
              />
              <div
                className="flex items-center justify-center p-8 sm:p-12"
                style={{
                  background:
                    "radial-gradient(125% 120% at 28% 12%, #17513c 0%, #0d3126 55%, #071d16 100%)",
                }}
              >
                <div className="w-full max-w-[420px]">
                  <ProductArt id="xiaozu" tone="dark" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. Three usage methods — the core section ===== */}
      <section
        id="usage"
        className="paper-dots apple-section-light relative overflow-hidden border-t border-[rgba(20,24,28,0.06)] px-6 py-16 md:py-24"
      >
        <div
          aria-hidden
          className="orb orb-b pointer-events-none absolute -right-[6%] top-[10%] h-[420px] w-[420px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.1) 0%, transparent 72%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <SectionHeading
            eyebrow={t("usage.eyebrow")}
            title={t("usage.title")}
            lead={t("usage.lead")}
          />

          <motion.div
            className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            {...revealProps}
          >
            {methods.map((method, i) => {
              const Icon = METHOD_ICONS[i] ?? Sparkles;
              return (
                <motion.div
                  key={method.index}
                  variants={cardVariants}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00794c]/40 hover:shadow-[0_28px_60px_-30px_rgba(0,121,76,0.4)] sm:p-8"
                >
                  <span
                    aria-hidden
                    className="brand-stripe absolute inset-x-0 top-0 h-[2px] opacity-70"
                  />
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] font-semibold tracking-[0.16em] text-[#f58220]">
                      {method.index}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00794c]/10">
                      <Icon className="h-5 w-5 text-[#00794c]" />
                    </span>
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: "#16181c" }}
                      >
                        {method.title}
                      </h3>
                      <span className="text-xs font-medium text-[#00794c]">
                        {method.badge}
                      </span>
                    </div>
                  </div>
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "rgba(20,24,28,0.7)" }}
                  >
                    {method.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {method.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[13px] leading-snug"
                        style={{ color: "rgba(20,24,28,0.72)" }}
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00794c]"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 3. Capabilities — dark band (see DESIGN.md §2) ===== */}
      <section
        id="capabilities"
        className="apple-section-dark px-6 py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div className="lg:col-span-5" {...revealProps}>
            <motion.span
              variants={cardVariants}
              className="eyebrow-mono mb-4 inline-flex items-center gap-2.5"
              style={{ color: "#3ab27f" }}
            >
              <span
                aria-hidden
                className="brand-stripe inline-block h-3 w-6 rounded-[2px]"
              />
              {t("capabilities.eyebrow")}
            </motion.span>
            <motion.h2
              variants={cardVariants}
              className="apple-headline mb-5 text-3xl sm:text-4xl md:text-[42px] text-white"
            >
              {t("capabilities.title")}
            </motion.h2>
            <motion.div variants={cardVariants} className="mt-2">
              <a
                href={CHESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-btn-accent inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {t("hero.openChess")}
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7"
            {...revealProps}
          >
            {capabilities.map((cap, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Sparkles;
              return (
                <motion.div
                  key={cap.title}
                  variants={cardVariants}
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ab27f]/14">
                    <Icon className="h-5 w-5 text-[#3ab27f]" />
                  </div>
                  <h4 className="mb-2 text-lg font-semibold text-white">
                    {cap.title}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}
                  >
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. Conversion CTA band ===== */}
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
            {t("cta.lead")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CHESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-btn-accent inline-flex items-center gap-1.5 text-sm font-medium"
            >
              {t("cta.action")}
              <ChevronRight className="h-4 w-4" />
            </a>
            <ContactDialog>
              <button
                type="button"
                className="apple-pill inline-flex cursor-pointer items-center gap-1 text-sm font-normal"
                style={{ color: "#00794c", borderColor: "#00794c" }}
              >
                {t("cta.contact")}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </ContactDialog>
          </div>
        </div>
      </section>

      <Footer showContactId />
    </div>
  );
}
