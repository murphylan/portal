"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, Swords, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHESS_URL, SIGN_URL, WORKSYNC_URL } from "@/lib/product-urls";
import ContactDialog from "./contact-dialog";
import Footer from "./footer";

export default function ProductHub() {
  return (
    <main className="min-h-screen flex flex-col bg-linear-to-b from-background to-muted/30">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            Murphy 云
          </Link>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              WorkSync
            </Link>
            <ContactDialog>
              <Button size="sm" variant="outline">
                联系我们
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
            产品总览
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Murphy 云旗下三款
            SaaS：文档协作、Rally 活动互动、象棋 AI
            辅助。点击即可访问线上环境。
          </p>
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
                    主力产品
                  </p>
                  <h2 className="text-xl font-bold mb-2">WorkSync</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    项目文档与协作：知识库、任务看板、PlantUML、白板与数据统计，团队与客户在同一空间对齐交付。适合产研与交付团队，支持云端订阅或按项目私有化部署。
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-center min-h-0 py-3">
                  <div className="rounded-lg border border-violet-100 bg-violet-50/70 dark:border-violet-900/50 dark:bg-violet-950/40 px-3 py-2.5">
                    <p className="text-[11px] font-medium text-violet-700 dark:text-violet-300 mb-1.5 uppercase tracking-wide">
                      核心能力
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1.5 leading-snug">
                      <li>知识沉淀：树形目录 + Markdown，权限可调、可追溯</li>
                      <li>交付跟踪：看板 / 列表、分配与状态，与大屏统计</li>
                      <li>研发协同：PlantUML 与白板，评审与方案对齐</li>
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
                      打开 WorkSync
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/">查看介绍</Link>
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
                    Rally 活动互动平台
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 min-h-0">
                    签到、投票、抽奖、表单一站式覆盖；扫码即用零门槛，大屏秒级同步，3
                    分钟创建活动。
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
                        打开线上产品
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/products/activity">功能介绍</Link>
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
                    小卒 — 象棋智能辅助
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 min-h-0">
                    基于顶级引擎
                    Pikafish，提供实时流式局面分析、最佳走法推荐与在线实时对弈，让每一步棋都有
                    AI 把关。
                  </p>
                  <Button size="sm" variant="secondary" className="shrink-0 mt-auto" asChild>
                    <a
                      href={CHESS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      打开象棋站点
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer showContactId />
    </main>
  );
}
