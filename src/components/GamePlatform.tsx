"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export default function GamePlatform() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants for the platform
  const platformVariants = {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1
    }
  };

  // Animation variants for grass blades
  const grassVariants = {
    animate: {
      scaleY: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };
  if (!mounted) return null;
  return <div className="relative" data-unique-id="02d2db9a-dc61-4261-9611-776dd1aa4759" data-loc="35:9-35:35" data-file-name="components/GamePlatform.tsx">
      {/* Main ground with entrance animation */}
      <motion.div className="h-[100px] bg-[#8B4513] w-full relative" initial="initial" animate="animate" variants={platformVariants} transition={{
      duration: 0.5
    }} data-unique-id="80feae86-4c7e-4881-bd8c-28c22b7a919f" data-loc="37:6-39:7" data-file-name="components/GamePlatform.tsx">
        {/* Grass top with subtle animation */}
        <div className="h-[20px] bg-green-800 w-full absolute top-0 left-0 overflow-hidden" data-unique-id="1c47b33e-0b96-4284-a52a-a99da99dd1c9" data-loc="41:8-41:92" data-file-name="components/GamePlatform.tsx">
          {/* Animated grass blades */}
          <div className="flex justify-between px-2" data-unique-id="20b4e959-8901-496e-a46d-c74433624030" data-loc="43:10-43:53" data-file-name="components/GamePlatform.tsx">
            {Array.from({
            length: 40
          }).map((_, index) => <motion.div key={`grass-${index}`} className="w-1 h-3 bg-green-600 rounded-t-sm origin-bottom" variants={grassVariants} animate="animate" transition={{
            delay: index * 0.05 % 0.5
          }} style={{
            marginTop: -3
          }} data-unique-id="0fa970e8-c953-411a-86b3-b759a0592792" data-loc="46:31-50:15" data-file-name="components/GamePlatform.tsx" />)}
          </div>
        </div>
        
        {/* Brick texture using grid with staggered animation */}
        <div className="absolute top-[20px] left-0 right-0 bottom-0 grid grid-cols-12" data-unique-id="9261763e-8e2d-4ae9-a14d-37ab1ed84899" data-loc="55:8-55:87" data-file-name="components/GamePlatform.tsx">
          {Array.from({
          length: 48
        }).map((_, index) => <motion.div key={index} className="border-[1px] border-[#5D3000] bg-[#8B4513]" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5 + index % 12 * 0.02 + Math.floor(index / 12) * 0.05,
          duration: 0.3
        }} data-unique-id="d98585d5-075a-419b-886d-433cffddd523" data-loc="58:29-65:13" data-file-name="components/GamePlatform.tsx" />)}
        </div>
      </motion.div>
    </div>;
}