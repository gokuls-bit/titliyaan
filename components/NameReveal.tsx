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
  "“Sending you a pocket full of sunshine.”"
];

export default function NameReveal({ show, onButtonClick }: NameRevealProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (show) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % SWEET_MESSAGES.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [show]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none">
      <AnimatePresence>
        {show && (
          <div className="text-center flex flex-col items-center">
            {/* Arushi Bhatia */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{
                duration: 2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-7xl md:text-9xl font-bold tracking-widest mb-6 px-4"
              style={{
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                background: "linear-gradient(to bottom, #ffffff, #a5a5a5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))",
              }}
            >
              Arushi 🤍
            </motion.h1>

            {/* Cycling Sweet Messages */}
            <div className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={messageIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                  className="text-gray-400 italic text-xl md:text-2xl font-light tracking-wide px-6"
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
              onClick={onButtonClick}
              className="pointer-events-auto mt-8 px-10 py-4 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl text-purple-200 hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.1)] active:scale-95 group font-medium"
            >
              <span className="flex items-center gap-2">
                Send a Smile
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  ✨
                </motion.span>
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
