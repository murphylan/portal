"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import {
  ArrowDown,
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
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  CHESS_URL,
  SHOPPING_URL,
  SIGN_URL,
  TIMESLOT_URL,
  WORKSYNC_URL,
} from "@/lib/product-urls";
import ContactDialog from "./contact-dialog";
import Footer from "./footer";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const WORKSYNC_FEATURES = [
  {
    Icon: FileText,
    title: "文档集中管理",
    desc: "Markdown 与富文本双模式，结构化目录与全文检索，告别散落在聊天群与邮件中的文档",
  },
  {
    Icon: Kanban,
    title: "任务看板",
    desc: "看板 + 列表视图，按优先级与负责人组织任务，里程碑与迭代节奏清晰可追踪",
  },
  {
    Icon: Shapes,
    title: "PlantUML 图表",
    desc: "内置编辑器支持时序图、类图、流程图、架构图，实时预览，图表直接嵌入文档",
  },
  {
    Icon: Sparkles,
    title: "AI 图表助手",
    desc: "用一句话描述需求，AI 即可生成完整 PlantUML 代码并一键应用到编辑器，流式输出、可中断与重新生成",
  },
  {
    Icon: Palette,
    title: "协作白板",
    desc: "基于 Excalidraw 的手绘风格白板，支持头脑风暴、评审与标注，远程会议也能指着图说",
  },
  {
    Icon: Lock,
    title: "数据安全",
    desc: "RBAC 权限控制、操作日志全程审计、数据在线备份与一键还原",
  },
];

const CHESS_FEATURES = [
  {
    Icon: Swords,
    title: "顶级 AI 引擎",
    desc: "搭载 Pikafish 引擎，基于 Stockfish 架构为中国象棋深度优化，大师级棋力",
  },
  {
    Icon: Zap,
    title: "实时流式分析",
    desc: "SSE 流式传输，实时展示搜索深度、局面评分与候选走法，所想即所见",
  },
  {
    Icon: Users,
    title: "在线实时对弈",
    desc: "创建房间邀请好友对弈，步时控制、断线重连，紧张刺激的竞技体验",
  },
  {
    Icon: Smartphone,
    title: "移动端优先",
    desc: "手机端紧凑高效，桌面端三栏布局，随时随地享受流畅的象棋体验",
  },
];

const RALLY_FEATURES = [
  {
    Icon: QrCode,
    title: "扫码签到",
    desc: "参与者扫码即签，大屏弹幕实时欢迎，自定义收集字段与白名单模式",
  },
  {
    Icon: Vote,
    title: "多样投票",
    desc: "简单投票、图文投票、候选人投票、PK 对决四种模板，结果实时可视化",
  },
  {
    Icon: Gift,
    title: "炫酷抽奖",
    desc: "转盘、老虎机、翻牌、九宫格四种动画模式，自定义奖品与中奖概率",
  },
  {
    Icon: ListChecks,
    title: "灵活表单",
    desc: "10+ 字段类型，提交前预览，CSV 一键导出，手机扫码填写即可",
  },
];

const SHOPPING_FEATURES = [
  {
    Icon: ShoppingCart,
    title: "商品与购物车",
    desc: "清晰的商品展示与分类浏览，购物车增删改查与库存校验，流畅的移动端购物体验",
  },
  {
    Icon: Tag,
    title: "商品搜索与筛选",
    desc: "关键词搜索、分类筛选、价格排序，帮助用户快速定位心仪商品",
  },
  {
    Icon: Users,
    title: "用户与订单管理",
    desc: "NextAuth v5 登录体系，订单创建与状态跟踪，购买记录一目了然",
  },
  {
    Icon: Smartphone,
    title: "H5 移动优先",
    desc: "专为手机端设计的紧凑布局，响应式适配各尺寸屏幕，随时随地下单",
  },
];

