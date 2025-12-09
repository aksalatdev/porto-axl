"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // Default: audio off

  useEffect(() => {
    setMounted(true);

    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            removeEventListeners();
          })
          .catch((error) => {
            console.log("Playback failed:", error);
          });
      }
    };

    const addEventListeners = () => {
      document.addEventListener("click", startAudio);
      document.addEventListener("keydown", startAudio);
      document.addEventListener("touchstart", startAudio);
    };

    const removeEventListeners = () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };

    addEventListeners();

    return () => {
      removeEventListeners();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted/80 transition-colors"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="h-6 w-6" />
        ) : (
          <VolumeX className="h-6 w-6" />
        )}
      </button>
      <audio ref={audioRef} src="/music/background-music.mp3" loop preload="auto" />
    </div>
  );
}
