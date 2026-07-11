"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarClock,
  ChevronRight,
  Cloud,
  FileText,
  Gift,
  Kanban,
  ListChecks,
  Lock,
  MonitorPlay,
  Palette,
  QrCode,
  Server,
  Shapes,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Swords,
  Tag,
  Ticket,
  Users,
  Vote,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  CHESS_URL,
  SHOPPING_URL,
  SIGN_URL,
  TIMESLOT_URL,
  WORKSYNC_URL,
} from "@/lib/product-urls";
import ContactDialog from "./contact-dialog";
import Footer from "./footer";
import FreeAppsSection from "./free-apps-section";
import LocaleSwitcher from "./locale-switcher";
import ProductArt from "./product-art";

// ---------------------------------------------------------------------------
// Feature icon data — copy is merged in from i18n (see withCopy below)
// ---------------------------------------------------------------------------

const WORKSYNC_FEATURES = [
  { Icon: FileText },
  { Icon: Kanban },
  { Icon: Shapes },
  { Icon: Sparkles },
  { Icon: Palette },
  { Icon: Lock },
];
const SIGN_FEATURES = [
  { Icon: QrCode },
  { Icon: Vote },
  { Icon: Gift },
  { Icon: ListChecks },
];
const SHOPPING_FEATURES = [
  { Icon: ShoppingCart },
  { Icon: Tag },
  { Icon: Users },
  { Icon: Smartphone },
];
const TIMESLOT_FEATURES = [
  { Icon: CalendarClock },
  { Icon: BookOpen },
  { Icon: Star },
  { Icon: Smartphone },
];
const ADVANTAGES = [{ Icon: Cloud }, { Icon: Server }, { Icon: MonitorPlay }];

// ---------------------------------------------------------------------------
// Motion presets (see DESIGN.md §6)
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
// Scroll-aware navigation (hide on scroll-down)
// ---------------------------------------------------------------------------

function AppleNav() {
  const t = useTranslations("Home.nav");
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
            href="#suite"
            className="text-[#5b6167] text-sm hover:text-[#16181c] transition-colors hidden sm:inline"
          >
            {t("products")}
          </a>
          <a
            href="#apps"
            className="text-[#5b6167] text-sm hover:text-[#16181c] transition-colors hidden sm:inline"
          >
            {t("apps")}
          </a>
          <Link
            href="/enterprise"
            className="text-[#5b6167] text-sm hover:text-[#16181c] transition-colors hidden sm:inline"
          >
            {t("enterprise")}
          </Link>
          <LocaleSwitcher className="hidden sm:inline-flex text-[#5b6167]" />
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-accent text-sm py-1! px-3! cursor-pointer"
            >
              {t("contact")}
            </button>
          </ContactDialog>
        </div>
      </div>
    </motion.nav>
  );
}

// ---------------------------------------------------------------------------
// Section heading — eyebrow + brand stripe + title + lead (left-aligned)
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
// Suite card — a product tile in the bento grid
// ---------------------------------------------------------------------------

type IconType = React.ComponentType<{
  className?: string;
  style?: React.CSSProperties;
}>;
type Feature = { Icon: IconType; title: string; desc: string };

