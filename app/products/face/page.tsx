"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  Eye,
  Layers,
  MonitorPlay,
  ScanFace,
  Settings,
  Sparkles,
  Tag,
  Upload,
  UserCheck,
  Users,
  Zap,
  Database,
  Brain,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/footer";
import ContactDialog from "@/app/components/contact-dialog";
import { useState, useEffect } from "react";

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
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 4,
        size: 2 + Math.random() * 3,
      }))
    );
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400/30"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [800, -100],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// 核心流程 - 6个步骤
const coreWorkflow = [
  {
    step: 1,
    icon: Camera,
    title: "摄像头输入",
    description: "WebRTC 实时视频流",
    image: "/products/face/03_Step1_摄像头输入.png",
  },
  {
    step: 2,
    icon: ScanFace,
    title: "人脸检测",
    description: "实时检测与跟踪",
    image: "/products/face/04_Step2_人脸检测.png",
  },
  {
    step: 3,
    icon: Brain,
    title: "特征提取",
    description: "512维 Embedding",
    image: "/products/face/06_Step3_特征提取.png",
  },
  {
    step: 4,
    icon: Layers,
    title: "智能聚类",
    description: "无监督自动分组",
    image: "/products/face/08_Step4_智能聚类.png",
  },
  {
    step: 5,
    icon: Tag,
    title: "人工标注",
    description: "身份绑定确认",
    image: "/products/face/10_Step5_人工标注.png",
  },
  {
    step: 6,
    icon: UserCheck,
    title: "识别应用",
    description: "实时身份识别",
    image: "/products/face/13_Step6_识别应用.png",
  },
];

// 功能模块
const features = [
  {
    icon: Upload,
    title: "数据采集",
    description: "支持图片/视频批量上传、实时摄像头接入 (WebRTC)、视频帧智能抽取",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    items: ["批量图片上传", "实时摄像头", "视频帧抽取"],
  },
  {
    icon: ScanFace,
    title: "人脸处理",
    description: "高精度人脸检测与对齐、512维特征向量提取、多维度质量评估过滤",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    items: ["人脸检测对齐", "特征向量提取", "质量评估过滤"],
  },
  {
    icon: Sparkles,
    title: "无监督聚类",
    description: "自动将相似人脸分组、支持增量聚类、灵活的合并/拆分调整",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    items: ["自动分组", "增量聚类", "合并拆分"],
  },
  {
    icon: Tag,
    title: "人工标注",
    description: "聚类审核确认、身份信息绑定、错误修正机制",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    items: ["聚类审核", "身份绑定", "错误修正"],
  },
  {
    icon: Eye,
    title: "实时识别",
    description: "新人脸与已标注库实时匹配、可配置相似度阈值、陌生人检测告警",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    items: ["实时匹配", "阈值配置", "陌生人告警"],
  },
  {
    icon: MonitorPlay,
    title: "识别监控",
    description: "实时识别事件流、24小时趋势统计、热门身份排行",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    items: ["事件流", "趋势统计", "排行榜"],
  },
];

// 系统页面
const systemPages = [
  { name: "仪表盘", path: "/", icon: MonitorPlay, desc: "统计概览" },
  { name: "数据上传", path: "/upload", icon: Upload, desc: "拖拽上传、批量管理" },
  { name: "实时摄像头", path: "/camera", icon: Camera, desc: "预览、采集、实时识别" },
  { name: "聚类浏览", path: "/clusters", icon: Layers, desc: "查看自动分组结果" },
  { name: "标注工作台", path: "/annotate", icon: Tag, desc: "为聚类分配身份" },
  { name: "身份库", path: "/identities", icon: Users, desc: "已确认的人员管理" },
  { name: "识别监控", path: "/recognition", icon: Eye, desc: "实时识别事件流" },
  { name: "系统设置", path: "/settings", icon: Settings, desc: "阈值、模型配置" },
];

// 技术优势
const techAdvantages = [
  {
    title: "无需预先采集",
    value: "无监督",
    description: "先检测后标注，降低部署门槛",
    icon: Sparkles,
  },
  {
    title: "特征维度",
    value: "512维",
    description: "高精度 Embedding 向量",
    icon: Database,
  },
  {
    title: "向量检索",
    value: "pgvector",
    description: "PostgreSQL 原生向量扩展",
    icon: Zap,
  },
  {
    title: "浏览器端",
    value: "WebRTC",
    description: "无需安装客户端",
    icon: Camera,
  },
];

