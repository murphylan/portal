"use client";

// ---------------------------------------------------------------------------
// DPP tool hub — the eight tools from the lead-engine strategy (§5.1). Tools
// are the highest-converting content format in that doc, so this page exists
// before the tool app ships: the tools are still being built, so every CTA
// books a session with us instead of linking into a 404. When the app deploys,
// swap the ContactDialog buttons back to <a href={dppToolUrl(tool.id)}> — see
// lib/dpp-tools.ts. Card widths are deliberately uneven (DESIGN.md §5).
// ---------------------------------------------------------------------------

import { motion } from "framer-motion";
import {
  BatteryCharging,
  Boxes,
  Braces,
  ChevronRight,
  ClipboardCheck,
  FileCode2,
  Info,
  ListChecks,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DPP_TOOL_GROUPS } from "@/lib/dpp-tools";
import ContactDialog from "../contact-dialog";
import Footer from "../footer";
import { DppNav } from "./dpp-showcase";

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

// Keyed by tool id so reordering lib/dpp-tools.ts can't desync the icons
const TOOL_ICONS: Record<string, typeof Braces> = {
  "readiness-assessment": ClipboardCheck,
  "espr-checklist": ListChecks,
  "battery-checklist": BatteryCharging,
  "passport-validator": ShieldCheck,
  "json-validator": Braces,
  "qr-generator": QrCode,
  "template-generator": FileCode2,
  "aas-explorer": Boxes,
};