const TIMESLOT_FEATURES = [
  {
    Icon: CalendarClock,
    title: "课程预约",
    desc: "按日期与时段浏览可用课程，一键预约，自动冲突检测与容量控制",
  },
  {
    Icon: BookOpen,
    title: "丰富课程体系",
    desc: "AP 课程、编程开发、竞赛培训等多类目支持，灵活配置课程与教师信息",
  },
  {
    Icon: Star,
    title: "教师与学员管理",
    desc: "教师排课与学员预约记录全程可追溯，支持取消与改约操作",
  },
  {
    Icon: Smartphone,
    title: "移动端扫码预约",
    desc: "H5 移动优先设计，家长手机扫码即可为孩子预约课程，操作零门槛",
  },
];

const ADVANTAGES = [
  {
    Icon: Cloud,
    title: "现代技术栈",
    desc: "Next.js 16 + React 19 + TypeScript 全栈，PostgreSQL + Drizzle ORM，前沿框架保障性能与开发效率",
  },
  {
    Icon: Server,
    title: "灵活部署",
    desc: "支持云端订阅与私有化部署，数据完全自主掌控，容器化架构弹性扩展",
  },
  {
    Icon: MonitorPlay,
    title: "一站式平台",
    desc: "文档协作、活动互动、智能棋艺、H5 商城、课程预约五大产品，统一品牌体验",
  },
];

// ---------------------------------------------------------------------------
// Scroll-aware navigation
// ---------------------------------------------------------------------------

function AppleNav() {
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
      <div className="max-w-[980px] mx-auto w-full px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-white/90 text-sm font-medium tracking-tight hover:text-white transition-colors"
        >
          Murphy 云
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#worksync"
            className="text-white/70 text-xs hover:text-white transition-colors"
          >
            WorkSync
          </a>
          <a
            href="#xiaozu"
            className="text-white/70 text-xs hover:text-white transition-colors"
          >
            小卒
          </a>
          <a
            href="#rally"
            className="text-white/70 text-xs hover:text-white transition-colors"
          >
            Sign
          </a>
          <a
            href="#shopping"
            className="text-white/70 text-xs hover:text-white transition-colors"
          >
            小商城
          </a>
          <a
            href="#timeslot"
            className="text-white/70 text-xs hover:text-white transition-colors"
          >
            TimeSlot
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="text-white/70 text-xs hover:text-white transition-colors hidden sm:inline"
          >
            产品总览
          </Link>
          <ContactDialog>
            <button
              type="button"
              className="apple-btn-blue text-xs py-1! px-3! cursor-pointer"
            >
              联系我们
            </button>
          </ContactDialog>
        </div>
      </div>
    </motion.nav>
  );
}

