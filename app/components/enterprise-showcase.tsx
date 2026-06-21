"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  Container,
  Database,
  FileDown,
  Infinity as InfinityIcon,
  Lock,
  ShieldCheck,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactDialog from "./contact-dialog";
import Footer from "./footer";
import LocaleSwitcher from "./locale-switcher";

// ---------------------------------------------------------------------------
// Data (icons here, copy comes from i18n)
// ---------------------------------------------------------------------------

const VALUE_ICONS = [Database, InfinityIcon, ShieldCheck, Wrench];
const DELIVERY_ICONS = [TerminalSquare, Container, Lock];

// Pricing tier visual config; copy (name/detail/features) comes from i18n.
const PRICING_TIERS = [
  { key: "online", price: "¥199", highlighted: false },
  { key: "intranet", price: "¥1,999", highlighted: true },
  { key: "source", price: "¥19,999", highlighted: false },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

function EnterpriseNav() {
  const t = useTranslations("Enterprise");
  const common = useTranslations("Common");

  return (
    <nav className="apple-nav fixed top-0 left-0 right-0 z-50 h-12 flex items-center">
      <div className="max-w-[980px] mx-auto w-full px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-white/90 text-lg font-medium tracking-tight hover:text-white transition-colors"
        >
          {common("brand")}
        </Link>

        <div className="flex items-center gap-4">
          <LocaleSwitcher className="hidden sm:inline-flex text-white/70" />
          <Link
            href="/products"
            className="text-white/70 text-base hover:text-white transition-colors hidden sm:inline"
          >
            {common("productOverview")}
          </Link>
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-accent text-base py-1! px-3! cursor-pointer"
            >
              {t("nav.quote")}
            </button>
          </ContactDialog>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function EnterpriseShowcase() {
  const t = useTranslations("Enterprise");

  const valueCopy = t.raw("values") as Array<{ title: string; desc: string }>;
  const deliveryCopy = t.raw("delivery.items") as Array<{
    title: string;
    desc: string;
  }>;
  const tierCopy = t.raw("tiers") as Record<
    string,
    { name: string; period: string; detail: string; features: string[] }
  >;

  const values = valueCopy.map((copy, i) => ({
    Icon: VALUE_ICONS[i],
    ...copy,
  }));
  const deliveries = deliveryCopy.map((copy, i) => ({
    Icon: DELIVERY_ICONS[i],
    ...copy,
  }));

  return (
    <div className="overflow-x-hidden">
      <EnterpriseNav />

      {/* ===== Hero ===== */}
      <section className="apple-section-dark relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "800px",
              height: "800px",
              background:
                "radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[820px] relative z-10"
        >
          <span className="inline-block mb-5 rounded-full border border-white/20 px-4 py-1 text-sm text-white/70">
            {t("hero.badge")}
          </span>
          <h1
            className="apple-headline text-4xl sm:text-5xl md:text-[56px] mb-4"
            style={{ color: "#ffffff" }}
          >
            {t("hero.title")}
          </h1>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-4"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            {t("hero.subtitle")}
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {t("hero.description")}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <ContactDialog>
              <button
                type="button"
                className="apple-btn-accent inline-flex items-center gap-1 text-sm font-normal cursor-pointer"
              >
                <FileDown className="h-3.5 w-3.5" />
                {t("hero.quote")}
              </button>
            </ContactDialog>
            <a
              href="#pricing"
              className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
              style={{ color: "#ffffff", borderColor: "#ffffff" }}
            >
              {t("hero.viewPricing")}
              <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== Value props ===== */}
      <section className="apple-section-light py-24 md:py-32 px-6">
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="apple-headline text-3xl sm:text-4xl md:text-[40px] mb-4"
            style={{ color: "#1d1d1f" }}
          >
            {t("values_title")}
          </h2>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-16"
            style={{ color: "rgba(0,0,0,0.56)" }}
          >
            {t("values_lead")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {values.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="bg-white rounded-lg p-6 shadow-[rgba(0,0,0,0.04)_0px_2px_12px]"
            >
              <Icon className="h-6 w-6 text-[#059669] mb-3" />
              <h4
                className="text-lg font-semibold mb-2"
                style={{
                  color: "#1d1d1f",
                  letterSpacing: "0.196px",
                  lineHeight: 1.14,
                }}
              >
                {title}
              </h4>
              <p
                className="text-sm"
                style={{ color: "rgba(0,0,0,0.8)", lineHeight: 1.47 }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="apple-section-dark py-24 md:py-32 px-6">
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="apple-headline text-3xl sm:text-4xl md:text-[40px] text-white mb-4">
            {t("pricing.title")}
          </h2>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-16"
            style={{ color: "rgba(255,255,255,0.56)" }}
          >
            {t("pricing.lead")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PRICING_TIERS.map((tier) => {
            const copy = tierCopy[tier.key];
            return (
              <motion.div
                key={tier.key}
                variants={cardVariants}
                className={`apple-card-dark relative p-8 ${
                  tier.highlighted ? "ring-2 ring-[#34c759]" : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#059669] text-white text-xs font-medium">
                    {t("pricing.recommended")}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white mb-2">
                  {copy.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {tier.price}
                  </span>
                  {copy.period && (
                    <span style={{ color: "rgba(255,255,255,0.5)" }}>
                      {copy.period}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm mb-6"
                  style={{ color: "rgba(255,255,255,0.56)" }}
                >
                  {copy.detail}
                </p>
                <ul className="space-y-3 mb-8">
                  {copy.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#34c759] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ContactDialog>
                  <button
                    type="button"
                    className={`w-full inline-flex items-center justify-center gap-1 text-sm font-normal cursor-pointer ${
                      tier.highlighted ? "apple-btn-accent" : "apple-pill"
                    }`}
                    style={
                      tier.highlighted
                        ? undefined
                        : { color: "#ffffff", borderColor: "#ffffff" }
                    }
                  >
                    {t("pricing.cta")}
                  </button>
                </ContactDialog>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-center text-xs mt-8"
          style={{ color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t("pricing.note")}
        </motion.p>
      </section>

      {/* ===== Delivery capability (trust) ===== */}
      <section className="apple-section-light py-24 md:py-32 px-6">
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="apple-headline text-3xl sm:text-4xl md:text-[40px] mb-4"
            style={{ color: "#1d1d1f" }}
          >
            {t("delivery.title")}
          </h2>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-16"
            style={{ color: "rgba(0,0,0,0.56)" }}
          >
            {t("delivery.lead")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {deliveries.map(({ Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="bg-white rounded-lg p-6 shadow-[rgba(0,0,0,0.04)_0px_2px_12px]"
            >
              <Icon className="h-6 w-6 text-[#059669] mb-3" />
              <h4
                className="text-lg font-semibold mb-2"
                style={{
                  color: "#1d1d1f",
                  letterSpacing: "0.196px",
                  lineHeight: 1.14,
                }}
              >
                {title}
              </h4>
              <p
                className="text-sm"
                style={{ color: "rgba(0,0,0,0.8)", lineHeight: 1.47 }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto text-center mt-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-accent inline-flex items-center gap-1 text-sm font-normal cursor-pointer"
            >
              <FileDown className="h-3.5 w-3.5" />
              {t("hero.quote")}
            </button>
          </ContactDialog>
        </motion.div>
      </section>

      <Footer showContactId />
    </div>
  );
}
