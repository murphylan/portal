"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSpreadsheet,
  Gift,
  Link2,
  ListChecks,
  MessageSquare,
  MonitorPlay,
  QrCode,
  Shield,
  Smartphone,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  Vote,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ContactDialog from "@/app/components/contact-dialog";
import Footer from "@/app/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SIGN_URL } from "@/lib/product-urls";

// 浮动粒子组件
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
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 6,
        size: 2 + Math.random() * 4,
      })),
    );
  }, []);

  if (!mounted)
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-linear-to-r from-emerald-500 to-teal-500"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(p.id) * 30],
            opacity: [0, 1, 1, 0],
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

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

// 核心优势
const coreAdvantages = [
  {
    icon: Link2,
    title: "一码通用",
    description: "每个活动生成唯一短码，扫码即参与",
  },
  {
    icon: Zap,
    title: "实时互动",
    description: "SSE 技术推送，大屏数据秒级更新",
  },
  {
    icon: Sparkles,
    title: "视觉震撼",
    description: "弹幕欢迎、动画抽奖、图表可视化",
  },
  {
    icon: MonitorPlay,
    title: "灵活配置",
    description: "二维码9宫格定位、多种展示模式",
  },
  {
    icon: Smartphone,
    title: "零门槛",
    description: "无需下载APP，手机扫码直接参与",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "账号登录保护、验证码防刷",
  },
];

// 签到功能
const checkinFeatures = {
  title: "📝 签到功能",
  subtitle: "扫码即签，实时弹幕，专业范十足",
  highlights: [
    "独立创建签到活动，获得唯一短码",
    "大屏展示，二维码位置可配置（9宫格任意位置）",
    "手机扫码签到，支持收集姓名、部门等信息",
    "签到后可配置：显示成功消息、跳转指定URL、无操作",
    "实时弹幕欢迎、统计展示",
    "3位验证码防止恶意修改",
  ],
  screenshots: [
    {
      src: "/products/activity/10-checkin-new.png",
      title: "创建签到",
      desc: "简单配置签到标题、收集信息、签到后行为等选项",
    },
    {
      src: "/products/activity/11-checkin-detail.png",
      title: "签到详情",
      desc: "查看二维码、签到链接、统计数据",
    },
    {
      src: "/products/activity/12-checkin-settings.png",
      title: "签到设置",
      desc: "背景样式、大屏布局、字段配置等",
    },
    {
      src: "/products/activity/14-checkin-display.png",
      title: "大屏展示",
      desc: "实时显示签到动态，弹幕效果震撼全场",
    },
  ],
};

// 投票功能
const voteFeatures = {
  title: "📊 投票功能",
  subtitle: "多种模板，实时可视化，PK对决",
  highlights: [
    "定制化投票主题",
    "单选/多选支持",
    "实时结果展示（SSE推送）",
    "多种图表可视化（饼图、柱状图、进度条、对决模式）",
    "允许修改投票、匿名投票等规则配置",
    "大屏二维码位置可配置",
  ],
  templates: [
    { name: "简单投票", desc: "快速创建文字选项投票" },
    { name: "图文投票", desc: "支持图片展示的投票" },
    { name: "候选人投票", desc: "适合人物评选场景" },
    { name: "PK对决", desc: "两个选项的对决模式" },
  ],
  screenshots: [
    {
      src: "/products/activity/20-vote-templates.png",
      title: "投票模板",
      desc: "四种投票模板可选",
    },
    {
      src: "/products/activity/21-vote-simple-form.png",
      title: "简单投票",
      desc: "配置投票标题和选项",
    },
    {
      src: "/products/activity/27-vote-versus-form.png",
      title: "PK对决",
      desc: "二选一的投票场景",
    },
  ],
};

// 抽奖功能
const lotteryFeatures = {
  title: "🎁 抽奖功能",
  subtitle: "四种动画模式，精彩刺激，公正透明",
  highlights: [
    "多种抽奖模式（转盘、老虎机、翻牌、九宫格）",
    "精彩动画效果",
    "自定义奖品和概率",
    "每人抽奖次数限制",
    "实时中奖推送和名单展示",
    "大屏中奖弹幕效果",
  ],
  modes: [
    {
      icon: "🎡",
      name: "转盘抽奖",
      desc: "经典大转盘效果，适合年会现场",
      src: "/products/activity/33-lottery-wheel-display.png",
    },
    {
      icon: "🎰",
      name: "老虎机抽奖",
      desc: "三列滚动效果，依次停止揭晓",
      src: "/products/activity/35-lottery-slot-display.png",
    },
    {
      icon: "🃏",
      name: "翻牌抽奖",
      desc: "神秘感十足的3D翻牌揭晓效果",
      src: "/products/activity/36-lottery-card-display.png",
    },
    {
      icon: "⬜",
      name: "九宫格抽奖",
      desc: "跑马灯效果，顺时针旋转抽奖",
      src: "/products/activity/37-lottery-grid-display.png",
    },
  ],
};

