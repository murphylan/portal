"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  FileText,
  Kanban,
  LayoutDashboard,
  Lock,
  Palette,
  Shapes,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
import Footer from "../footer";
import ContactDialog from "../contact-dialog";
import ScreenPlaceholder from "./screen-placeholder";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: "产品概览", href: "#overview" },
  { label: "核心功能", href: "#features" },
  { label: "定价", href: "#pricing" },
  { label: "联系我们", href: "#contact" },
];

const HIGHLIGHT_PILLS = [
  { icon: FileText, label: "文档集中管理", color: "text-violet-500" },
  { icon: Kanban, label: "任务看板", color: "text-sky-500" },
  { icon: Shapes, label: "PlantUML 图表", color: "text-emerald-500" },
  { icon: Palette, label: "协作白板", color: "text-amber-500" },
  { icon: BarChart3, label: "数据分析", color: "text-rose-500" },
  { icon: Lock, label: "权限管理", color: "text-indigo-500" },
];

interface FeatureSection {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  screenTitle: string;
  screenDesc: string;
  imageSrc?: string;
  gradient: string;
  iconColor: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const FEATURE_SECTIONS: FeatureSection[] = [
  {
    id: "dashboard",
    badge: "数据分析",
    title: "数据驱动决策",
    subtitle: "仪表盘总览",
    description:
      "项目全局一目了然：文档分类、任务状态、用户统计三大维度，搭配多时段活跃度分析，让团队效率看得见。",
    bullets: [
      "文档分类与任务状态实时统计",
      "用户活跃度多维分析",
      "PlantUML 与白板使用趋势",
      "团队工作量可视化",
    ],
    screenTitle: "Dashboard 仪表盘",
    screenDesc: "多维度数据统计与可视化分析",
    gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
    iconColor: "text-blue-500",
    Icon: BarChart3,
    imageSrc: "/worksync/dashboard.png",
  },
  {
    id: "documents",
    badge: "知识管理",
    title: "文档集中管理",
    subtitle: "统一知识库",
    description:
      "设计文档、操作手册、规范与通知统一沉淀，树形结构组织、Markdown 在线编辑，媲美 Confluence 的文档体验。",
    bullets: [
      "树形目录结构，支持多级文档组织",
      "Markdown 在线编辑器，所见即所得",
      "设计文档、手册、规范分类归档",
      "精细化权限控制，读写分离",
    ],
    screenTitle: "文档管理",
    screenDesc: "树形结构 + Markdown 编辑器",
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    iconColor: "text-violet-500",
    Icon: FileText,
    imageSrc: "/worksync/document.png",
  },
  {
    id: "tasks",
    badge: "项目管理",
    title: "敏捷任务管理",
    subtitle: "看板与列表双视图",
    description:
      "任务分类、分配与状态跟踪，进度一目了然。看板视图拖拽操作，列表视图批量管理，项目管理能力向 Jira 看齐。",
    bullets: [
      "三列看板：待办、进行中、已完成",
      "优先级标记与颜色编码",
      "列表与看板视图自由切换",
      "任务分配与负责人管理",
    ],
    screenTitle: "任务看板",
    screenDesc: "看板拖拽 + 列表批量管理",
    gradient: "from-sky-500/10 via-cyan-500/5 to-transparent",
    iconColor: "text-sky-500",
    Icon: Kanban,
    imageSrc: "/worksync/task.png",
  },
  {
    id: "diagrams",
    badge: "技术图表",
    title: "PlantUML 技术图表",
    subtitle: "代码生成图表",
    description:
      "时序图、类图、流程图、架构图一键生成，技术方案讨论与评审不再靠「口头描述」。",
    bullets: [
      "PlantUML 语法实时渲染",
      "支持时序图、类图、流程图等",
      "图表库集中管理与检索",
      "一键分享与嵌入文档",
    ],
    screenTitle: "PlantUML 图表",
    screenDesc: "代码编辑器 + 实时渲染预览",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconColor: "text-emerald-500",
    Icon: Shapes,
    imageSrc: "/worksync/diagrams.png",
  },
  {
    id: "whiteboard",
    badge: "协作工具",
    title: "协作白板",
    subtitle: "实时协作画布",
    description:
      "基于 Excalidraw 的协作白板，支持手写、绘图、标注，头脑风暴与方案评审触手可及。",
    bullets: [
      "自由绘图与手写标注",
      "多人实时协作",
      "可嵌入文档与任务",
      "导出 PNG / SVG 格式",
    ],
    screenTitle: "协作白板",
    screenDesc: "Excalidraw 实时协作画布",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    iconColor: "text-amber-500",
    Icon: Palette,
    imageSrc: "/worksync/whiteboard.png",
  },
];

const PRICING_TIERS = [
  {
    name: "在线会员",
    price: "¥199",
    period: "/ 年",
    detail: "含最多 10 人同时使用（按年订阅）",
    features: [
      "全功能在线使用",
      "最多 10 位成员",
      "云端数据备份",
      "标准技术支持",
    ],
    highlighted: false,
  },
  {
    name: "客户内网安装",
    price: "¥1,999",
    period: "",
    detail: "部署在您指定内网环境，不限人数",
    features: [
      "私有化部署",
      "不限成员数量",
      "数据完全自主",
      "一年免费升级",
    ],
    highlighted: true,
  },
  {
    name: "源码授权",
    price: "¥19,999",
    period: "",
    detail: "完整源代码交付，便于二次开发与自主运维",
    features: [
      "完整源代码交付",
      "二次开发授权",
      "架构咨询支持",
      "终身使用权",
    ],
    highlighted: false,
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: string;
      delay: number;
      duration: number;
      size: number;
    }>
  >([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 8,
        size: 2 + Math.random() * 3,
      })),
    );
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-linear-to-r from-violet-400 to-indigo-400"
          style={{ left: p.left, bottom: "-10px", width: p.size, height: p.size }}
          animate={{
            y: [0, -900],
            x: [0, Math.sin(p.id) * 20],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function StickyNav({ scrolled }: { scrolled: boolean }) {
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">W</span>
          </div>
          <span
            className={`text-lg font-bold tracking-tight transition-colors ${
              scrolled
                ? "text-gray-900 dark:text-white"
                : "text-white"
            }`}
          >
            WorkSync
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          
        </nav>

        <Button
            size="sm"
            className={`transition-all ${
              scrolled
                ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
                : "bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25"
            }`}
            asChild
          >
            <Link href="/login">立即体验</Link>
          </Button>
      </div>
    </motion.header>
  );
}

function FeatureDeepDive({
  section,
  index,
}: {
  section: FeatureSection;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const isEven = index % 2 === 0;
  const Icon = section.Icon;

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] flex items-center py-20 px-4 overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-linear-to-b ${section.gradient} pointer-events-none`}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row" : "lg:flex-row-reverse"
          } gap-12 lg:gap-16 items-center`}
        >
          {/* Text side */}
          <motion.div
            className="flex-1 space-y-6"
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-400 mb-4">
                <Icon className={`h-3.5 w-3.5 ${section.iconColor}`} />
                {section.badge}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-3">
                {section.title}
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                {section.subtitle}
              </p>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {section.description}
            </motion.p>

            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {section.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Screen side */}
          <motion.div
            className="flex-1 w-full"
            style={{ y: imageY }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScreenPlaceholder
                title={section.screenTitle}
                description={section.screenDesc}
                imageSrc={section.imageSrc}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.6, 1, 1]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6],
    [40, 12, 12],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" style={{ opacity }}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            全方位产品体验
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            从需求文档到任务交付，从技术图表到协作白板，一个平台覆盖项目全生命周期
          </p>
        </motion.div>

        <motion.div
          style={{ scale, borderRadius }}
          className="overflow-hidden shadow-2xl shadow-black/20"
        >
          <ScreenPlaceholder
            title="WorkSync 全景预览"
            description="项目协作平台完整界面 — 仪表盘、文档、任务、图表一站式管理"
            variant="laptop"
            imageSrc="/worksync/roles.png"
          />
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            价格方案
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            按使用方式选择适合团队的方案。以下为参考报价，正式合作以合同约定为准。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                className={`relative h-full transition-shadow hover:shadow-xl ${
                  tier.highlighted
                    ? "border-violet-300 dark:border-violet-700 shadow-lg shadow-violet-500/10"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 text-white text-xs font-medium">
                    推荐
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-gray-500 dark:text-gray-400">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {tier.detail}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ContactDialog>
                    <Button
                      className={`w-full ${
                        tier.highlighted
                          ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700"
                          : ""
                      }`}
                      variant={tier.highlighted ? "default" : "outline"}
                    >
                      立即咨询
                    </Button>
                  </ContactDialog>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          以上价格仅供参考；企业采购、定制开发与长期服务可另行洽谈。
        </motion.p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function WorkSyncShowcase() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(heroProgress, [0, 0.5], [0.65, 1]);
  const heroOpacity = useTransform(heroProgress, [0, 0.3], [0.3, 1]);
  const heroBorderRadius = useTransform(heroProgress, [0, 0.5], [32, 12]);

  useMotionValueEvent(heroProgress, "change", (v) => {
    setScrolled(v > 0.05);
  });

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <StickyNav scrolled={scrolled} />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[140vh] flex flex-col items-center justify-start pt-32 pb-24 overflow-hidden"
        id="overview"
      >
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-950 via-gray-900 to-gray-800 dark:from-black dark:via-gray-950 dark:to-gray-900" />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/20 blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <FloatingParticles />

        {/* Hero text */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/70 mb-8">
              <LayoutDashboard className="h-4 w-4 text-violet-400" />
              项目文档与协作平台
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              WorkSync
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            文档集中、任务看板、PlantUML、白板
            <br className="hidden sm:block" />
            团队协作更高效
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-white/40 max-w-xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            一个项目一套工具，从启动到收尾全程陪伴；对内对齐团队，对外连接客户
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
                size="lg"
                className="bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25 px-8"
                asChild
              >
                <Link href="/login">
                  立即体验
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
              asChild
            >
              <a href="#features">了解更多</a>
            </Button>
          </motion.div>
        </div>

        {/* Hero product image — scroll-linked zoom */}
        <motion.div
          className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
          }}
        >
          <motion.div style={{ borderRadius: heroBorderRadius }} className="overflow-hidden">
            <ScreenPlaceholder
              title="WorkSync Dashboard"
              description="项目协作平台 — 仪表盘、文档、任务、图表集中管理"
              imageSrc="/worksync/hero.png"
              variant="laptop"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Feature Highlights Strip ── */}
      <section className="py-16 px-4 border-b border-gray-100 dark:border-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {HIGHLIGHT_PILLS.map((pill) => {
              const Icon = pill.icon;
              return (
                <motion.div
                  key={pill.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                >
                  <Icon className={`h-6 w-6 ${pill.color}`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                    {pill.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Feature Deep-Dive Sections ── */}
      <div id="features">
        {FEATURE_SECTIONS.map((section, i) => (
          <FeatureDeepDive key={section.id} section={section} index={i} />
        ))}
      </div>

      {/* ── Full-Width Zoom Section ── */}
      <ZoomSection />

      {/* ── Advantages summary ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              为什么选择 WorkSync
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              云原生与容器化部署，让资料集中、进度透明、沟通有据可依
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileText,
                title: "一站式协作",
                desc: "文档、任务、图表、白板统一平台，减少工具切换",
                color: "text-violet-500",
                bg: "bg-violet-50 dark:bg-violet-950/30",
              },
              {
                icon: Shield,
                title: "数据安全",
                desc: "在线备份、一键还原，传输加密，权限与审计可控",
                color: "text-amber-500",
                bg: "bg-amber-50 dark:bg-amber-950/30",
              },
              {
                icon: Cloud,
                title: "云原生部署",
                desc: "容器化架构，支持私有云与指定环境部署，弹性扩展",
                color: "text-sky-500",
                bg: "bg-sky-50 dark:bg-sky-950/30",
              },
              {
                icon: Users,
                title: "团队协作",
                desc: "对内对齐研发与产品，对外可与客户共享只读空间",
                color: "text-emerald-500",
                bg: "bg-emerald-50 dark:bg-emerald-950/30",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div
                        className={`h-12 w-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <PricingSection />

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              准备好提升团队协作效率了吗？
            </h2>
            <p className="text-xl text-white/80 mb-10">
              立即体验 WorkSync，让文档、任务、图表在同一空间高效流转
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactDialog>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-violet-600 hover:bg-white/90 shadow-xl shadow-black/20 px-8"
                  >
                    立即咨询
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </motion.span>
                  </Button>
                </motion.div>
              </ContactDialog>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                  asChild
                >
                  <a href="#contact">了解更多</a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer showContactId />
    </main>
  );
}