function SuiteCard({
  id,
  index,
  Icon,
  name,
  subtitle,
  tags,
  href,
  ctaLabel,
  tone = "light",
  banner = false,
  features,
}: {
  id: string;
  index: string;
  Icon: IconType;
  name: string;
  subtitle: string;
  tags: string;
  href: string;
  ctaLabel: string;
  tone?: "light" | "dark";
  banner?: boolean;
  features?: Feature[];
}) {
  const dark = tone === "dark";
  const external = href.startsWith("http");

  const shell = dark
    ? "border border-white/10 bg-[#0e1012] hover:border-[#3ab27f]/50 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.7)]"
    : "border border-[rgba(20,24,28,0.08)] bg-white shadow-[0_2px_16px_rgba(20,24,28,0.05)] hover:border-[#00794c]/40 hover:shadow-[0_28px_60px_-30px_rgba(0,121,76,0.4)]";

  const nameColor = dark ? "#ffffff" : "#16181c";
  const subColor = dark ? "rgba(255,255,255,0.86)" : "#16181c";
  const tagColor = dark ? "rgba(255,255,255,0.55)" : "rgba(20,24,28,0.55)";
  const accent = dark ? "#3ab27f" : "#00794c";

  const mediaBg = dark
    ? "radial-gradient(125% 120% at 28% 12%, #17513c 0%, #0d3126 52%, #071d16 100%)"
    : "radial-gradient(125% 120% at 28% 12%, #ecfbf3 0%, #dcf2e6 55%, #cfeddd 100%)";

  const media = (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${
        banner ? "sm:w-[46%] p-6" : "p-6"
      }`}
      style={{ background: mediaBg }}
    >
      <span
        aria-hidden
        className="brand-stripe absolute inset-x-0 top-0 h-[2px] opacity-70"
      />
      <div className="w-full max-w-[300px] transition-transform duration-500 group-hover:scale-[1.03]">
        <ProductArt id={id} tone={tone} />
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#f58220]">
          {index}
        </span>
        <Icon className="h-[18px] w-[18px]" style={{ color: accent }} />
        <h3 className="text-lg font-semibold" style={{ color: nameColor }}>
          {name}
        </h3>
        <ArrowRight
          className="ml-auto h-4 w-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          style={{ color: accent }}
        />
      </div>
      <p
        className="text-sm font-medium leading-snug"
        style={{ color: subColor }}
      >
        {subtitle}
      </p>
      {features ? (
        <div className="mt-1 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-2">
              <f.Icon
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: accent }}
              />
              <span
                className="text-[13px] leading-snug"
                style={{
                  color: dark ? "rgba(255,255,255,0.7)" : "rgba(20,24,28,0.7)",
                }}
              >
                {f.title}
              </span>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-1 flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1 text-sm font-medium"
          style={{ color: accent }}
        >
          {ctaLabel}
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
        <span className="text-xs" style={{ color: tagColor }}>
          {tags}
        </span>
      </div>
    </div>
  );

  return (
    <motion.a
      variants={cardVariants}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl text-left transition-all duration-300 hover:-translate-y-1 ${shell} ${
        banner ? "sm:flex-row sm:items-stretch" : ""
      }`}
    >
      {media}
      {body}
    </motion.a>
  );
}

// ---------------------------------------------------------------------------
// Enterprise capability card
// ---------------------------------------------------------------------------

