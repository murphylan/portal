"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download, Sparkles, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FREE_APPS } from "@/lib/free-apps";

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

export default function FreeAppsSection() {
  const t = useTranslations("FreeApps");

  return (
    <section id="apps" className="apple-section-light py-24 md:py-32 px-6">
      <motion.div
        className="max-w-[980px] mx-auto text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <span className="inline-block mb-4 rounded-full bg-[#059669]/10 px-4 py-1 text-sm font-medium text-[#059669]">
          {t("badge")}
        </span>
        <h2
          className="apple-headline text-3xl sm:text-4xl md:text-[40px] mb-4"
          style={{ color: "#1d1d1f" }}
        >
          {t("title")}
        </h2>
        <p
          className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-6"
          style={{ color: "rgba(0,0,0,0.56)" }}
        >
          {t("lead")}
        </p>
        {/* PWA 价值标签 */}
        <div className="flex items-center justify-center gap-5 flex-wrap mb-16 text-sm">
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: "rgba(0,0,0,0.6)" }}
          >
            <Sparkles className="h-4 w-4 text-[#059669]" />
            {t("tagFree")}
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: "rgba(0,0,0,0.6)" }}
          >
            <Download className="h-4 w-4 text-[#059669]" />
            {t("tagInstall")}
          </span>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: "rgba(0,0,0,0.6)" }}
          >
            <WifiOff className="h-4 w-4 text-[#059669]" />
            {t("tagOffline")}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {FREE_APPS.map((app) => {
          const coming = app.status === "coming";
          const inner = (
            <>
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center mb-4 shrink-0 overflow-hidden"
                style={{ backgroundColor: app.bg }}
              >
                {coming ? (
                  <span className="text-2xl" style={{ color: app.theme }}>
                    ✦
                  </span>
                ) : (
                  // biome-ignore lint/performance/noImgElement: 自托管小图标，无需 next/image 优化
                  <img
                    src={app.icon}
                    alt=""
                    className="h-10 w-10 object-contain"
                  />
                )}
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#1d1d1f" }}
                >
                  {t(`items.${app.id}.name`)}
                </h3>
                {coming && (
                  <span className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-black/50">
                    {t("comingSoon")}
                  </span>
                )}
              </div>
              <p
                className="text-sm flex-1"
                style={{ color: "rgba(0,0,0,0.6)", lineHeight: 1.5 }}
              >
                {t(`items.${app.id}.desc`)}
              </p>
              {!coming && (
                <span
                  className="inline-flex items-center gap-1 text-sm font-medium mt-4"
                  style={{ color: app.theme }}
                >
                  {t("open")}
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              )}
            </>
          );

          const cardClass =
            "bg-white rounded-2xl p-6 flex flex-col h-full shadow-[rgba(0,0,0,0.04)_0px_2px_12px] transition-transform";

          return (
            <motion.div key={app.id} variants={cardVariants}>
              {coming || !app.url ? (
                <div className={`${cardClass} opacity-70`}>{inner}</div>
              ) : (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} hover:scale-[1.02]`}
                >
                  {inner}
                </a>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="max-w-[980px] mx-auto text-center mt-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link
          href="/apps"
          className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
          style={{ color: "#047857", borderColor: "#047857" }}
        >
          {t("viewAll")}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </section>
  );
}
