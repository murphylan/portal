"use client";

import { motion } from "framer-motion";
import {
  Apple,
  ChevronRight,
  Download,
  Smartphone,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FREE_APPS } from "@/lib/free-apps";
import ContactDialog from "./contact-dialog";
import Footer from "./footer";
import LocaleSwitcher from "./locale-switcher";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AppsNav() {
  const t = useTranslations("Apps");
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
              {common("contact")}
            </button>
          </ContactDialog>
        </div>
      </div>
    </nav>
  );
}

export default function AppsShowcase({ qr }: { qr: Record<string, string> }) {
  const t = useTranslations("Apps");
  const f = useTranslations("FreeApps");

  return (
    <div className="overflow-x-hidden">
      <AppsNav />

      {/* ===== Hero ===== */}
      <section className="apple-section-dark relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "720px",
              height: "720px",
              background:
                "radial-gradient(circle, rgba(5,150,105,0.12) 0%, transparent 70%)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[760px] relative z-10"
        >
          <h1
            className="apple-headline text-4xl sm:text-5xl md:text-[52px] mb-4"
            style={{ color: "#ffffff" }}
          >
            {t("title")}
          </h1>
          <p
            className="apple-body text-base sm:text-lg max-w-xl mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {t("lead")}
          </p>
          <div className="flex items-center justify-center gap-5 flex-wrap text-sm">
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Sparkles className="h-4 w-4 text-[#34c759]" />
              {f("tagFree")}
            </span>
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Download className="h-4 w-4 text-[#34c759]" />
              {f("tagInstall")}
            </span>
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <WifiOff className="h-4 w-4 text-[#34c759]" />
              {f("tagOffline")}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ===== App cards ===== */}
      <section className="apple-section-light py-20 md:py-28 px-6">
        <div className="max-w-[980px] mx-auto flex flex-col gap-6">
          {FREE_APPS.map((app) => {
            const coming = app.status === "coming";
            return (
              <motion.div
                key={app.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-[rgba(0,0,0,0.05)_0px_4px_24px] flex flex-col md:flex-row md:items-center gap-6 ${
                  coming ? "opacity-70" : ""
                }`}
              >
                {/* Left: identity */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                      style={{ backgroundColor: app.bg }}
                    >
                      {coming ? (
                        <span className="text-3xl" style={{ color: app.theme }}>
                          ✦
                        </span>
                      ) : (
                        // biome-ignore lint/performance/noImgElement: 自托管小图标
                        <img
                          src={app.icon}
                          alt=""
                          className="h-11 w-11 object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2
                          className="text-xl font-bold"
                          style={{ color: "#1d1d1f" }}
                        >
                          {f(`items.${app.id}.name`)}
                        </h2>
                        {coming && (
                          <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-black/50">
                            {f("comingSoon")}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm"
                        style={{ color: "rgba(0,0,0,0.5)" }}
                      >
                        {f(`items.${app.id}.tagline`)}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-sm sm:text-base mb-5"
                    style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}
                  >
                    {f(`items.${app.id}.desc`)}
                  </p>
                  {!coming && app.url && (
                    <div className="flex items-center gap-3 flex-wrap">
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium rounded-full px-5 py-2 text-white"
                        style={{ backgroundColor: app.theme }}
                      >
                        {t("open")}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </a>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(0,0,0,0.4)" }}
                      >
                        {new URL(app.url).host}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: QR for desktop → mobile install */}
                {!coming && qr[app.id] && (
                  <div className="flex flex-col items-center shrink-0 md:border-l md:border-black/5 md:pl-8">
                    {/* biome-ignore lint/performance/noImgElement: 服务端生成的二维码 data URL */}
                    <img
                      src={qr[app.id]}
                      alt={f(`items.${app.id}.name`)}
                      className="h-32 w-32 rounded-lg"
                    />
                    <p
                      className="text-xs mt-2 max-w-[160px] text-center"
                      style={{ color: "rgba(0,0,0,0.45)" }}
                    >
                      {t("scanHint")}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== Install guide ===== */}
      <section className="apple-section-light pb-24 px-6">
        <motion.div
          className="max-w-[980px] mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="apple-headline text-2xl sm:text-3xl text-center mb-3"
            style={{ color: "#1d1d1f" }}
          >
            {t("installTitle")}
          </h2>
          <p
            className="apple-body text-sm text-center max-w-xl mx-auto mb-10"
            style={{ color: "rgba(0,0,0,0.56)" }}
          >
            {t("installLead")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-[rgba(0,0,0,0.04)_0px_2px_12px]">
              <Apple className="h-6 w-6 text-[#1d1d1f] mb-3" />
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "#1d1d1f" }}
              >
                {t("iosTitle")}
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}
              >
                {t("iosSteps")}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[rgba(0,0,0,0.04)_0px_2px_12px]">
              <Smartphone className="h-6 w-6 text-[#059669] mb-3" />
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "#1d1d1f" }}
              >
                {t("androidTitle")}
              </h3>
              <p
                className="text-sm"
                style={{ color: "rgba(0,0,0,0.65)", lineHeight: 1.6 }}
              >
                {t("androidSteps")}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer showContactId />
    </div>
  );
}
