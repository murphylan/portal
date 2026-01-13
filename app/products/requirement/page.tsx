"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  FolderTree,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/footer";
import ContactDialog from "@/app/components/contact-dialog";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
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

// 完整功能体系数据 - 按业务阶段划分
const featuresData = [
  {
    stage: {
      id: "planning",
      label: "阶段 01",
      title: "需求规划阶段",
      description: "收集和整理需求，形成完整的项目方案",
      badgeClass: "bg-purple-600",
      titleClass: "text-purple-900",
    },
    features: [
      {
        icon: BarChart3,
        iconColor: "text-blue-600",
        title: "Dashboard 项目总览",
        titleColor: "text-blue-900",
        bgColor: "from-blue-50 to-white",
        features: [
          "项目进度总览仪表板",
          "实时数据统计和可视化",
          "团队工作量分析",
          "关键指标监控",
        ],
        image: "/products/requirement/dashboard.png",
      },
      {
        icon: FileSpreadsheet,
        iconColor: "text-violet-600",
        title: "需求管理 - 智能报价单生成",
        titleColor: "text-violet-900",
        bgColor: "from-violet-50 to-white",
        features: [
          "需求列表管理和状态跟踪",
          "树形结构管理模块和业务项",
          "5W2H 需求验证确保完整性",
          "文件快照永久锁定报价版本",
          "模块维护和工作项管理",
        ],
        image: "/products/requirement/module-add.png",
      },
      {
        icon: FolderTree,
        iconColor: "text-green-600",
        title: "行业解决方案 - 模板库",
        titleColor: "text-green-900",
        bgColor: "from-green-50 to-white",
        features: [
          "基于行业模板库快速生成方案",
          "模块模板库管理",
          "工作项模板配置",
          "可复用的最佳实践",
        ],
        image: "/products/requirement/moudles.png",
      },
    ],
  },
  {
    stage: {
      id: "transition",
      label: "阶段 02",
      title: "需求转化阶段",
      description: "将需求模块转化为可执行的任务",
      badgeClass: "bg-amber-600",
      titleClass: "text-amber-900",
    },
    features: [
      {
        icon: ArrowRight,
        iconColor: "text-amber-600",
        title: "模块列表 - 需求转任务",
        titleColor: "text-amber-900",
        bgColor: "from-amber-50 to-white",
        features: [
          "需求模块一键转化为任务",
          "保持需求与任务的关联追溯",
          "自动生成工作分解结构",
          "工作量评估和分配",
        ],
        image: "/products/requirement/transform.png",
      },
    ],
  },
  {
    stage: {
      id: "execution",
      label: "阶段 03",
      title: "项目实施阶段",
      description: "敏捷迭代开发，任务跟踪管理",
      badgeClass: "bg-cyan-600",
      titleClass: "text-cyan-900",
    },
    features: [
      {
        icon: CheckCircle2,
        iconColor: "text-cyan-600",
        title: "任务管理",
        titleColor: "text-cyan-900",
        bgColor: "from-cyan-50 to-white",
        features: [
          "任务列表和状态管理",
          "任务分配和责任人设置",
          "优先级和标签管理",
          "任务关联和依赖关系",
        ],
        image: "/products/requirement/sprint.png",
      },
      {
        icon: Calendar,
        iconColor: "text-indigo-600",
        title: "Sprint 管理 - 敏捷迭代",
        titleColor: "text-indigo-900",
        bgColor: "from-indigo-50 to-white",
        features: [
          "Sprint 列表和迭代周期管理",
          "任务分配看板，拖拽式操作",
          "Sprint 看板可视化管理",
          "燃尽图和团队速率分析",
        ],
        image: "/products/requirement/sprint-kanban.png",
      },
    ],
  },
  {
    stage: {
      id: "common",
      label: "支撑功能",
      title: "通用功能模块",
      description: "系统管理、工具集成、权限控制",
      badgeClass: "bg-slate-600",
      titleClass: "text-slate-900",
    },
    features: [
      {
        icon: FileText,
        iconColor: "text-yellow-600",
        title: "资源与文档管理",
        titleColor: "text-yellow-900",
        bgColor: "from-yellow-50 to-white",
        features: [
          "文件资源上传和管理",
          "在线文档协作编辑",
          "版本控制和历史记录",
          "权限控制和共享管理",
        ],
        image: "/products/requirement/wiki-online.png",
      },
      {
        icon: Users,
        iconColor: "text-rose-600",
        title: "项目工具集",
        titleColor: "text-rose-900",
        bgColor: "from-rose-50 to-white",
        features: [
          "PlantUML 图表生成",
          "在线绘图工具",
          "白板协作功能",
          "Retro 会议回顾工具",
        ],
        image: "/products/requirement/plantuml-edit.png",
      },
      {
        icon: Shield,
        iconColor: "text-slate-600",
        title: "系统设置与权限",
        titleColor: "text-slate-900",
        bgColor: "from-slate-50 to-white",
        features: [
          "字典配置和系统参数",
          "账号管理和用户维护",
          "RBAC 角色权限管理",
          "系统信息和审计日志",
        ],
        image: "/products/requirement/role.png",
      },
    ],
  },
];

