"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  LayoutDashboard,
  ShoppingCart,
  Swords,
  Ticket,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import LocaleSwitcher from "./locale-switcher";

export default function ProductHub() {
  const t = useTranslations("ProductHub");
  const common = useTranslations("Common");
  const capabilities = t.raw("worksyncCapabilities") as string[];
  const pricingLabel = t("pricingLabel");

  return (
    <main className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            {common("brand")}
          </Link>
          <nav className="flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              href="/worksync"
              className="hover:text-foreground transition-colors"
            >
              WorkSync
            </Link>
            <LocaleSwitcher className="text-muted-foreground" />
            <ContactDialog>
              <Button size="sm" variant="outline">
                {common("contact")}
              </Button>
            </ContactDialog>
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {t("title")}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("lead")}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-stretch gap-6">
          <motion.div
            className="flex flex-1 flex-col min-h-0 lg:basis-[58%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <Card className="h-full border-2 border-violet-200 dark:border-violet-900 shadow-lg shadow-violet-500/10 flex flex-col">
              <CardContent className="p-6 flex flex-col h-full min-h-0 flex-1">
                <div className="shrink-0">
                  <div className="h-10 w-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4">
                    <LayoutDashboard className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-violet-600 dark:text-violet-400 mb-1">
                    {t("flagship")}
                  </p>
                  <h2 className="text-xl font-bold mb-2">WorkSync</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("worksyncDescription")}
                  </p>
                  <p className="mt-3 rounded-lg bg-violet-50 px-3 py-2 text-xs font-medium leading-relaxed text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                    {pricingLabel}: {t("pricing.worksync")}
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-center min-h-0 py-3">
                  <div className="rounded-lg border border-violet-100 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/40 px-3 py-2.5">
                    <p className="text-[11px] font-medium text-violet-700 dark:text-violet-300 mb-1.5 uppercase tracking-wide">
                      {t("capabilities")}
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1.5 leading-snug">
                      {capabilities.map((capability) => (
                        <li key={capability}>{capability}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0 pt-1">
                  <Button
                    className="bg-linear-to-r from-violet-600 to-indigo-600 text-white"
                    asChild
                  >
                    <a
                      href={WORKSYNC_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("openWorksync")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/worksync">{t("viewIntro")}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex flex-1 flex-col gap-6 min-h-0 lg:basis-[42%]">
            <motion.div
              className="flex-1 flex flex-col min-h-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              <Card className="h-full min-h-0 flex flex-col border-emerald-200/80 dark:border-emerald-900/60">
                <CardContent className="p-6 flex flex-col h-full min-h-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                    <Ticket className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {t("signTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 min-h-0">
                    {t("signDescription")}
                  </p>
                  <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium leading-relaxed text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    {pricingLabel}: {t("pricing.sign")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0 mt-auto">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      asChild
                    >
                      <a
                        href={SIGN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("openProduct")}
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/products/activity">
                        {t("activityIntro")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="flex-1 flex flex-col min-h-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
            >
              <Card className="h-full min-h-0 flex flex-col border-amber-200/80 dark:border-amber-900/60">
                <CardContent className="p-6 flex flex-col h-full min-h-0 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                    <Swords className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {t("chessTitle")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 min-h-0">
                    {t("chessDescription")}
                  </p>
                  <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium leading-relaxed text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                    {pricingLabel}: {t("pricing.chess")}
                  </p>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="shrink-0 mt-auto"
                    asChild
                  >
                    <a
                      href={CHESS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("openChess")}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <Card className="h-full flex flex-col border-rose-200/80 dark:border-rose-900/60">
              <CardContent className="p-6 flex flex-col h-full flex-1">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-rose-500 to-pink-600 flex items-center justify-center mb-4">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {t("shoppingTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {t("shoppingDescription")}
                </p>
                <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium leading-relaxed text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
                  {pricingLabel}: {t("pricing.shopping")}
                </p>
                <Button
                  size="sm"
                  className="bg-rose-600 hover:bg-rose-700 text-white shrink-0 mt-auto"
                  asChild
                >
                  <a
                    href={SHOPPING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("openShopping")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <Card className="h-full flex flex-col border-cyan-200/80 dark:border-cyan-900/60">
              <CardContent className="p-6 flex flex-col h-full flex-1">
                <div className="h-10 w-10 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                  <CalendarClock className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  {t("timeslotTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {t("timeslotDescription")}
                </p>
                <p className="mb-4 rounded-lg bg-cyan-50 px-3 py-2 text-xs font-medium leading-relaxed text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">
                  {pricingLabel}: {t("pricing.timeslot")}
                </p>
                <Button
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white shrink-0 mt-auto"
                  asChild
                >
                  <a
                    href={TIMESLOT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("bookCourse")}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer showContactId />
    </main>
  );
}