// 表单功能
const formFeatures = {
  title: "📋 表单功能",
  subtitle: "灵活字段，实时统计，CSV导出",
  highlights: [
    "定制化表单字段（文本、数字、手机号、邮箱、单选、多选、下拉、日期、时间、评分等）",
    "提交前预览确认",
    "提交后成功反馈、跳转支持",
    "每人限提交一次、需要手机号等规则",
    "SSE 实时推送新提交",
    "CSV 数据导出",
  ],
  fieldTypes: [
    "文本输入",
    "数字输入",
    "手机号",
    "邮箱",
    "单选题",
    "多选题",
    "下拉选择",
    "日期选择",
    "时间选择",
    "评分",
  ],
  screenshots: [
    {
      src: "/products/activity/40-form-new.png",
      title: "创建表单",
      desc: "配置表单标题和描述",
    },
    {
      src: "/products/activity/41-form-field-types.png",
      title: "字段类型",
      desc: "丰富的字段类型可选",
    },
  ],
};

// 应用场景
const scenarios = [
  {
    icon: Sparkles,
    title: "🎉 年会活动",
    features: "签到 + 抽奖",
    effect: "气氛拉满，大奖刺激",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "📚 培训会议",
    features: "签到 + 表单",
    effect: "签到统计，问卷收集",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Trophy,
    title: "🏆 评选活动",
    features: "投票（候选人模式）",
    effect: "公开透明，实时PK",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Ticket,
    title: "🚀 产品发布",
    features: "投票 + 表单",
    effect: "需求调研，即时反馈",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: FileSpreadsheet,
    title: "📊 信息收集",
    features: "表单",
    effect: "员工信息收集，导出Excel",
    color: "from-indigo-500 to-violet-500",
  },
];

