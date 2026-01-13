"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import {
  ClipboardList,
  Ticket,
  ScanFace,
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
  Shield,
  Globe,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Footer from "./footer";
import ContactDialog from "./contact-dialog";


// 动画变体
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

// 浮动粒子组件 - 只在客户端渲染避免 hydration 错误
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    delay: number;
    duration: number;
    size: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 6,
        size: 2 + Math.random() * 4,
      }))
    );
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-linear-to-r from-blue-500 to-purple-500"
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

// 光标追踪卡片组件
function GlowCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card ${className || ""}`}
    >
      {children}
    </div>
  );
}

// 产品数据
const products = [
  {
    id: "requirement",
    title: "智能需求与项目管理",
    subtitle: "Murphy Requirement",
    description:
      "从需求收集到项目交付的一站式解决方案，支持任务看板、Sprint迭代管理。",
    icon: ClipboardList,
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    darkBgGradient: "from-blue-950/50 to-indigo-950/50",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    url: "https://murphylan.cloud/products/requirement",
    productPage: "/products/requirement",
    features: ["智能报价单生成", "Sprint迭代管理", "任务看板", "Bug跟踪"],
  },
  {
    id: "activity",
    title: "活动工具集",
    subtitle: "Murphy Activity",
    description:
      "为活动组织者打造的全能工具箱，轻松完成签到、抽奖、投票和信息收集。",
    icon: Ticket,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    bgGradient: "from-emerald-50 to-cyan-50",
    darkBgGradient: "from-emerald-950/50 to-cyan-950/50",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    productPage: "/products/activity",
    url: "https://murphylan.cloud/products/activity",
    features: ["智能签到", "趣味抽奖", "在线投票", "信息收集"],
  },
  {
    id: "face",
    title: "人脸识别系统",
    subtitle: "Murphy Face",
    description:
      "基于AI的人脸识别解决方案，适用于考勤打卡、门禁管理、访客登记等场景。",
    icon: ScanFace,
    gradient: "from-purple-500 via-violet-500 to-fuchsia-500",
    bgGradient: "from-purple-50 to-fuchsia-50",
    darkBgGradient: "from-purple-950/50 to-fuchsia-950/50",
    borderColor: "border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    url: "https://murphylan.cloud/products/face",
    productPage: "/products/face",
    features: ["人脸考勤", "门禁管理", "访客登记", "安全监控"],
  },
];

// 平台优势
const advantages = [
  {
    icon: Zap,
    title: "高效便捷",
    description: "简洁的操作流程，快速上手使用",
  },
  {
    icon: Shield,
    title: "安全可靠",
    description: "企业级数据安全保障，隐私加密存储",
  },
  {
    icon: Users,
    title: "团队协作",
    description: "支持多人协作，高效沟通无障碍",
  },
  {
    icon: Globe,
    title: "随时随地",
    description: "Web端访问，不受设备和地点限制",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* 顶部导航 */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Murphy Cloud
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#products" className="hover:text-foreground transition-colors">
              产品服务
            </a>
            <a href="#advantages" className="hover:text-foreground transition-colors">
              平台优势
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              联系我们
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* 增强背景装饰 - 流动渐变 */}
        <div className="absolute inset-0 -z-10">
          {/* 主渐变光晕 */}
          <motion.div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/30 rounded-full blur-3xl floating-orb"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-3xl floating-orb-delayed"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl pulse-glow"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 50%, transparent 70%)"
            }}
          />

          {/* 旋转光环 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rotate-slow">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-500/50 rounded-full blur-sm" />
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-500/50 rounded-full blur-sm" />
            <div className="absolute left-0 top-1/2 w-4 h-4 bg-pink-500/30 rounded-full blur-sm" />
          </div>
        </div>

        {/* 浮动粒子 */}
        <FloatingParticles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">
                让技术赋能效率，让创意照进现实
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="block">Murphy 云服务平台</span>
              <span className="block mt-2 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                一站式企业应用解决方案
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              整合项目管理、活动运营、智能识别等核心能力，
              <br className="hidden sm:block" />
              为您的业务提供强大的数字化支持
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Button size="xl" className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-blue-500/25">
                <a href="#products" className="flex items-center gap-2">
                  探索产品
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="xl" variant="outline" className="border-2">
                <a href="#contact">联系我们</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 产品展示 */}
      <section id="products" className="py-24 bg-linear-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">产品与服务</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              三大核心产品，覆盖企业运营的关键场景
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <GlowCard>
                  <Card
                    className={`h-full overflow-hidden card-hover ${product.borderColor} border-2 relative`}
                  >
                    {/* 顶部渐变条 - 动画增强 */}
                    <motion.div
                      className={`h-2 bg-linear-to-r ${product.gradient}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                      style={{ transformOrigin: "left" }}
                    />

                    <CardContent className="p-8">
                      {/* 图标 - 悬停动画 */}
                      <motion.div
                        className={`h-14 w-14 rounded-2xl ${product.iconBg} flex items-center justify-center mb-6`}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        <product.icon
                          className={`h-7 w-7 ${product.iconColor}`}
                        />
                      </motion.div>

                      {/* 标题 */}
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {product.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
                      <p className="text-muted-foreground mb-6">
                        {product.description}
                      </p>

                      {/* 功能列表 - 交错动画 */}
                      <ul className="space-y-3 mb-8">
                        {product.features.map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: index * 0.1 + featureIndex * 0.1
                            }}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                delay: index * 0.1 + featureIndex * 0.1 + 0.2
                              }}
                            >
                              <CheckCircle2
                                className={`h-5 w-5 ${product.iconColor} shrink-0`}
                              />
                            </motion.div>
                            <span className="text-sm">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* 按钮 - 悬停效果增强 */}
                      <Link
                        href={product.productPage}
                        className="block"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            className={`w-full bg-linear-to-r ${product.gradient} text-white hover:opacity-90 relative overflow-hidden group`}
                            size="lg"
                          >
                            <span className="relative z-10 flex items-center justify-center w-full">
                              立即体验
                              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                            {/* 悬停光效 */}
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                            />
                          </Button>
                        </motion.div>
                      </Link>
                    </CardContent>
                  </Card>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 平台优势 */}
      <section id="advantages" className="py-24 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              为什么选择 Murphy
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              专注品质，持续创新，为您提供卓越的产品体验
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {advantages.map((item, index) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="text-center group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* 图标容器 - 悬停动画 */}
                <motion.div
                  className="inline-flex h-16 w-16 rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 items-center justify-center mb-5 relative overflow-hidden"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {/* 光晕效果 */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-blue-400/0 via-white/30 to-purple-400/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <item.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 relative z-10" />
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* 动态渐变背景 */}
        <div className="absolute inset-0 animated-gradient-bg" />

        {/* 装饰元素 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              准备好开始了吗？
            </motion.h2>
            <motion.p
              className="text-xl text-white/80 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              立即体验 Murphy 云服务，开启您的数字化转型之旅
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ContactDialog>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="xl"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-white/90 shadow-xl shadow-black/20"
                  >
                    <span className="flex items-center gap-2">
                      立即咨询
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </ContactDialog>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="xl"
                  variant="outline"
                  className="border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                >
                  <a href="#contact">了解更多</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer showContactId={true} />
    </main>
  );
}
