"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

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
function Eye({ position, mousePos }: { position: [number, number, number]; mousePos: { x: number; y: number } }) {
  const pupilRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (pupilRef.current) {
      // 眼珠跟随鼠标，限制在眼眶范围内
      const maxOffset = 0.08;
      pupilRef.current.position.x = mousePos.x * maxOffset;
      pupilRef.current.position.y = mousePos.y * maxOffset * 0.5;
    }
  });

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

// 闭眼组件
function ClosedEye({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, 0.2]}>
      <boxGeometry args={[0.2, 0.03, 0.02]} />
      <meshStandardMaterial color="#1a1a2e" />
    </mesh>
  );
}

// 3D 小精灵角色
function BlueBuddy({
  mood,
  mousePos,
  onClick,
}: {
  mood: "idle" | "happy" | "sleep" | "wave";
  mousePos: { x: number; y: number };
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const armLeftRef = useRef<THREE.Mesh>(null);
  const armRightRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);

  // 待机动画
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // 身体上下浮动
    groupRef.current.position.y = Math.sin(time * 2) * 0.05;
    
    // 身体轻微摇摆
    groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.03;
    
    // 根据心情调整
    if (mood === "happy" && bodyRef.current) {
      // 开心时跳跃更高
      groupRef.current.position.y = Math.abs(Math.sin(time * 4)) * 0.15;
    }
    
    if (mood === "sleep") {
      // 睡觉时呼吸感更强
      if (bodyRef.current) {
        bodyRef.current.scale.x = 1 + Math.sin(time) * 0.02;
        bodyRef.current.scale.y = 1 - Math.sin(time) * 0.02;
      }
    }

    if (mood === "wave" && armRightRef.current) {
      // 挥手动画
      armRightRef.current.rotation.z = Math.sin(time * 8) * 0.5 + 0.8;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* 身体 - 蓝色椭圆 */}
      <mesh ref={bodyRef} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? "#5B9BF8" : "#4A90E2"}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* 肚子高光 */}
      <mesh position={[0, -0.1, 0.35]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#7CB8FF" roughness={0.4} />
      </mesh>

      {/* 眼睛 */}
      {mood !== "sleep" ? (
        <>
          <Eye position={[-0.15, 0.15, 0.4]} mousePos={mousePos} />
          <Eye position={[0.15, 0.15, 0.4]} mousePos={mousePos} />
        </>
      ) : (
        /* 睡觉时的闭眼 */
        <>
          <ClosedEye position={[-0.15, 0.15, 0.45]} />
          <mesh position={[0.15, 0.15, 0.45]} rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.2, 0.03, 0.02]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
        </>
      )}

      {/* 嘴巴 */}
      {mood === "happy" ? (
        /* 开心的微笑 */
        <mesh position={[0, -0.1, 0.48]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.1, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
      ) : mood === "sleep" ? (
        /* 睡觉的小嘴 */
        <mesh position={[0, -0.12, 0.48]}>
          <sphereGeometry args={[0.04, 16, 16]} />
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
        <meshStandardMaterial color="#4A90E2" roughness={0.3} />
      </mesh>

      {/* 右手臂 */}
      <mesh ref={armRightRef} position={[0.5, -0.1, 0]} rotation={[0, 0, mood === "wave" ? 0.8 : 0.3]}>
        <capsuleGeometry args={[0.08, 0.2, 8, 16]} />
        <meshStandardMaterial color="#4A90E2" roughness={0.3} />
      </mesh>

      {/* 左脚 */}
      <mesh position={[-0.2, -0.55, 0.1]}>
        <capsuleGeometry args={[0.1, 0.1, 8, 16]} />
        <meshStandardMaterial color="#3A7BC8" roughness={0.3} />
      </mesh>

      {/* 右脚 */}
      <mesh position={[0.2, -0.55, 0.1]}>
        <capsuleGeometry args={[0.1, 0.1, 8, 16]} />
        <meshStandardMaterial color="#3A7BC8" roughness={0.3} />
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
  mood: "idle" | "happy" | "sleep" | "wave";
  onClick: () => void;
}) {
  const mousePos = useMousePosition();

  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.6} />
      
      {/* 主光源 */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      
      {/* 补光 */}
      <pointLight position={[-3, 2, 4]} intensity={0.3} color="#87CEEB" />
      
      {/* 角色 */}
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
      {/* 气泡尖角 */}
      <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
    </motion.div>
  );
}

// 主组件
export default function Mascot3D() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [mood, setMood] = useState<"idle" | "happy" | "sleep" | "wave">("idle");
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState("你好！我是 Murphy 小助手~");
  const [mounted, setMounted] = useState(false);

  // 确保只在客户端渲染
  useEffect(() => {
    setMounted(true);
    
    // 初始动画：3秒后挥手打招呼
    const timer = setTimeout(() => {
      setMood("wave");
      setShowBubble(true);
      
      // 3秒后恢复待机
      setTimeout(() => {
        setMood("idle");
      }, 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 自动进入睡眠模式
  useEffect(() => {
    let sleepTimer: NodeJS.Timeout;
    
    const resetSleepTimer = () => {
      clearTimeout(sleepTimer);
      if (mood === "sleep") {
        setMood("idle");
      }
      sleepTimer = setTimeout(() => {
        if (mood === "idle") {
          setMood("sleep");
          setBubbleMessage("zzZ...");
          setShowBubble(true);
          setTimeout(() => setShowBubble(false), 2000);
        }
      }, 30000); // 30秒无操作后睡觉
    };

    window.addEventListener("mousemove", resetSleepTimer);
    window.addEventListener("click", resetSleepTimer);
    
    resetSleepTimer();

    return () => {
      clearTimeout(sleepTimer);
      window.removeEventListener("mousemove", resetSleepTimer);
      window.removeEventListener("click", resetSleepTimer);
    };
  }, [mood]);

  const handleClick = useCallback(() => {
    // 随机消息
    const messages = [
      "有什么可以帮助你的吗？",
      "今天也要加油哦！",
      "点击产品卡片了解更多~",
      "Murphy 为你提供最好的服务！",
      "需要联系我们吗？滚动到底部吧~",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setMood("happy");
    setBubbleMessage(randomMessage);
    setShowBubble(true);
    
    setTimeout(() => {
      setMood("idle");
    }, 2000);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
    setShowBubble(false);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setMood("wave");
    setBubbleMessage("我回来啦！");
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
          /* 最小化状态 - 小圆点 */
          <motion.button
            key="minimized"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleRestore}
            className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-xl">👋</span>
          </motion.button>
        ) : (
          /* 完整状态 */
          <motion.div
            key="full"
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative"
          >
            {/* 对话气泡 */}
            <AnimatePresence>
              {showBubble && (
                <SpeechBubble
                  message={bubbleMessage}
                  onClose={() => setShowBubble(false)}
                />
              )}
            </AnimatePresence>

            {/* 3D Canvas */}
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

            {/* 控制按钮 */}
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