export default function ActivityProductPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Murphy 云首页</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Ticket className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Murphy Activity</span>
          </div>
          <ContactDialog>
            <Button className="bg-linear-to-r from-emerald-500 to-teal-500 text-white">
              立即咨询
            </Button>
          </ContactDialog>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section ref={heroRef} className="relative py-20 px-4 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-400/30 rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <FloatingParticles />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-2 text-sm font-medium bg-emerald-50 border-emerald-200 text-emerald-700"
            >
              <Ticket className="h-4 w-4 mr-2" />
              签到 · 投票 · 抽奖 · 表单 —— 一站式活动互动解决方案
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Rally
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
              扫码集结，全场互动 — 让每一场活动都精彩纷呈
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              无需下载
              APP，手机扫码即可参与，大屏秒级同步互动数据，3
              分钟创建活动，一个短码贯穿全流程
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap items-center">
              <Button
                size="lg"
                className="bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                asChild
              >
                <a href={SIGN_URL} target="_blank" rel="noopener noreferrer">
                  前往线上产品
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
              <ContactDialog>
                <Button size="lg" variant="secondary">
                  立即咨询
                </Button>
              </ContactDialog>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">查看功能</a>
              </Button>
            </div>
          </motion.div>

          {/* 视频展示区 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 bg-slate-900"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-video relative">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/products/activity/01-home-hero.png"
              >
                <source src="/products/activity/demo.mp4" type="video/mp4" />
                您的浏览器不支持视频播放
              </video>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 首页展示 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">产品首页展示</h2>
            <p className="text-muted-foreground">
              简洁的产品首页，一目了然地展示核心功能模块
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-xl border"
            >
              <Image
                src="/products/activity/01-home-hero.png"
                alt="首页 Hero"
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden shadow-xl border"
            >
              <Image
                src="/products/activity/01-home-features.png"
                alt="功能模块"
                width={800}
                height={450}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section
        id="features"
        className="py-20 px-4 bg-linear-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">核心优势</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              一站式解决活动互动的各种需求
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {coreAdvantages.map((item) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-emerald-200">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 管理后台 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">管理后台</h2>
            <p className="text-muted-foreground">
              统一管理所有活动，快速创建新活动，一站式操控
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl border">
                <Image
                  src="/products/activity/02-login-page.png"
                  alt="登录页面"
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-muted-foreground">
                安全的账号登录系统，支持邮箱账号登录
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="relative rounded-xl overflow-hidden shadow-xl border">
                <Image
                  src="/products/activity/03-dashboard.png"
                  alt="控制台"
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-muted-foreground">
                统一管理所有活动，快速创建新活动
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 签到功能 */}
      <section className="py-20 px-4 bg-linear-to-b from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{checkinFeatures.title}</h2>
            <p className="text-muted-foreground">{checkinFeatures.subtitle}</p>
          </motion.div>

          {/* 功能亮点 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checkinFeatures.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm border"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 截图展示 */}
          <div className="grid md:grid-cols-2 gap-6">
            {checkinFeatures.screenshots.map((shot, index) => (
              <motion.div
                key={shot.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">{shot.title}</h4>
                  <p className="text-sm text-muted-foreground">{shot.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 移动端展示 */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-center mb-8">
              手机端签到体验
            </h3>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="w-64 space-y-3">
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src="/products/activity/13-checkin-mobile.png"
                    alt="手机端签到"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  用户扫码后的签到界面
                </p>
              </div>
              <div className="w-64 space-y-3">
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src="/products/activity/13-checkin-mobile-filled.png"
                    alt="填写签到信息"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  填写信息后提交签到
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 投票功能 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{voteFeatures.title}</h2>
            <p className="text-muted-foreground">{voteFeatures.subtitle}</p>
          </motion.div>

          {/* 功能亮点 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {voteFeatures.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 投票模板 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-center mb-6">
              四种投票模板
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {voteFeatures.templates.map((template) => (
                <Card
                  key={template.name}
                  className="text-center hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <CardContent className="p-4">
                    <Vote className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h4 className="font-semibold mb-1">{template.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {template.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* 截图展示 */}
          <div className="grid md:grid-cols-3 gap-6">
            {voteFeatures.screenshots.map((shot, index) => (
              <motion.div
                key={shot.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">{shot.title}</h4>
                  <p className="text-sm text-muted-foreground">{shot.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 抽奖功能 */}
      <section className="py-20 px-4 bg-linear-to-b from-amber-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{lotteryFeatures.title}</h2>
            <p className="text-muted-foreground">{lotteryFeatures.subtitle}</p>
          </motion.div>

          {/* 功能亮点 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lotteryFeatures.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-100"
                >
                  <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 四种抽奖模式 */}
          <h3 className="text-xl font-semibold text-center mb-8">
            四种抽奖模式
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {lotteryFeatures.modes.map((mode, index) => (
              <motion.div
                key={mode.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{mode.icon}</span>
                  <div>
                    <h4 className="font-semibold">{mode.name}</h4>
                    <p className="text-sm text-muted-foreground">{mode.desc}</p>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src={mode.src}
                    alt={mode.name}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* 手机端抽奖 */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-center mb-8">
              手机端参与抽奖
            </h3>
            <div className="flex justify-center">
              <div className="w-64 space-y-3">
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src="/products/activity/32-lottery-mobile.png"
                    alt="手机端抽奖"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  用户扫码参与抽奖的界面
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 表单功能 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">{formFeatures.title}</h2>
            <p className="text-muted-foreground">{formFeatures.subtitle}</p>
          </motion.div>

          {/* 功能亮点 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formFeatures.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 border border-purple-100"
                >
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 字段类型 */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-center mb-6">
              丰富的字段类型
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {formFeatures.fieldTypes.map((type) => (
                <Badge key={type} variant="secondary" className="px-4 py-2">
                  {type}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* 截图展示 */}
          <div className="grid md:grid-cols-2 gap-6">
            {formFeatures.screenshots.map((shot, index) => (
              <motion.div
                key={shot.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-3"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg border">
                  <Image
                    src={shot.src}
                    alt={shot.title}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold">{shot.title}</h4>
                  <p className="text-sm text-muted-foreground">{shot.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 应用场景 */}
      <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">🎯 应用场景</h2>
            <p className="text-muted-foreground">适用于各类活动场景</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden">
                  <div className={`h-2 bg-linear-to-r ${scenario.color}`} />
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">
                      {scenario.title}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          功能组合：
                        </span>
                        <span className="font-medium">{scenario.features}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">效果：</span>
                        <span className="font-medium text-emerald-600">
                          {scenario.effect}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* 动态渐变背景 */}
        <div className="absolute inset-0 animated-gradient-bg" />

        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"
            animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              让活动互动更精彩 ✨
            </motion.h2>
            <motion.p
              className="text-xl text-white/80 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              立即体验 Rally，开启精彩活动之旅
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-white/90 shadow-xl shadow-black/20"
                  asChild
                >
                  <a href={SIGN_URL} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-2">
                      前往线上产品
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </a>
                </Button>
              </motion.div>
              <ContactDialog>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/70 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                  >
                    <span className="flex items-center gap-2">立即咨询</span>
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
                  <Link href="/products">产品总览</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
