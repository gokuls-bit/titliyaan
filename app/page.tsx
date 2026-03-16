"use client";

import { useEffect, useState } from "react";
import BackgroundSky from "@/components/BackgroundSky";
import AnimatedParticles from "@/components/AnimatedParticles";
import NameReveal from "@/components/NameReveal";
import MusicPlayer from "@/components/MusicPlayer";
import SmileBurst from "@/components/SmileBurst";

export default function Home() {
  const [scene, setScene] = useState<"floating" | "gathering" | "stabilized" | "releasing">("floating");
  const [showName, setShowName] = useState(false);
  const [smileTrigger, setSmileTrigger] = useState(false);
  const [bigBurst, setBigBurst] = useState(false);

  useEffect(() => {
    // Scene Sequence
    const timers = [
      setTimeout(() => setScene("gathering"), 5000), 
      setTimeout(() => {
        setScene("stabilized");
        setShowName(true);
      }, 8000), 
      setTimeout(() => {
        setScene("releasing");
        setShowName(true); 
      }, 16000),
      // Massive Big Burst after name has been visible for a while
      setTimeout(() => {
        setBigBurst(true);
        setTimeout(() => setBigBurst(false), 1000);
      }, 25000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSendSmile = () => {
    setSmileTrigger(true);
    setBigBurst(true); // Trigger big burst on manual click too
    setTimeout(() => {
      setSmileTrigger(false);
      setBigBurst(false);
    }, 2000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundSky />
      
      <AnimatedParticles 
        scene={scene} 
        onSendSmile={smileTrigger} 
      />
      
      <NameReveal 
        show={showName} 
        onButtonClick={handleSendSmile} 
      />
      
      <SmileBurst trigger={bigBurst} />
      
      <MusicPlayer />

      {/* Subtle Bottom Credit or Hidden Element */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 opacity-20 text-[10px] uppercase tracking-[0.2em] pointer-events-none">
        Crafted with love
      </div>
    </main>
  );
}
