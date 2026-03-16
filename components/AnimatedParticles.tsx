"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticleProps {
  scene: "floating" | "gathering" | "stabilized" | "releasing";
  onSendSmile?: boolean;
}

export default function AnimatedParticles({ scene, onSendSmile }: ParticleProps) {
  const butterflies = useMemo(() => Array.from({ length: 42 }).map((_, i) => ({
    id: `b-${i}`,
    color: [
      "text-pink-400", 
      "text-purple-400", 
      "text-blue-400", 
      "text-yellow-400", 
      "text-cyan-400"
    ][i % 5],
    size: Math.random() * 12 + 12,
    randomX: Math.random() * 100,
    randomY: Math.random() * 100,
    offset: Math.random() * Math.PI * 2,
  })), []);

  const sparrows = useMemo(() => Array.from({ length: 24 }).map((_, i) => ({
    id: `s-${i}`,
    color: [
      "text-red-400/80", 
      "text-orange-400/80", 
      "text-green-400/80", 
      "text-blue-400/80"
    ][i % 4],
    size: Math.random() * 8 + 14,
    randomX: Math.random() * 100,
    randomY: Math.random() * 100,
    offset: Math.random() * Math.PI * 2,
  })), []);

  const flowers = useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    id: `f-${i}`,
    color: i % 2 === 0 ? "text-rose-400/40" : "text-violet-400/40",
    size: Math.random() * 10 + 20,
    randomX: Math.random() * 100,
    randomY: Math.random() * 100,
  })), []);

  const innerParticles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: `p-${i}`,
    color: "bg-yellow-300/60",
    size: Math.random() * 4 + 2,
    randomX: Math.random() * 100,
    randomY: Math.random() * 100,
    offset: Math.random() * Math.PI * 2,
  })), []);

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Flowers - Extra Layer */}
      {flowers.map((f, i) => {
        const circlePos = getPosition(i, flowers.length, 320);
        let targetX = `${f.randomX}%`;
        let targetY = `${f.randomY}%`;
        let opacity = 0.3;

        if (scene === "gathering" || scene === "stabilized") {
          targetX = `calc(50% + ${circlePos.x}px)`;
          targetY = `calc(50% + ${circlePos.y}px)`;
          opacity = 0.5;
        } else if (scene === "releasing") {
          opacity = 0;
        }

        return (
          <motion.div
            key={f.id}
            initial={{ left: targetX, top: targetY, opacity: 0 }}
            animate={{ left: targetX, top: targetY, opacity, rotate: 360 }}
            transition={{
              left: { duration: 10 },
              top: { duration: 10 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
            className={`absolute ${f.color}`}
            style={{ width: f.size, height: f.size }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
               <path d="M12,2L13.8,7.5L19.5,7.9L15,11.5L16.4,17.1L12,13.8L7.6,17.1L9,11.5L4.5,7.9L10.2,7.5L12,2Z" />
            </svg>
          </motion.div>
        );
      })}

      {/* Butterflies - Outer Circle */}
      {butterflies.map((b, i) => {
        const circlePos = getPosition(i, butterflies.length, 260);
        
        let targetX = `${b.randomX}%`;
        let targetY = `${b.randomY}%`;
        let opacity = 1;

        if (scene === "gathering" || scene === "stabilized") {
          targetX = `calc(50% + ${circlePos.x}px)`;
          targetY = `calc(50% + ${circlePos.y}px)`;
        } else if (scene === "releasing") {
          targetX = b.randomX < 50 ? "-10%" : "110%";
          targetY = b.randomY < 50 ? "-10%" : "110%";
          opacity = 0;
        }

        return (
          <motion.div
            key={b.id}
            initial={{ left: b.randomX + "%", top: b.randomY + "%", opacity: 0 }}
            animate={{
              left: targetX,
              top: targetY,
              opacity: scene === "floating" ? [0, 1, 1] : opacity,
              scale: onSendSmile ? [1, 1.8, 1] : 1,
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              left: { duration: scene === "floating" ? 12 : 4, ease: "easeInOut" },
              top: { duration: scene === "floating" ? 12 : 4, ease: "easeInOut" },
              rotate: { duration: 0.5, repeat: Infinity },
              scale: { duration: 0.5 },
              opacity: { duration: 2 }
            }}
            className={`absolute ${b.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}
            style={{ width: b.size, height: b.size }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 50 C20 20 0 50 50 80 C100 50 80 20 50 50" fill="currentColor" opacity="0.9" />
                <path d="M50 50 C80 20 100 50 50 80 C0 50 20 20 50 50" fill="currentColor" opacity="0.7" />
            </svg>
          </motion.div>
        );
      })}

      {/* Sparrows - Middle Circle */}
      {sparrows.map((s, i) => {
        const circlePos = getPosition(i, sparrows.length, 190);
        
        let targetX = `${s.randomX}%`;
        let targetY = `${s.randomY}%`;
        let opacity = 0.8;

        if (scene === "gathering" || scene === "stabilized") {
          targetX = `calc(50% + ${circlePos.x}px)`;
          targetY = `calc(50% + ${circlePos.y}px)`;
        } else if (scene === "releasing") {
          targetX = s.randomX < 50 ? "-10%" : "110%";
          targetY = s.randomY < 50 ? "-10%" : "110%";
          opacity = 0;
        }

        return (
          <motion.div
            key={s.id}
            initial={{ left: targetX, top: targetY, opacity: 0 }}
            animate={{
              left: targetX,
              top: targetY,
              opacity: scene === "floating" ? [0, 0.8, 0.8] : opacity,
            }}
            transition={{
              left: { duration: scene === "floating" ? 15 : 3.5, ease: "easeInOut" },
              top: { duration: scene === "floating" ? 15 : 3.5, ease: "easeInOut" },
              opacity: { duration: 2 }
            }}
            className={`absolute ${s.color} drop-shadow-[0_0_5px_currentColor]`}
            style={{ width: s.size, height: s.size }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z" />
            </svg>
          </motion.div>
        );
      })}

      {/* Inner Particles - Inner Circle */}
      {innerParticles.map((p, i) => {
        const circlePos = getPosition(i, innerParticles.length, 120);
        
        let targetX = `${p.randomX}%`;
        let targetY = `${p.randomY}%`;
        let opacity = 0.4;

        if (scene === "gathering" || scene === "stabilized") {
          targetX = `calc(50% + ${circlePos.x}px)`;
          targetY = `calc(50% + ${circlePos.y}px)`;
          opacity = 0.8;
        } else if (scene === "releasing") {
          opacity = 0;
        }

        return (
          <motion.div
            key={p.id}
            initial={{ left: targetX, top: targetY }}
            animate={{
              left: targetX,
              top: targetY,
              opacity: scene === "floating" ? [0, 0.4, 0.4] : opacity,
              scale: scene === "stabilized" ? [1, 1.5, 1] : 1,
            }}
            transition={{
              left: { duration: scene === "floating" ? 8 : 2.5, ease: "easeInOut" },
              top: { duration: scene === "floating" ? 8 : 2.5, ease: "easeInOut" },
              scale: { duration: 2, repeat: Infinity },
              opacity: { duration: 2 }
            }}
            className={`absolute rounded-full ${p.color} blur-[1px]`}
            style={{ width: p.size, height: p.size }}
          />
        );
      })}
    </div>
  );
}
