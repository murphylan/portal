"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
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
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
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
    desc: "手绘风格的协作白板，支持头脑风暴、评审与标注，远程会议也能指着图说",
  },
  {
    Icon: Lock,
    title: "数据安全",
    desc: "细粒度角色权限控制、操作日志全程审计、数据在线备份与一键还原",
  },
];

const CHESS_FEATURES = [
  {
    Icon: Swords,
    title: "大师级棋力",
    desc: "开局、中局、残局皆稳，每一手建议都经得起推敲",
  },
  {
    Icon: Zap,
    title: "实时局面洞察",
    desc: "边走边算，即时呈现局势优劣、胜负天平与推荐走法",
  },
  {
    Icon: Sparkles,
    title: "一键自动代走",
    desc: "开启代走，小卒替你从容落子，专注思考与学习",
  },
  {
    Icon: Users,
    title: "在线对弈 · 随处畅玩",
    desc: "创建房间邀好友切磋，手机电脑随开随用",
  },
];

const SIGN_FEATURES = [
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
    desc: "安全的账户登录体系，订单创建与状态跟踪，购买记录一目了然",
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
    title: "现代架构",
    desc: "前沿架构保障性能与稳定，持续迭代、快速交付，为团队提供专业级体验",
  },
  {
    Icon: Server,
    title: "灵活部署",
    desc: "支持云端订阅与私有化部署，数据完全自主掌控，弹性扩展从容应对增长",
  },
  {
    Icon: MonitorPlay,
    title: "一站式平台",
    desc: "文档协作、活动互动、智能棋艺、H5 商城、课程预约等 8+ 款产品，统一品牌体验",
  },
];

// ---------------------------------------------------------------------------
// Scroll-aware navigation
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
      <div className="max-w-[980px] mx-auto w-full px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-white/90 text-lg font-medium tracking-tight hover:text-white transition-colors"
        >
          {common("brand")}
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/products"
            className="text-white/70 text-sm hover:text-white transition-colors hidden sm:inline"
          >
            {t("products")}
          </Link>
          <Link
            href="/apps"
            className="text-white/70 text-sm hover:text-white transition-colors hidden sm:inline"
          >
            {t("apps")}
          </Link>
          <Link
            href="/enterprise"
            className="text-white/70 text-sm hover:text-white transition-colors hidden sm:inline"
          >
            {t("enterprise")}
          </Link>
          <LocaleSwitcher className="hidden sm:inline-flex text-white/70" />
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
      <Icon className="h-6 w-6 text-[#34c759] mb-3" />
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
// Feature row (scrollytelling copy column)
// ---------------------------------------------------------------------------

