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
  return <div className="relative" data-unique-id="7bdb394a-f6f2-4772-977d-eca56d01e20b" data-loc="35:9-35:35" data-file-name="components/GamePlatform.tsx">
      {/* Main ground with entrance animation */}
      <motion.div className="h-[100px] bg-[#8B4513] w-full relative" initial="initial" animate="animate" variants={platformVariants} transition={{
      duration: 0.5
    }} data-unique-id="3c63d45b-d0c3-4707-b95b-99da88434a52" data-loc="37:6-39:7" data-file-name="components/GamePlatform.tsx">
        {/* Grass top with subtle animation */}
        <div className="h-[20px] bg-green-800 w-full absolute top-0 left-0 overflow-hidden" data-unique-id="188ba897-7dec-4bee-8833-33133d6a6cd9" data-loc="41:8-41:92" data-file-name="components/GamePlatform.tsx">
          {/* Animated grass blades */}
          <div className="flex justify-between px-2" data-unique-id="f751f86a-6a61-4dc9-98a7-4d87e345e8e5" data-loc="43:10-43:53" data-file-name="components/GamePlatform.tsx">
            {Array.from({
            length: 40
          }).map((_, index) => <motion.div key={`grass-${index}`} className="w-1 h-3 bg-green-600 rounded-t-sm origin-bottom" variants={grassVariants} animate="animate" transition={{
            delay: index * 0.05 % 0.5
          }} style={{
            marginTop: -3
          }} data-unique-id="9bedd29d-48e4-4b29-9eff-f6dc0a803f80" data-loc="46:31-50:15" data-file-name="components/GamePlatform.tsx" />)}
          </div>
        </div>
        
        {/* Brick texture using grid with staggered animation */}
        <div className="absolute top-[20px] left-0 right-0 bottom-0 grid grid-cols-12" data-unique-id="b90d71ae-0a23-48e2-a0f6-d5507f2d5749" data-loc="55:8-55:87" data-file-name="components/GamePlatform.tsx">
          {Array.from({
          length: 48
        }).map((_, index) => <motion.div key={index} className="border-[1px] border-[#5D3000] bg-[#8B4513]" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5 + index % 12 * 0.02 + Math.floor(index / 12) * 0.05,
          duration: 0.3
        }} data-unique-id="8b0ccef9-b6de-4405-9eb0-8a9854b4bfbc" data-loc="58:29-65:13" data-file-name="components/GamePlatform.tsx" />)}
        </div>
      </motion.div>
    </div>;
}