// ---------------------------------------------------------------------------
// Shared section animation wrapper
// ---------------------------------------------------------------------------

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
  visible: {
    transition: { staggerChildren: 0.1 },
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

// ---------------------------------------------------------------------------
// Feature card (light background)
// ---------------------------------------------------------------------------

function FeatureCardLight({
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
      className="bg-white rounded-lg p-6 shadow-[rgba(0,0,0,0.04)_0px_2px_12px]"
    >
      <Icon className="h-6 w-6 text-[#0071e3] mb-3" />
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
  );
}

// ---------------------------------------------------------------------------
// Feature card (dark background)
// ---------------------------------------------------------------------------

function FeatureCardDark({
  Icon,
  title,
  desc,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <motion.div variants={cardVariants} className="apple-card-dark p-6">
      <Icon className="h-6 w-6 text-[#2997ff] mb-3" />
      <h4
        className="text-lg font-semibold text-white mb-2"
        style={{ letterSpacing: "0.196px", lineHeight: 1.14 }}
      >
        {title}
      </h4>
      <p
        className="text-sm"
        style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.47 }}
      >
        {desc}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Pill CTA components
// ---------------------------------------------------------------------------

function PillOutline({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  const color = dark ? "#ffffff" : "#0066cc";
  return (
    <a
      href={href}
      className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
      style={{ color, borderColor: color }}
    >
      {children}
      <ChevronRight className="h-3.5 w-3.5" />
    </a>
  );
}

function PillFilled({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="apple-btn-blue inline-flex items-center gap-1 text-sm font-normal"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ChevronRight className="h-3.5 w-3.5" />
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AppleShowcase() {
  return (
    <div className="overflow-x-hidden">
      <AppleNav />

      {/* ===== 1. Hero ===== */}
      <section className="apple-section-dark relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-12 overflow-hidden">
        {/* Background decorative rings */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "800px",
              height: "800px",
              background:
                "radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: "600px",
              height: "600px",
              borderColor: "rgba(255,255,255,0.03)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: "400px",
              height: "400px",
              borderColor: "rgba(255,255,255,0.04)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[980px] relative z-10"
        >
          <h1
            className="apple-headline text-5xl sm:text-6xl md:text-[56px] mb-4"
            style={{ color: "#ffffff" }}
          >
            Murphy 云
          </h1>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-4"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            五款 SaaS 产品，一站式云端解决方案
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-8"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            文档协作 · 活动互动 · 象棋 AI · H5 商城 · 课程预约 —
            为团队协作、企业活动、个人棋艺、在线购物与教育培训而生
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <PillOutline href="#worksync" dark>
              探索产品
            </PillOutline>
            <ContactDialog>
              <button
                type="button"
                className="apple-btn-blue inline-flex items-center gap-1 text-sm font-normal cursor-pointer"
              >
                联系我们
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </ContactDialog>
          </div>
        </motion.div>

        {/* Product preview cards */}
        <motion.div
          className="relative z-10 max-w-[1100px] w-full mt-16 mb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#worksync"
            className="relative overflow-hidden rounded-lg p-5 flex flex-col items-center text-center group transition-all hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url('/worksync-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="relative z-10 h-10 w-10 rounded-xl bg-[#0071e3]/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <FileText className="h-5 w-5 text-[#2997ff]" />
            </div>
            <h3
              className="relative z-10 text-sm font-semibold text-white mb-1"
              style={{ letterSpacing: "0.196px" }}
            >
              WorkSync
            </h3>
            <p
              className="relative z-10 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              文档 · 看板 · 图表 · 白板 · AI
            </p>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 text-[#2997ff] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#xiaozu"
            className="relative overflow-hidden rounded-lg p-5 flex flex-col items-center text-center group transition-all hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url('/xiaozu-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="relative z-10 h-10 w-10 rounded-xl bg-[#0071e3]/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <Swords className="h-5 w-5 text-[#2997ff]" />
            </div>
            <h3
              className="relative z-10 text-sm font-semibold text-white mb-1"
              style={{ letterSpacing: "0.196px" }}
            >
              小卒
            </h3>
            <p
              className="relative z-10 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              AI 引擎 · 实时分析 · 在线对弈
            </p>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 text-[#2997ff] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#rally"
            className="relative overflow-hidden rounded-lg p-5 flex flex-col items-center text-center group transition-all hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url('/rally-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="relative z-10 h-10 w-10 rounded-xl bg-[#0071e3]/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <Ticket className="h-5 w-5 text-[#2997ff]" />
            </div>
            <h3
              className="relative z-10 text-sm font-semibold text-white mb-1"
              style={{ letterSpacing: "0.196px" }}
            >
              Sign
            </h3>
            <p
              className="relative z-10 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              签到 · 投票 · 抽奖 · 表单
            </p>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 text-[#2997ff] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#shopping"
            className="relative overflow-hidden rounded-lg p-5 flex flex-col items-center text-center group transition-all hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url('/shopping-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="relative z-10 h-10 w-10 rounded-xl bg-[#0071e3]/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <ShoppingCart className="h-5 w-5 text-[#2997ff]" />
            </div>
            <h3
              className="relative z-10 text-sm font-semibold text-white mb-1"
              style={{ letterSpacing: "0.196px" }}
            >
              小商城
            </h3>
            <p
              className="relative z-10 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              商品 · 购物车 · 订单
            </p>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 text-[#2997ff] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#timeslot"
            className="relative overflow-hidden rounded-lg p-5 flex flex-col items-center text-center group transition-all hover:scale-[1.02] col-span-2 sm:col-span-1"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: "url('/timeslot-bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
            <div className="relative z-10 h-10 w-10 rounded-xl bg-[#0071e3]/20 backdrop-blur-sm flex items-center justify-center mb-3">
              <CalendarClock className="h-5 w-5 text-[#2997ff]" />
            </div>
            <h3
              className="relative z-10 text-sm font-semibold text-white mb-1"
              style={{ letterSpacing: "0.196px" }}
            >
              TimeSlot
            </h3>
            <p
              className="relative z-10 text-xs leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              课程 · 预约 · 管理
            </p>
            <ChevronRight className="relative z-10 h-3.5 w-3.5 text-[#2997ff] mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </motion.div>

        <motion.div
          className="mb-8 apple-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <ArrowDown className="h-5 w-5 text-white/40" />
        </motion.div>
      </section>

      {/* ===== 2. WorkSync ===== */}
      <section
        id="worksync"
        className="apple-section-light py-24 md:py-32 px-6"
      >
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="apple-headline text-4xl sm:text-5xl md:text-[56px] mb-2"
            style={{ color: "#1d1d1f" }}
          >
            WorkSync
          </h2>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-4"
            style={{ color: "#1d1d1f" }}
          >
            项目文档与协作平台
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-2xl mx-auto mb-16"
            style={{ color: "rgba(0,0,0,0.56)" }}
          >
            将文档管理、任务看板、PlantUML
            技术图表、协作白板与 AI 图表助手整合在同一个工作区。一个
            WorkSync，覆盖项目全生命周期的协作需求。
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {WORKSYNC_FEATURES.map((f) => (
            <FeatureCardLight key={f.title} {...f} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto flex items-center justify-center gap-4 mt-12 flex-wrap"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PillOutline href="/worksync">了解更多</PillOutline>
          <PillFilled href={WORKSYNC_URL} external>
            立即使用
          </PillFilled>
        </motion.div>
      </section>

      {/* ===== 3. 小卒 ===== */}
      <section id="xiaozu" className="apple-section-dark py-24 md:py-32 px-6">
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="apple-headline text-4xl sm:text-5xl md:text-[56px] text-white mb-2">
            小卒
          </h2>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-2"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            中国象棋智能辅助平台
          </p>
          <p
            className="apple-body text-base mb-4"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            小卒过河顶大车
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-2xl mx-auto mb-16"
            style={{ color: "rgba(255,255,255,0.56)" }}
          >
            基于顶级象棋引擎 Pikafish，为中国象棋爱好者打造的一站式 AI
            教练与对弈助手。无论你是在微信小程序中对弈、与朋友在线切磋，还是独自复盘研究——小卒都能在每一步棋为你提供专业级的分析与走法建议。
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CHESS_FEATURES.map((f) => (
            <FeatureCardDark key={f.title} {...f} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto flex items-center justify-center gap-4 mt-12 flex-wrap"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PillOutline href={CHESS_URL} dark>
            了解更多
          </PillOutline>
          <PillFilled href={CHESS_URL} external>
            开始下棋
          </PillFilled>
        </motion.div>
      </section>

      {/* ===== 4. Sign ===== */}
      <section id="rally" className="apple-section-light py-24 md:py-32 px-6">
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="apple-headline text-4xl sm:text-5xl md:text-[56px] mb-2"
            style={{ color: "#1d1d1f" }}
          >
            Sign
          </h2>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-2"
            style={{ color: "#1d1d1f" }}
          >
            活动互动平台
          </p>
          <p
            className="apple-body text-base mb-4"
            style={{ color: "rgba(0,0,0,0.48)" }}
          >
            Sign in. Stand out. 扫码集结，全场互动。
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-2xl mx-auto mb-16"
            style={{ color: "rgba(0,0,0,0.56)" }}
          >
            签到、投票、抽奖、表单——企业活动最常见的四大互动需求一站式覆盖。参与者无需下载任何
            APP，手机扫码即可参与，大屏实时展示互动数据。组织者 3
            分钟即可创建活动，一个短码贯穿全流程。
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {RALLY_FEATURES.map((f) => (
            <FeatureCardLight key={f.title} {...f} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto flex items-center justify-center gap-4 mt-12 flex-wrap"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PillOutline href="/products/activity">了解更多</PillOutline>
          <PillFilled href={SIGN_URL} external>
            创建活动
          </PillFilled>
        </motion.div>
      </section>

      {/* ===== 5. Shopping ===== */}
      <section
        id="shopping"
        className="apple-section-dark py-24 md:py-32 px-6"
      >
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="apple-headline text-4xl sm:text-5xl md:text-[56px] text-white mb-2">
            小商城
          </h2>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-2"
            style={{ color: "rgba(255,255,255,0.9)" }}
          >
            H5 移动电商平台
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-2xl mx-auto mb-16"
            style={{ color: "rgba(255,255,255,0.56)" }}
          >
            基于 Next.js 16 打造的 H5
            小商城，支持商品浏览、购物车、订单管理与商品搜索。移动端优先设计，随时随地轻松购物。
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SHOPPING_FEATURES.map((f) => (
            <FeatureCardDark key={f.title} {...f} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto flex items-center justify-center gap-4 mt-12 flex-wrap"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PillOutline href={SHOPPING_URL} dark>
            了解更多
          </PillOutline>
          <PillFilled href={SHOPPING_URL} external>
            进入商城
          </PillFilled>
        </motion.div>
      </section>

      {/* ===== 6. TimeSlot ===== */}
      <section
        id="timeslot"
        className="apple-section-light py-24 md:py-32 px-6"
      >
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="apple-headline text-4xl sm:text-5xl md:text-[56px] mb-2"
            style={{ color: "#1d1d1f" }}
          >
            TimeSlot
          </h2>
          <p
            className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-2"
            style={{ color: "#1d1d1f" }}
          >
            课外学习预约系统
          </p>
          <p
            className="apple-body text-sm sm:text-base max-w-2xl mx-auto mb-16"
            style={{ color: "rgba(0,0,0,0.56)" }}
          >
            支持 AP 课程、编程开发、竞赛培训等课程的在线预约管理。家长手机扫码即可为孩子预约课程，教师排课与学员管理全程可追溯。
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {TIMESLOT_FEATURES.map((f) => (
            <FeatureCardLight key={f.title} {...f} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto flex items-center justify-center gap-4 mt-12 flex-wrap"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PillOutline href={TIMESLOT_URL}>了解更多</PillOutline>
          <PillFilled href={TIMESLOT_URL} external>
            预约课程
          </PillFilled>
        </motion.div>
      </section>

      {/* ===== 7. Why Murphy Cloud ===== */}
      <section className="apple-section-dark py-24 md:py-32 px-6">
        <motion.div
          className="max-w-[980px] mx-auto text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="apple-headline text-3xl sm:text-4xl md:text-[40px] text-white mb-4">
            为什么选择 Murphy 云
          </h2>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-16"
            style={{ color: "rgba(255,255,255,0.56)" }}
          >
            统一平台、现代技术、灵活部署——为不同规模的团队提供专业级工具
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {ADVANTAGES.map((a) => (
            <FeatureCardDark key={a.title} {...a} />
          ))}
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto text-center mt-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[#2997ff]" />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                Next.js 16 + React 19
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#2997ff]" />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                私有部署 · 数据自主
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-[#2997ff]" />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                中英双语 · 深色模式
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 6. Footer ===== */}
      <Footer showContactId />
    </div>
  );
}
