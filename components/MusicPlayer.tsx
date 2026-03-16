"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Attempt auto-play
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.4;
          await audioRef.current.play();
          setIsPlaying(true);
          setHasStarted(true);
        }
      } catch (err) {
        console.log("Autoplay blocked, waiting for user interaction");
      }
    };

    playAudio();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        setHasStarted(true);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio ref={audioRef} src="/song.mp3" loop />
      
      {!hasStarted && (
        <div className="absolute bottom-16 right-0 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-purple-300 border border-purple-500/20 shadow-lg whitespace-nowrap animate-bounce pointer-events-none">
          Click for Music 🎶
        </div>
      )}

      <button
        onClick={togglePlay}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xl border border-purple-500/30 text-purple-300 hover:bg-black/60 hover:border-purple-500/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] active:scale-95 group"
      >
        {isPlaying ? (
          <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX size={24} className="group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
}