function CapabilityCard({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#3ab27f]/14">
        <Icon className="h-5 w-5 text-[#3ab27f]" />
      </div>
      <h4 className="mb-2 text-lg font-semibold text-white">{title}</h4>
      <p
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.62)", lineHeight: 1.5 }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AppleShowcase() {
  const t = useTranslations("Home");
  const common = useTranslations("Common");
  const fa = useTranslations("FreeApps");
  const featureCopy = t.raw("features") as Record<
    string,
    Array<{ title: string; desc: string }>
  >;
  const withCopy = (
    iconItems: Array<{ Icon: React.ComponentType<{ className?: string }> }>,
    key: string,
  ) => featureCopy[key].map((copy, i) => ({ ...iconItems[i], ...copy }));

  const worksyncFeatures = withCopy(WORKSYNC_FEATURES, "worksync");
  const signFeatures = withCopy(SIGN_FEATURES, "sign");
  const shoppingFeatures = withCopy(SHOPPING_FEATURES, "shopping");
  const timeslotFeatures = withCopy(TIMESLOT_FEATURES, "timeslot");
  const advantages = withCopy(ADVANTAGES, "advantages");

  const trust = t.raw("trust") as Array<{ value: string; label: string }>;

  // Product suite — asymmetric bento (no equal 3-across rows, see DESIGN.md §5)
  const heroTiles = [
    { id: "worksync", Icon: FileText, name: "WorkSync", key: "worksync" },
    {
      id: "xiaozu",
      Icon: Swords,
      name: t("sections.xiaozu.title"),
      key: "xiaozu",
    },
    { id: "sign", Icon: Ticket, name: "Sign", key: "sign" },
    {
      id: "shopping",
      Icon: ShoppingCart,
      name: t("sections.shopping.title"),
      key: "shopping",
    },
    { id: "timeslot", Icon: CalendarClock, name: "TimeSlot", key: "timeslot" },
  ];

  return (
    <div className="overflow-x-hidden">
      <AppleNav />

      {/* ===== 1. Hero — asymmetric, compact (see DESIGN.md §5) ===== */}
      <section className="paper-dots apple-section-light relative overflow-hidden px-6 pt-28 pb-14 lg:pt-32">
        {/* Ambient brand orbs — slow tri-color drift enlivens the paper canvas */}
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
        {/* faint warm accent so the wash isn't monochrome — kept small */}
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
            className="lg:col-span-5"
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
              {common("brand")}
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
              {t("hero.subtitle")}
            </p>
            <p
              className="apple-body mb-8 max-w-[46ch] text-[15px] sm:text-base"
              style={{ color: "rgba(20,24,28,0.6)" }}
            >
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#suite"
                className="apple-btn-accent inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {t("hero.explore")}
                <ChevronRight className="h-4 w-4" />
              </a>
              <Link
                href="/enterprise"
                className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
                style={{ color: "#00794c", borderColor: "#00794c" }}
              >
                {t("hero.enterprise")}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Inline trust strip — tri-color left borders, compact */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {trust.map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-l-2 pl-3"
                  style={{
                    borderColor: ["#00925c", "#f58220", "#e11b22", "#00925c"][
                      i
                    ],
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

          {/* Right — product bento preview */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {heroTiles.map((tile, i) => {
                const dark = tile.id === "xiaozu";
                return (
                  <a
                    key={tile.id}
                    href="#suite"
                    className={`group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
                      i === 0 ? "col-span-2 sm:col-span-2 sm:row-span-2" : ""
                    } ${
                      dark
                        ? "border border-white/10 bg-[#0e1012]"
                        : "border border-[rgba(20,24,28,0.08)] bg-white shadow-[0_2px_14px_rgba(20,24,28,0.05)]"
                    }`}
                  >
                    <div
                      className="relative flex flex-1 items-center justify-center p-4"
                      style={{
                        background: dark
                          ? "radial-gradient(125% 120% at 28% 12%, #17513c 0%, #0d3126 55%, #071d16 100%)"
                          : "radial-gradient(125% 120% at 28% 12%, #ecfbf3 0%, #dcf2e6 55%, #cfeddd 100%)",
                      }}
                    >
                      <span
                        aria-hidden
                        className="brand-stripe absolute inset-x-0 top-0 h-[2px] opacity-70"
                      />
                      <div
                        className={`w-full transition-transform duration-500 group-hover:scale-[1.04] ${i === 0 ? "max-w-[320px]" : "max-w-[150px]"}`}
                      >
                        <ProductArt
                          id={tile.id}
                          tone={dark ? "dark" : "light"}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2.5">
                      <tile.Icon
                        className="h-4 w-4"
                        style={{ color: dark ? "#3ab27f" : "#00794c" }}
                      />
                      <span
                        className="text-[13px] font-semibold"
                        style={{ color: dark ? "#ffffff" : "#16181c" }}
                      >
                        {tile.name}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. Product suite — bento grid ===== */}
      <section
        id="suite"
        className="paper-dots apple-section-light relative overflow-hidden px-6 py-16 md:py-24"
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
            eyebrow={common("productOverview")}
            title={t("hero.subtitle")}
            lead={t("hero.description")}
          />

          <motion.div
            className="mt-10 grid gap-5 lg:grid-cols-6"
            {...revealProps}
          >
            {/* Flagship — spans 4, with feature bullets */}
            <div className="lg:col-span-4">
              <SuiteCard
                id="worksync"
                index="01"
                Icon={FileText}
                name="WorkSync"
                subtitle={t("sections.worksync.subtitle")}
                tags={t("preview.worksync")}
                href="/worksync"
                ctaLabel={t("sections.worksync.primary")}
                features={worksyncFeatures.slice(0, 4)}
              />
            </div>
            {/* 小卒 — the single dark night-surface tile, spans 2 */}
            <div className="lg:col-span-2">
              <SuiteCard
                id="xiaozu"
                index="02"
                Icon={Swords}
                name={t("sections.xiaozu.title")}
                subtitle={t("sections.xiaozu.subtitle")}
                tags={t("preview.xiaozu")}
                href={CHESS_URL}
                ctaLabel={t("sections.xiaozu.secondary")}
                tone="dark"
              />
            </div>
            {/* Sign + 小商城 — spans 3 each */}
            <div className="lg:col-span-3">
              <SuiteCard
                id="sign"
                index="03"
                Icon={Ticket}
                name="Sign"
                subtitle={t("sections.sign.subtitle")}
                tags={t("preview.sign")}
                href={SIGN_URL}
                ctaLabel={t("sections.sign.secondary")}
                banner
                features={signFeatures.slice(0, 4)}
              />
            </div>
            <div className="lg:col-span-3">
              <SuiteCard
                id="shopping"
                index="04"
                Icon={ShoppingCart}
                name={t("sections.shopping.title")}
                subtitle={t("sections.shopping.subtitle")}
                tags={t("preview.shopping")}
                href={SHOPPING_URL}
                ctaLabel={t("sections.shopping.secondary")}
                banner
                features={shoppingFeatures.slice(0, 4)}
              />
            </div>
            {/* TimeSlot — wide banner spans 4, + free-apps teaser spans 2 */}
            <div className="lg:col-span-4">
              <SuiteCard
                id="timeslot"
                index="05"
                Icon={CalendarClock}
                name="TimeSlot"
                subtitle={t("sections.timeslot.subtitle")}
                tags={t("preview.timeslot")}
                href={TIMESLOT_URL}
                ctaLabel={t("sections.timeslot.secondary")}
                banner
                features={timeslotFeatures.slice(0, 4)}
              />
            </div>
            <motion.a
              variants={cardVariants}
              href="#apps"
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[rgba(20,24,28,0.08)] bg-[#00794c] p-7 text-left transition-all duration-300 hover:-translate-y-1 lg:col-span-2"
            >
              <span
                aria-hidden
                className="brand-stripe absolute inset-x-0 top-0 h-[3px]"
              />
              <Sparkles className="h-7 w-7 text-white/90" />
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-white">
                  {t("nav.apps")}
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  {`${fa("tagFree")} · ${fa("tagInstall")} · ${fa("tagOffline")}`}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white">
                  {common("learnMore")}
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ===== 3. Flagship deep-dive — WorkSync full capability grid ===== */}
      <section className="apple-section-light border-t border-[rgba(20,24,28,0.06)] px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={t("sections.worksync.flagship")}
              title="WorkSync"
              lead={t("sections.worksync.description")}
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/worksync"
                className="apple-btn-accent inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {t("sections.worksync.primary")}
                <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href={WORKSYNC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
                style={{ color: "#00794c", borderColor: "#00794c" }}
              >
                {t("sections.worksync.secondary")}
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-8 rounded-2xl bg-[#eef8f3] p-5">
              <div className="w-full max-w-[420px]">
                <ProductArt id="worksync" tone="light" />
              </div>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7"
            {...revealProps}
          >
            {worksyncFeatures.map((f) => (
              <motion.div
                key={f.title}
                variants={cardVariants}
                className="flex gap-3.5"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#00794c]/10">
                  <f.Icon className="h-5 w-5 text-[#00794c]" />
                </div>
                <div>
                  <h4
                    className="mb-1 text-[15px] font-semibold"
                    style={{ color: "#16181c" }}
                  >
                    {f.title}
                  </h4>
                  <p
                    className="text-[13px]"
                    style={{ color: "rgba(20,24,28,0.6)", lineHeight: 1.5 }}
                  >
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. Enterprise band — dark, high-contrast (see DESIGN.md §2) ===== */}
      <section className="apple-section-dark px-6 py-20 md:py-28">
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
              {t("nav.enterprise")}
            </motion.span>
            <motion.h2
              variants={cardVariants}
              className="apple-headline mb-5 text-3xl sm:text-4xl md:text-[42px] text-white"
            >
              {t("sections.why.title")}
            </motion.h2>
            <motion.p
              variants={cardVariants}
              className="apple-body mb-9 max-w-[44ch] text-sm sm:text-base"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {t("sections.why.description")}
            </motion.p>
            <div className="space-y-4">
              {[
                { Icon: BarChart3, label: t("sections.why.metricStack") },
                { Icon: Lock, label: t("sections.why.metricDeploy") },
                { Icon: Ticket, label: t("sections.why.metricLocale") },
              ].map(({ Icon, label }) => (
                <motion.div
                  key={label}
                  variants={cardVariants}
                  className="flex items-center gap-3 text-sm"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[#3ab27f]" />
                  <span style={{ color: "rgba(255,255,255,0.72)" }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.div variants={cardVariants} className="mt-9">
              <Link
                href="/enterprise"
                className="apple-btn-accent inline-flex items-center gap-1.5 text-sm font-medium"
              >
                {t("hero.enterprise")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7"
            {...revealProps}
          >
            {advantages.map((a, i) => (
              <div key={a.title} className={i === 0 ? "sm:col-span-2" : ""}>
                <CapabilityCard {...a} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 5. Free PWA apps ===== */}
      <FreeAppsSection />

      {/* ===== 6. Conversion CTA band ===== */}
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
            {t("hero.subtitle")}
          </h2>
          <p
            className="apple-body mx-auto mt-4 max-w-[52ch] text-sm sm:text-base"
            style={{ color: "rgba(20,24,28,0.6)" }}
          >
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <ContactDialog>
              <button
                type="button"
                className="apple-btn-accent inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium"
              >
                {common("consultNow")}
                <ChevronRight className="h-4 w-4" />
              </button>
            </ContactDialog>
            <Link
              href="/enterprise"
              className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
              style={{ color: "#00794c", borderColor: "#00794c" }}
            >
              {t("hero.enterprise")}
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 7. Footer ===== */}
      <Footer showContactId />
    </div>
  );
}