function FeatureRow({
  Icon,
  title,
  desc,
  dark,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  dark: boolean;
}) {
  return (
    <motion.div variants={cardVariants} className="flex gap-4">
      <div
        className="flex-none flex h-11 w-11 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: dark
            ? "rgba(52,199,89,0.12)"
            : "rgba(5,150,105,0.1)",
        }}
      >
        <Icon
          className={`h-5 w-5 ${dark ? "text-[#34c759]" : "text-[#059669]"}`}
        />
      </div>
      <div>
        <h4
          className="text-lg font-semibold mb-1"
          style={{
            color: dark ? "#ffffff" : "#1d1d1f",
            letterSpacing: "0.196px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h4>
        <p
          className="text-sm sm:text-[15px]"
          style={{
            color: dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.62)",
            lineHeight: 1.5,
          }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Product scene (sticky parallax media + scroll-revealed copy)
// ---------------------------------------------------------------------------

type Feature = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
};

type Cta = { href: string; label: string; external?: boolean };

function ProductScene({
  id,
  tone,
  mediaSide,
  eyebrow,
  title,
  subtitle,
  tagline,
  description,
  features,
  primary,
  secondary,
  pricing,
}: {
  id: string;
  tone: "dark" | "light";
  mediaSide: "left" | "right";
  eyebrow?: string;
  title: string;
  subtitle: string;
  tagline?: string;
  description: string;
  features: Feature[];
  primary: Cta;
  secondary: Cta;
  pricing: string;
}) {
  const dark = tone === "dark";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Gentle parallax float on the illustration as the section scrolls through.
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 0.97]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const media = (
    <div
      className={`relative overflow-hidden ${
        mediaSide === "left" ? "lg:order-1" : "lg:order-2"
      }`}
      style={{
        background: dark
          ? "radial-gradient(120% 120% at 30% 20%, #14402f 0%, #0a281f 55%, #061a13 100%)"
          : "radial-gradient(120% 120% at 30% 20%, #ecfbf3 0%, #d3efe0 55%, #bfe8d3 100%)",
      }}
    >
      {/* Illustration is pinned + centered in the viewport, so it stays framed
          in the middle of the screen while the feature list scrolls past. */}
      <div className="flex h-[54vh] items-center justify-center p-8 sm:p-12 lg:sticky lg:top-0 lg:h-screen lg:p-16">
        {/* soft glow behind the art */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[64%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: dark
              ? "radial-gradient(circle, rgba(52,199,89,0.25) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(5,150,105,0.16) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="relative z-10 w-full max-w-[620px] will-change-transform [filter:drop-shadow(0_28px_56px_rgba(0,0,0,0.14))]"
          style={{ scale, y: imageY }}
        >
          <ProductArt id={id} tone={tone} />
        </motion.div>
      </div>
    </div>
  );

  const copy = (
    <motion.div
      className={`flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24 ${
        mediaSide === "left" ? "lg:order-2" : "lg:order-1"
      }`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-md">
        {eyebrow ? (
          <motion.span
            variants={cardVariants}
            className="inline-block mb-4 rounded-full px-4 py-1 text-sm font-medium"
            style={{
              backgroundColor: dark
                ? "rgba(52,199,89,0.12)"
                : "rgba(5,150,105,0.1)",
              color: dark ? "#34c759" : "#059669",
            }}
          >
            {eyebrow}
          </motion.span>
        ) : null}
        <motion.h2
          variants={cardVariants}
          className="apple-headline text-4xl sm:text-5xl md:text-[56px] mb-3 hidden lg:block"
          style={{ color: dark ? "#ffffff" : "#1d1d1f" }}
        >
          {title}
        </motion.h2>
        <motion.h2
          variants={cardVariants}
          className="apple-headline text-4xl sm:text-5xl mb-3 lg:hidden"
          style={{ color: dark ? "#ffffff" : "#1d1d1f" }}
        >
          {title}
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="apple-subhead text-lg sm:text-xl md:text-[21px] mb-2"
          style={{ color: dark ? "rgba(255,255,255,0.92)" : "#1d1d1f" }}
        >
          {subtitle}
        </motion.p>
        {tagline ? (
          <motion.p
            variants={cardVariants}
            className="apple-body text-base mb-3"
            style={{
              color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.48)",
            }}
          >
            {tagline}
          </motion.p>
        ) : null}
        <motion.p
          variants={cardVariants}
          className="apple-body text-sm sm:text-base mb-10"
          style={{
            color: dark ? "rgba(255,255,255,0.56)" : "rgba(0,0,0,0.56)",
          }}
        >
          {description}
        </motion.p>

        <div className="space-y-7">
          {features.map((f) => (
            <FeatureRow key={f.title} {...f} dark={dark} />
          ))}
        </div>

        <motion.div
          variants={cardVariants}
          className="flex items-center gap-4 mt-11 flex-wrap"
        >
          <PillOutline href={primary.href} dark={dark}>
            {primary.label}
          </PillOutline>
          <PillFilled href={secondary.href} external={secondary.external}>
            {secondary.label}
          </PillFilled>
        </motion.div>

        <motion.p
          variants={cardVariants}
          className="text-xs mt-8"
          style={{
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
          }}
        >
          {pricing}
        </motion.p>
      </div>
    </motion.div>
  );

  return (
    <section
      id={id}
      ref={ref}
      className={dark ? "apple-section-dark" : "apple-section-light"}
    >
      <div className="lg:grid lg:grid-cols-2 lg:items-stretch">
        {media}
        {copy}
      </div>
    </section>
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
  const color = dark ? "#ffffff" : "#047857";
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
      className="apple-btn-accent inline-flex items-center gap-1 text-sm font-normal"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ChevronRight className="h-3.5 w-3.5" />
    </a>
  );
}

// ---------------------------------------------------------------------------
// Hero preview card (vector thumbnail + label) — unifies with product scenes
// ---------------------------------------------------------------------------

function HeroPreviewCard({
  href,
  id,
  Icon,
  name,
  preview,
  wide = false,
}: {
  href: string;
  id: string;
  Icon: React.ComponentType<{ className?: string }>;
  name: string;
  preview: string;
  wide?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#34c759]/40 ${
        wide ? "col-span-2 sm:col-span-1" : ""
      }`}
    >
      <div
        className="relative flex items-center justify-center overflow-hidden p-3"
        style={{
          background:
            "radial-gradient(120% 120% at 30% 20%, #14402f 0%, #0a281f 60%, #061a13 100%)",
        }}
      >
        <div className="w-full transition-transform duration-500 group-hover:scale-105">
          <ProductArt id={id} tone="dark" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#34c759]" />
          <h3
            className="text-sm font-semibold text-white"
            style={{ letterSpacing: "0.196px" }}
          >
            {name}
          </h3>
          <ChevronRight className="ml-auto h-3.5 w-3.5 text-[#34c759] opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          {preview}
        </p>
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AppleShowcase() {
  const t = useTranslations("Home");
  const featureCopy = t.raw("features") as Record<
    string,
    Array<{ title: string; desc: string }>
  >;
  const withCopy = (
    iconItems: Array<{ Icon: React.ComponentType<{ className?: string }> }>,
    key: string,
  ) =>
    featureCopy[key].map((copy, index) => ({
      ...iconItems[index],
      ...copy,
    }));
  const worksyncFeatures = withCopy(WORKSYNC_FEATURES, "worksync");
  const chessFeatures = withCopy(CHESS_FEATURES, "chess");
  const signFeatures = withCopy(SIGN_FEATURES, "sign");
  const shoppingFeatures = withCopy(SHOPPING_FEATURES, "shopping");
  const timeslotFeatures = withCopy(TIMESLOT_FEATURES, "timeslot");
  const advantages = withCopy(ADVANTAGES, "advantages");

  const scenes: Array<React.ComponentProps<typeof ProductScene>> = [
    {
      id: "worksync",
      tone: "light",
      mediaSide: "right",
      eyebrow: t("sections.worksync.flagship"),
      title: "WorkSync",
      subtitle: t("sections.worksync.subtitle"),
      description: t("sections.worksync.description"),
      features: worksyncFeatures,
      primary: { href: "/worksync", label: t("sections.worksync.primary") },
      secondary: {
        href: WORKSYNC_URL,
        label: t("sections.worksync.secondary"),
        external: true,
      },
      pricing: t("pricing.worksync"),
    },
    {
      id: "xiaozu",
      tone: "dark",
      mediaSide: "left",
      title: t("sections.xiaozu.title"),
      subtitle: t("sections.xiaozu.subtitle"),
      tagline: t("sections.xiaozu.tagline"),
      description: t("sections.xiaozu.description"),
      features: chessFeatures,
      primary: { href: CHESS_URL, label: t("sections.xiaozu.primary") },
      secondary: {
        href: CHESS_URL,
        label: t("sections.xiaozu.secondary"),
        external: true,
      },
      pricing: t("pricing.chess"),
    },
    {
      id: "sign",
      tone: "light",
      mediaSide: "right",
      title: "Sign",
      subtitle: t("sections.sign.subtitle"),
      tagline: t("sections.sign.tagline"),
      description: t("sections.sign.description"),
      features: signFeatures,
      primary: {
        href: "/products/activity",
        label: t("sections.sign.primary"),
      },
      secondary: {
        href: SIGN_URL,
        label: t("sections.sign.secondary"),
        external: true,
      },
      pricing: t("pricing.sign"),
    },
    {
      id: "shopping",
      tone: "dark",
      mediaSide: "left",
      title: t("sections.shopping.title"),
      subtitle: t("sections.shopping.subtitle"),
      description: t("sections.shopping.description"),
      features: shoppingFeatures,
      primary: { href: SHOPPING_URL, label: t("sections.shopping.primary") },
      secondary: {
        href: SHOPPING_URL,
        label: t("sections.shopping.secondary"),
        external: true,
      },
      pricing: t("pricing.shopping"),
    },
    {
      id: "timeslot",
      tone: "light",
      mediaSide: "right",
      title: "TimeSlot",
      subtitle: t("sections.timeslot.subtitle"),
      description: t("sections.timeslot.description"),
      features: timeslotFeatures,
      primary: { href: TIMESLOT_URL, label: t("sections.timeslot.primary") },
      secondary: {
        href: TIMESLOT_URL,
        label: t("sections.timeslot.secondary"),
        external: true,
      },
      pricing: t("pricing.timeslot"),
    },
  ];

  // Hero scroll narrative: rings zoom + fade, content lifts + fades as you leave.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ringsScale = useTransform(heroProgress, [0, 1], [1, 1.5]);
  const ringsOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroContentY = useTransform(heroProgress, [0, 1], [0, -80]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  return (
    <div className="overflow-x-hidden">
      <AppleNav />

      {/* ===== 1. Hero ===== */}
      <section
        ref={heroRef}
        className="apple-section-dark relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-12 overflow-hidden"
      >
        {/* Background decorative rings */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ scale: ringsScale, opacity: ringsOpacity }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "800px",
              height: "800px",
              background:
                "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",
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
        </motion.div>

        <motion.div
          className="relative z-10 w-full flex flex-col items-center"
          style={{ y: heroContentY, opacity: heroContentOpacity }}
        >
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
              <a
                href="#worksync"
                className="apple-btn-accent inline-flex items-center gap-1 text-sm font-normal"
              >
                {t("hero.explore")}
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/enterprise"
                className="apple-pill inline-flex items-center gap-1 text-sm font-normal"
                style={{ color: "#ffffff", borderColor: "#ffffff" }}
              >
                {t("hero.enterprise")}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p
              className="apple-body text-xs mt-4"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {t("hero.enterpriseHint")}
            </p>
          </motion.div>

          {/* Product preview cards */}
          <motion.div
            className="relative z-10 max-w-[1100px] w-full mt-16 mb-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPreviewCard
              href="#worksync"
              id="worksync"
              Icon={FileText}
              name="WorkSync"
              preview={t("preview.worksync")}
            />
            <HeroPreviewCard
              href="#xiaozu"
              id="xiaozu"
              Icon={Swords}
              name={t("sections.xiaozu.title")}
              preview={t("preview.xiaozu")}
            />
            <HeroPreviewCard
              href="#sign"
              id="sign"
              Icon={Ticket}
              name="Sign"
              preview={t("preview.sign")}
            />
            <HeroPreviewCard
              href="#shopping"
              id="shopping"
              Icon={ShoppingCart}
              name={t("sections.shopping.title")}
              preview={t("preview.shopping")}
            />
            <HeroPreviewCard
              href="#timeslot"
              id="timeslot"
              Icon={CalendarClock}
              name="TimeSlot"
              preview={t("preview.timeslot")}
              wide
            />
          </motion.div>

          <motion.div
            className="mb-8 apple-scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <ArrowDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== 1.5 Trust band ===== */}
      <section className="apple-section-dark border-t border-white/5 py-14 px-6">
        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {(t.raw("trust") as Array<{ value: string; label: string }>).map(
            (stat) => (
              <motion.div key={stat.label} variants={cardVariants}>
                <div className="text-3xl sm:text-4xl font-semibold text-white mb-1">
                  {stat.value}
                </div>
                <div
                  className="text-xs sm:text-sm"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ),
          )}
        </motion.div>
      </section>

      {/* ===== 2-6. Product scenes (sticky media + scrollytelling copy) ===== */}
      {scenes.map((scene) => (
        <ProductScene key={scene.id} {...scene} />
      ))}

      {/* ===== 6.5 Free PWA apps ===== */}
      <FreeAppsSection />

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
            {t("sections.why.title")}
          </h2>
          <p
            className="apple-body text-sm sm:text-base max-w-xl mx-auto mb-16"
            style={{ color: "rgba(255,255,255,0.56)" }}
          >
            {t("sections.why.description")}
          </p>
        </motion.div>

        <motion.div
          className="max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {advantages.map((a) => (
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
              <BarChart3 className="h-4 w-4 text-[#34c759]" />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("sections.why.metricStack")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#34c759]" />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("sections.why.metricDeploy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-4 w-4 text-[#34c759]" />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("sections.why.metricLocale")}
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
