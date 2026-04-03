"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface NameRevealProps {
  show: boolean;
  onButtonClick: () => void;
}

const SWEET_MESSAGES = [
  "“Just a small moment of calm in a busy day.”",
  "“Your smile makes the world a little brighter.”",
  "“May your day be as beautiful as your heart.”",
  "“You are a masterpiece of grace and light.”",
  "“Sending you a pocket full of sunshine.”",
  "“You make the ordinary moments extraordinary.”",
  "“A soul as bright as the morning sun.”",
  "“Wishing you endless joy and peaceful thoughts.”"
];

// Pre-generated static positions to avoid hydration mismatch on reload
const PARTICLES = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: Math.random() * 10 + 10,
  delay: Math.random() * 5,
}));

export default function NameReveal({ show, onButtonClick }: NameRevealProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % SWEET_MESSAGES.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [show]);

  const handleInteraction = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add a burst effect at the click coordinates relative to the viewport
    const newBurst = { id: Date.now(), x: e.clientX, y: e.clientY };
    setBursts((prev) => [...prev, newBurst]);
    
    // Clean up the burst after animation ends
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== newBurst.id));
    }, 1000);

    onButtonClick();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      
      {/* Ambient Floating Particles */}
      <AnimatePresence>
        {show && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-white/20 blur-[1px]"
                style={{
                  width: p.size,
                  height: p.size,
                  left: p.left,
                  top: p.top,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {show && (
          <div className="text-center flex flex-col items-center z-10">
            {/* Main Name with intro + continuous floating animation */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: [0, -10, 0], 
              }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2 // Start floating after entrance
                },
                default: {
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1],
                }
              }}
              className="text-7xl md:text-9xl font-bold tracking-widest mb-6 px-4"
              style={{
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                background: "linear-gradient(to bottom, #ffffff, #d8b4e2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(216, 180, 226, 0.4))",
              }}
            >
              Arushi 🤍
            </motion.h1>

            {/* Cycling Sweet Messages */}
            <div className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-zinc-300 italic text-xl md:text-2xl font-light tracking-wide px-6"
                >
                  {SWEET_MESSAGES[messageIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Interaction Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              onClick={handleInteraction}
              className="pointer-events-auto mt-8 px-10 py-4 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-xl text-purple-100 hover:bg-purple-500/25 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] active:scale-95 group font-medium relative overflow-hidden"
            >
              {/* Button Shine Effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <span className="flex items-center gap-2 relative z-10">
                Send a Smile
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  ✨
                </motion.span>
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Heart Bursts on Click */}
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          initial={{ opacity: 1, scale: 0.5, x: burst.x, y: burst.y }}
          animate={{
            opacity: 0,
            scale: 1.5,
            y: burst.y - 100,
            x: burst.x + (Math.random() * 60 - 30),
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="fixed pointer-events-none text-2xl z-50 drop-shadow-lg"
          style={{ left: 0, top: 0, marginLeft: "-12px", marginTop: "-12px" }}
        >
          🤍
        </motion.div>
      ))}
    </div>
  );
}
