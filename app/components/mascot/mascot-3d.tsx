"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// 动作类型
type MoodType = "idle" | "happy" | "sleep" | "wave" | "lookAround" | "stretch" | "blink";

// 鼠标位置 Hook
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

// 眼睛组件
function Eye({ 
  position, 
  mousePos, 
  isAsleep,
  isBlinking 
}: { 
  position: [number, number, number]; 
  mousePos: { x: number; y: number };
  isAsleep: boolean;
  isBlinking: boolean;
}) {
  const pupilRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (pupilRef.current && !isAsleep && !isBlinking) {
      const maxOffset = 0.08;
      pupilRef.current.position.x = mousePos.x * maxOffset;
      pupilRef.current.position.y = mousePos.y * maxOffset * 0.5;
    }
  });

  // 闭眼状态
  if (isAsleep || isBlinking) {
    return (
      <mesh position={position} rotation={[0, 0, position[0] < 0 ? 0.2 : -0.2]}>
        <boxGeometry args={[0.2, 0.03, 0.02]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    );
  }

  return (
    <group position={position}>
      {/* 眼白 */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* 眼珠 */}
      <mesh ref={pupilRef} position={[0, 0, 0.12]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* 高光 */}
      <mesh position={[0.04, 0.04, 0.17]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// 3D 小精灵角色
function BlueBuddy({
  mood,
  mousePos,
  onClick,
}: {
  mood: MoodType;
  mousePos: { x: number; y: number };
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const armLeftRef = useRef<THREE.Mesh>(null);
  const armRightRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // ===== 基础待机动画 =====
    if (mood === "idle") {
      groupRef.current.position.y = Math.sin(time * 2) * 0.05;
      groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.03;
    }
    
    // ===== 开心跳跃 =====
    if (mood === "happy") {
      groupRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.15;
      groupRef.current.rotation.z = Math.sin(time * 6) * 0.08;
    }
    
    // ===== 睡觉 =====
    if (mood === "sleep") {
      // 呼吸效果
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.02;
      if (bodyRef.current) {
        bodyRef.current.scale.x = 1 + Math.sin(time) * 0.03;
        bodyRef.current.scale.y = 1 - Math.sin(time) * 0.02;
      }
      // 身体微微倾斜（打盹）
      groupRef.current.rotation.z = 0.1 + Math.sin(time * 0.5) * 0.02;
    } else if (bodyRef.current) {
      bodyRef.current.scale.x = 1;
      bodyRef.current.scale.y = 1;
    }

    // ===== 挥手 =====
    if (mood === "wave" && armRightRef.current) {
      armRightRef.current.rotation.z = Math.sin(time * 8) * 0.5 + 0.8;
    } else if (armRightRef.current && mood !== "stretch") {
      armRightRef.current.rotation.z = 0.3;
    }

    // ===== 四处张望 =====
    if (mood === "lookAround") {
      groupRef.current.rotation.y = Math.sin(time * 1.2) * 0.5;
      groupRef.current.position.y = 0.05 + Math.sin(time * 2) * 0.03;
    } else if (mood !== "sleep") {
      groupRef.current.rotation.y = 0;
    }

    // ===== 伸懒腰 =====
    if (mood === "stretch") {
      // 身体拉伸
      if (bodyRef.current) {
        bodyRef.current.scale.y = 1 + Math.sin(time * 2) * 0.15;
      }
      // 双手举起
      if (armLeftRef.current) {
        armLeftRef.current.rotation.z = -1.2 + Math.sin(time * 2) * 0.2;
      }
      if (armRightRef.current) {
        armRightRef.current.rotation.z = 1.2 + Math.sin(time * 2) * 0.2;
      }
      groupRef.current.position.y = 0.1;
    } else if (armLeftRef.current) {
      armLeftRef.current.rotation.z = -0.3;
    }

    // ===== 眨眼 =====
    if (mood === "blink") {
      groupRef.current.position.y = Math.sin(time * 2) * 0.05;
    }
  });

  const isAsleep = mood === "sleep";
  const isBlinking = mood === "blink";

  return (
    <group
      ref={groupRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 身体 - 橙色椭圆 */}
      <mesh ref={bodyRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#FF8C42" : "#F97316"}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* 肚子高光 */}
      <mesh position={[0, -0.1, 0.35]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#FDBA74" roughness={0.4} />
      </mesh>

      {/* 眼睛 */}
      <Eye position={[-0.15, 0.15, 0.4]} mousePos={mousePos} isAsleep={isAsleep} isBlinking={isBlinking} />
      <Eye position={[0.15, 0.15, 0.4]} mousePos={mousePos} isAsleep={isAsleep} isBlinking={isBlinking} />

      {/* 嘴巴 */}
      {mood === "happy" ? (
        /* 开心大笑 */
        <mesh position={[0, -0.1, 0.48]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.1, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      ) : mood === "sleep" ? (
        /* 睡觉小嘴 */
        <mesh position={[0, -0.12, 0.48]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      ) : mood === "stretch" ? (
        /* 伸懒腰打哈欠 - 大张嘴 */
        <mesh position={[0, -0.1, 0.46]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      ) : (
        /* 默认微笑 */
        <mesh position={[0, -0.08, 0.48]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.08, 0.015, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      )}

      {/* 腮红 */}
      <mesh position={[-0.3, 0, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF9999" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0.3, 0, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF9999" transparent opacity={0.5} />
      </mesh>

      {/* 左手臂 */}
      <mesh ref={armLeftRef} position={[-0.5, -0.1, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
        <meshStandardMaterial color="#F97316" roughness={0.3} />
      </mesh>

      {/* 右手臂 */}
      <mesh ref={armRightRef} position={[0.5, -0.1, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
        <meshStandardMaterial color="#F97316" roughness={0.3} />
      </mesh>

      {/* 左脚 */}
      <mesh position={[-0.2, -0.55, 0.1]}>
        <capsuleGeometry args={[0.1, 0.1, 8, 16]} />
        <meshStandardMaterial color="#EA580C" roughness={0.3} />
      </mesh>

      {/* 右脚 */}
      <mesh position={[0.2, -0.55, 0.1]}>
        <capsuleGeometry args={[0.1, 0.1, 8, 16]} />
        <meshStandardMaterial color="#EA580C" roughness={0.3} />
      </mesh>

      {/* 睡觉时的 ZZZ */}
      {mood === "sleep" && (
        <group position={[0.5, 0.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#6B7280" />
          </mesh>
          <mesh position={[0.1, 0.1, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#6B7280" />
          </mesh>
          <mesh position={[0.22, 0.22, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#6B7280" />
          </mesh>
        </group>
      )}
    </group>
  );
}

// 场景设置
function Scene({
  mood,
  onClick,
}: {
  mood: MoodType;
  onClick: () => void;
}) {
  const mousePos = useMousePosition();

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-3, 2, 4]} intensity={0.3} color="#FED7AA" />
      <BlueBuddy mood={mood} mousePos={mousePos} onClick={onClick} />
    </>
  );
}

// 对话气泡
function SpeechBubble({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      className="absolute bottom-full right-0 mb-2 p-3 bg-white rounded-2xl shadow-lg border border-gray-100 min-w-[180px] max-w-[240px]"
    >
      <p className="text-sm text-gray-700">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs"
      >
        ×
      </button>
      <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
    </motion.div>
  );
}

// 待机动作列表
const idleActions: Array<{ mood: MoodType; duration: number; message?: string }> = [
  { mood: "sleep", duration: 5000, message: "zzZ... 💤" },
  { mood: "lookAround", duration: 3000, message: "🤔 在看什么呢..." },
  { mood: "stretch", duration: 2500, message: "🥱 好困啊~" },
  { mood: "wave", duration: 2000, message: "👋 嗨！" },
  { mood: "blink", duration: 1500 },
  { mood: "idle", duration: 2000 }, // 有时候就待着
];

// 主组件
export default function Mascot3D() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [mood, setMood] = useState<MoodType>("idle");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("你好！我是 Murphy 小助手~");
  const [mounted, setMounted] = useState(false);

  const lastActivityRef = useRef(Date.now());
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const actionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 初始化
  useEffect(() => {
    setMounted(true);
    
    // 初始动画：2秒后挥手打招呼
    const timer = setTimeout(() => {
      setMood("wave");
      setShowBubble(true);
      setTimeout(() => setMood("idle"), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 监听用户活动
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      
      // 如果正在执行特殊动作，恢复待机
      if (mood !== "idle" && mood !== "happy") {
        setMood("idle");
        setShowBubble(false);
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, [mood]);

  // 空闲时随机动作
  useEffect(() => {
    const checkIdle = () => {
      const idleTime = Date.now() - lastActivityRef.current;
      
      // 8秒无活动后开始随机动作
      if (idleTime > 8000 && mood === "idle" && !isMinimized) {
        performRandomAction();
      }
    };

    idleTimerRef.current = setInterval(checkIdle, 4000);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current);
    };
  }, [mood, isMinimized]);

  const performRandomAction = useCallback(() => {
    const randomAction = idleActions[Math.floor(Math.random() * idleActions.length)];
    
    setMood(randomAction.mood);
    
    if (randomAction.message) {
      setBubbleMessage(randomAction.message);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 2000);
    }

    // 动作完成后回到待机
    actionTimerRef.current = setTimeout(() => {
      setMood("idle");
    }, randomAction.duration);
  }, []);

  const handleClick = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    const messages = [
      "有什么可以帮助你的吗？✨",
      "今天也要加油哦！💪",
      "点击产品卡片了解更多~",
      "Murphy 为你提供最好的服务！",
      "需要联系我们吗？滚动到底部吧~",
      "嘿嘿，你发现我啦！🎉",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setMood("happy");
    setBubbleMessage(randomMessage);
    setShowBubble(true);
    
    setTimeout(() => setMood("idle"), 2000);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
    setShowBubble(false);
  };

  const handleRestore = () => {
    lastActivityRef.current = Date.now();
    setIsMinimized(false);
    setMood("wave");
    setBubbleMessage("我回来啦！👋");
    setShowBubble(true);
    setTimeout(() => {
      setMood("idle");
      setShowBubble(false);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isMinimized ? (
          <motion.button
            key="minimized"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleRestore}
            className="w-12 h-12 rounded-full bg-linear-to-br from-orange-400 to-orange-600 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-xl">👋</span>
          </motion.button>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative"
          >
            <AnimatePresence>
              {showBubble && (
                <SpeechBubble message={bubbleMessage} onClose={() => setShowBubble(false)} />
              )}
            </AnimatePresence>

            <div className="w-32 h-32 cursor-pointer">
              <Canvas
                camera={{ position: [0, 0, 2.5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <Suspense fallback={null}>
                  <Scene mood={mood} onClick={handleClick} />
                </Suspense>
              </Canvas>
            </div>

            <div className="absolute -top-1 -right-1 flex gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMinimize}
                className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 text-xs shadow"
              >
                −
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