// 工作流程
const workflow = [
  { step: "1", title: "需求管理", desc: "收集和整理需求，生成报价单", color: "bg-blue-500" },
  { step: "2", title: "项目立项", desc: "确认报价，创建项目", color: "bg-green-500" },
  { step: "3", title: "Sprint 规划", desc: "划分迭代，分配任务", color: "bg-purple-500" },
  { step: "4", title: "执行跟踪", desc: "看板管理，进度追踪", color: "bg-orange-500" },
  { step: "5", title: "交付总结", desc: "数据分析，项目复盘", color: "bg-pink-500" },
];

export default function RequirementProductPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>返回首页</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <ClipboardList className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold">Murphy Requirement</span>
          </div>
          <ContactDialog>
            <Button>立即咨询</Button>
          </ContactDialog>
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          />
        </div>
        
        {/* 浮动粒子 */}
        <FloatingParticles />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
              <ClipboardList className="h-4 w-4" />
              智能需求与项目管理
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              从需求到交付的一站式解决方案
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              通过交互式演示了解 Murphy 如何帮助您的团队从需求管理到项目交付的完整流程
            </p>
            <div className="flex justify-center gap-4">
              <ContactDialog>
                <Button size="lg" className="bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                  立即咨询
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </ContactDialog>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">查看功能</a>
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
                poster="/products/requirement/dashboard.png"
              >
                <source src="/products/requirement/demo.mp4" type="video/mp4" />
                您的浏览器不支持视频播放
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 完整功能体系 - 按业务流程展示 */}
      <section id="features" className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">完整功能体系</h2>
            <p className="text-muted-foreground">
              从需求规划到项目实施的全流程管理
            </p>
          </motion.div>

          <div className="space-y-16">
            {featuresData.map((stageData) => (
              <motion.div
                key={stageData.stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* 阶段标题 */}
                <div className="flex items-center gap-3">
                  <Badge
                    className={`text-lg px-4 py-2 text-white ${stageData.stage.badgeClass}`}
                  >
                    {stageData.stage.label}
                  </Badge>
                  <div>
                    <h3 className={`text-2xl font-bold ${stageData.stage.titleClass}`}>
                      {stageData.stage.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {stageData.stage.description}
                    </p>
                  </div>
                </div>

                {/* 功能卡片 */}
                <div className="space-y-6">
                  {stageData.features.map((feature, featureIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <Card
                        key={`${stageData.stage.id}-${featureIndex}`}
                        className={`bg-linear-to-br ${feature.bgColor}`}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <IconComponent className={`h-5 w-5 ${feature.iconColor}`} />
                            <span className={feature.titleColor}>{feature.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col lg:flex-row gap-6 items-start">
                            <div className="flex-1 space-y-3">
                              <h4 className={`font-semibold text-lg ${feature.titleColor}`}>
                                核心功能
                              </h4>
                              <ul className="space-y-3">
                                {feature.features.map((item, itemIndex) => (
                                  <li key={itemIndex} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="lg:flex-2 w-full">
                              <div className="rounded-lg overflow-hidden border shadow-sm">
                                <Image
                                  src={feature.image}
                                  alt={feature.title}
                                  width={1200}
                                  height={800}
                                  className="w-full h-auto object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 工作流程演示 */}
      <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">完整工作流程</h2>
            <p className="text-muted-foreground">
              从需求收集到项目交付的完整闭环
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4">
            {workflow.map((item, index) => {
              const backgrounds = [
                "bg-linear-to-br from-blue-50 to-white",
                "bg-linear-to-br from-green-50 to-white",
                "bg-linear-to-br from-purple-50 to-white",
                "bg-linear-to-br from-orange-50 to-white",
                "bg-linear-to-br from-pink-50 to-white",
              ];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card className={`text-center h-full ${backgrounds[index]}`}>
                    <CardContent className="p-6">
                      <div
                        className={`h-12 w-12 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-lg mx-auto mb-4`}
                      >
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                  {index < 4 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-muted-foreground" />
                  )}
                </motion.div>
              );
            })}
          </div>
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
              立即体验 Murphy Requirement，让项目管理更简单
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
                    size="lg"
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
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                  asChild
                >
                  <Link href="/">返回首页</Link>
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