// 产品亮点 - 使用真实截图
const highlights = [
  {
    title: "实时人脸检测",
    description:
      "基于 WebRTC 的实时视频流处理，毫秒级人脸检测与跟踪。实时显示检测框、年龄性别、表情等丰富信息，支持多人同时检测。",
    image: "/products/face/05_Step2_检测效果展示.png",
    features: ["WebRTC 实时流", "多人同时检测", "检测框叠加", "年龄性别识别"],
  },
  {
    title: "智能实时识别",
    description:
      "检测到人脸后自动进行身份识别，支持已知身份匹配和陌生人检测。可配置相似度阈值，陌生人自动保存以便后续标注。",
    image: "/products/face/07_Step3_实时识别功能.png",
    features: ["自动身份匹配", "陌生人检测", "阈值可配置", "自动保存"],
  },
  {
    title: "一键智能聚类",
    description:
      "基于 pgvector 的高效向量相似度检索，自动将相似人脸聚类分组。支持手动合并、拆分聚类，以及批量确认和删除操作。",
    image: "/products/face/09_Step4_一键聚类功能.png",
    features: ["向量相似检索", "自动聚类分组", "手动合并拆分", "批量操作"],
  },
  {
    title: "高效标注流程",
    description:
      "直观的标注工作台，快速为聚类分配身份。支持新建身份、关联已有身份、批量操作，大幅提升标注效率。",
    image: "/products/face/11_Step5_高效标注流程.png",
    features: ["快速身份分配", "新建/关联身份", "批量操作", "错误修正"],
  },
  {
    title: "完整身份库管理",
    description:
      "建立人员身份库，管理已确认的身份信息。查看每个身份关联的人脸数据，支持编辑、删除等操作。",
    image: "/products/face/12_Step5.5_身份库管理.png",
    features: ["身份信息管理", "关联人脸查看", "编辑删除", "搜索筛选"],
  },
  {
    title: "智能监控仪表盘",
    description:
      "实时识别事件流、24小时识别趋势图、热门身份排行榜。一目了然的统计数据，全面掌控系统运行状态。",
    image: "/products/face/15_Step6_智能监控功能.png",
    features: ["实时事件流", "24h 趋势图", "热门排行", "统计概览"],
  },
];

export default function FaceProductPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-purple-50 to-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
              <ScanFace className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Murphy Face</span>
          </div>
          <ContactDialog>
            <Button className="bg-linear-to-r from-purple-500 to-fuchsia-500 text-white">
              立即咨询
            </Button>
          </ContactDialog>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="relative py-20 px-4 overflow-hidden">
        <FloatingParticles />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
              <ScanFace className="h-4 w-4" />
              无感人脸识别系统
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-purple-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              无监督学习 + 人工后标注
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              创新的人脸识别方案：无需预先采集人脸，系统自动检测、聚类、分组，
              再由人工确认身份。大幅降低部署门槛，让人脸识别更智能
            </p>
            <div className="flex justify-center gap-4">
              <ContactDialog>
                <Button
                  size="lg"
                  className="bg-linear-to-r from-purple-500 to-fuchsia-500 text-white"
                >
                  立即咨询
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </ContactDialog>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">了解更多</a>
              </Button>
            </div>
          </motion.div>

          {/* 视频展示区 */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl border bg-slate-900"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-video relative">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/products/face/01_开场_系统标题.png"
              >
                <source src="/products/face/demo.mp4" type="video/mp4" />
                您的浏览器不支持视频播放
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 核心流程 - 带图片 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">核心处理流程</h2>
            <p className="text-muted-foreground">从输入到识别的完整链路</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreWorkflow.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-purple-600 text-white">
                        Step {step.step}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                        <step.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术优势数据 */}
      <section className="py-12 px-4 bg-linear-to-r from-purple-600 to-fuchsia-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {techAdvantages.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{item.value}</div>
                <div className="font-medium mb-1">{item.title}</div>
                <div className="text-sm text-purple-200">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 功能模块 */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">功能模块</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              从数据采集到实时识别的完整解决方案
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
                  <CardContent className="p-6">
                    <div
                      className={`h-12 w-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.items.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 产品亮点 - 大图展示 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">产品亮点</h2>
            <p className="text-muted-foreground">创新技术，卓越体验</p>
          </motion.div>

          <div className="space-y-20">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}
              >
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-lg text-muted-foreground">{item.description}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {item.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 lg:flex-[1.2]">
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 系统页面导航 */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">系统页面</h2>
            <p className="text-muted-foreground">完整的功能模块，覆盖人脸识别全流程</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemPages.map((page, index) => (
              <motion.div
                key={page.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <div className="h-12 w-12 rounded-xl bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center mx-auto mb-3 transition-colors">
                      <page.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium mb-1">{page.name}</h3>
                    <p className="text-xs text-muted-foreground">{page.desc}</p>
                    <Badge variant="outline" className="mt-2 text-xs font-mono">
                      {page.path}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 仪表盘预览 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">仪表盘总览</h2>
            <p className="text-muted-foreground">一目了然的数据统计与监控</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100"
          >
            <img
              src="/products/face/16_仪表盘_总览.png"
              alt="仪表盘总览"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg opacity-90" />
        <FloatingParticles />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              开启智能人脸识别时代
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              无需预采集，自动聚类，人工确认 —— 让人脸识别部署更简单
            </p>
            <div className="flex justify-center gap-4">
              <ContactDialog>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-purple-50"
                >
                  立即咨询
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </ContactDialog>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/50 bg-white/10 hover:bg-white/20 text-white"
                >
                  返回首页
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