export default function DppTools() {
  const t = useTranslations("Dpp.tools");

  return (
    <div className="min-h-[100dvh] bg-[#f6f7f6]">
      <DppNav base="/dpp" />

      {/* ===== Hero ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden px-6 pt-28 pb-12 lg:pt-32">
        <div
          aria-hidden
          className="orb orb-a -top-32 right-[-8%] h-[520px] w-[520px]"
          style={{
            background:
              "radial-gradient(circle, rgba(0,121,76,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="orb orb-c bottom-[-20%] left-[6%] h-[320px] w-[320px]"
          style={{
            background:
              "radial-gradient(circle, rgba(245,130,32,0.08) 0%, transparent 72%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span
              className="eyebrow-mono mb-4 inline-flex items-center gap-2.5"
              style={{ color: "#00794c" }}
            >
              <span
                aria-hidden
                className="brand-stripe inline-block h-3 w-6 rounded-[2px]"
              />
              {t("eyebrow")}
            </span>
            <h1
              className="apple-headline text-4xl sm:text-5xl md:text-[56px]"
              style={{ color: "#16181c" }}
            >
              {t("title")}
            </h1>
            <p
              className="apple-body mt-5 max-w-[52ch] text-base"
              style={{ color: "rgba(20,24,28,0.6)" }}
            >
              {t("lead")}
            </p>

            {/* Rollout notice — the tools are still shipping, so say so here
                once instead of stamping every card with a "coming soon" chip */}
            <p
              className="mt-6 flex max-w-[60ch] items-start gap-3 rounded-2xl border border-[rgba(245,130,32,0.28)] bg-[rgba(245,130,32,0.06)] px-4 py-3 text-[13px]"
              style={{ color: "rgba(20,24,28,0.68)", lineHeight: 1.6 }}
            >
              <Info
                aria-hidden
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: "#f58220" }}
              />
              {t("notice")}
            </p>
          </div>

          <div className="lg:col-span-5 lg:text-right">
            <Link
              href="/dpp"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#00794c]"
            >
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              {t("backToDpp")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Tool groups ===== */}
      {DPP_TOOL_GROUPS.map((group, gi) => (
        <section
          key={group.id}
          className="apple-section-light border-t border-[rgba(20,24,28,0.06)] px-6 py-14 md:py-20"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h2
                className="text-2xl font-semibold sm:text-3xl"
                style={{ color: "#16181c", letterSpacing: "-0.02em" }}
              >
                {t(`groups.${group.id}.label`)}
              </h2>
              <span
                className="font-mono text-xs"
                style={{ color: "rgba(20,24,28,0.4)" }}
              >
                {String(group.tools.length).padStart(2, "0")}
              </span>
            </div>
            <p
              className="apple-body mt-2.5 max-w-[60ch] text-sm"
              style={{ color: "rgba(20,24,28,0.58)" }}
            >
              {t(`groups.${group.id}.note`)}
            </p>

            <motion.div
              className="mt-9 grid gap-5 lg:grid-cols-12"
              {...revealProps}
            >
              {group.tools.map((tool) => {
                const Icon = TOOL_ICONS[tool.id];
                // The lead tool gets the dark surface — it is the free
                // assessment that the whole service ladder starts from.
                return tool.lead ? (
                  <motion.article
                    key={tool.id}
                    variants={cardVariants}
                    className={`relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0e1012] p-7 ${tool.span}`}
                  >
                    <span
                      aria-hidden
                      className="brand-stripe absolute inset-x-0 top-0 h-[3px]"
                    />
                    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ab27f]/12">
                      <Icon className="h-5 w-5 text-[#3ab27f]" />
                    </span>
                    <span className="eyebrow-mono text-[0.65rem] text-[#3ab27f]">
                      {t(`items.${tool.id}.tag`)}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {t(`items.${tool.id}.title`)}
                    </h3>
                    <p
                      className="mt-2.5 max-w-[52ch] text-sm"
                      style={{
                        color: "rgba(255,255,255,0.62)",
                        lineHeight: 1.6,
                      }}
                    >
                      {t(`items.${tool.id}.desc`)}
                    </p>
                    <div className="mt-auto pt-6">
                      <ContactDialog>
                        <button
                          type="button"
                          className="apple-btn-accent inline-flex cursor-pointer items-center gap-1.5 text-sm"
                        >
                          {t("request")}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </ContactDialog>
                    </div>
                  </motion.article>
                ) : (
                  <motion.article
                    key={tool.id}
                    variants={cardVariants}
                    className={`flex flex-col rounded-3xl border border-[rgba(20,24,28,0.08)] bg-white p-7 shadow-[0_2px_16px_rgba(20,24,28,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00794c]/40 ${tool.span}`}
                  >
                    <span
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        background:
                          gi === 0
                            ? "rgba(245,130,32,0.12)"
                            : "rgba(0,121,76,0.1)",
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: gi === 0 ? "#f58220" : "#00794c" }}
                      />
                    </span>
                    <span
                      className="eyebrow-mono text-[0.65rem]"
                      style={{ color: "rgba(20,24,28,0.4)" }}
                    >
                      {t(`items.${tool.id}.tag`)}
                    </span>
                    <h3
                      className="mt-2 text-base font-semibold"
                      style={{ color: "#16181c" }}
                    >
                      {t(`items.${tool.id}.title`)}
                    </h3>
                    <p
                      className="mt-2.5 text-[13px]"
                      style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.6 }}
                    >
                      {t(`items.${tool.id}.desc`)}
                    </p>
                    <div className="mt-auto pt-6">
                      <ContactDialog>
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-[#00794c]"
                        >
                          {t("request")}
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </ContactDialog>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>
      ))}

      {/* ===== Conversion CTA — the tool answers "where", we deliver "how" ===== */}
      <section className="apple-section-dark relative overflow-hidden px-6 py-20 md:py-24">
        <div className="relative z-10 mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <span className="eyebrow-mono mb-4 inline-flex items-center gap-2.5 text-[#3ab27f]">
              <span
                aria-hidden
                className="brand-stripe inline-block h-3 w-6 rounded-[2px]"
              />
              {t("cta.eyebrow")}
            </span>
            <h2 className="apple-headline text-3xl text-white sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p
              className="apple-body mt-4 max-w-[56ch] text-sm sm:text-base"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {t("cta.description")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
            <ContactDialog>
              <button
                type="button"
                className="apple-btn-accent cursor-pointer text-sm"
              >
                {t("cta.button")}
              </button>
            </ContactDialog>
            <Link
              href="/dpp#path"
              className="apple-pill text-sm text-white/80 transition-colors hover:text-white"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </section>

      <Footer showContactId />
    </div>
  );
}
