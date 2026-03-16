"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundSky() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* Jet Black Base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Distant Nebula/Glow for Night Sky Depth */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 blur-[150px]"
      />

      {/* High-Density Shimmering Stars */}
      {[...Array(200)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random(),
            scale: Math.random() * 0.4 + 0.3
          }}
          animate={{ 
            opacity: [0.1, 0.9, 0.1],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 10
          }}
          className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
        />
      ))}

      {/* Floating Sparkles/Dust */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            y: "-=50",
            opacity: [0, 0.2, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 20
          }}
          className="absolute w-[1px] h-[1px] bg-purple-200"
        />
      ))}

      {/* Minimal Texture to maintain Night Sky feel */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" fill="transparent" />
        </svg>
      </div>
    </div>
  );
}
