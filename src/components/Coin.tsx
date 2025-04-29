"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
interface CoinProps {
  position: {
    x: number;
    y: number;
  };
}
export default function Coin({
  position
}: CoinProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced animation for coin rotation with shine effect
  const rotationVariants = {
    rotate: {
      scaleX: [1, 0.5, 0.1, 0.5, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    },
    hover: {
      y: [-3, 3, -3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    },
    collected: {
      y: -50,
      opacity: 0,
      scale: 1.5,
      transition: {
        duration: 0.5
      }
    }
  };

  // Shine effect animation
  const shineVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  return isVisible ? <motion.div className="absolute z-10 cursor-pointer" style={{
    left: position.x,
    bottom: position.y
  }} animate={isRotating ? "rotate" : {}} whileHover="hover" variants={rotationVariants} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} data-unique-id="95dc5d72-2bfe-407a-bb35-bfcc19411d37" data-loc="58:21-61:168" data-file-name="components/Coin.tsx">
      <motion.div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center" initial={{
      opacity: 0,
      scale: 0
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: Math.random() * 0.5
    }} data-unique-id="1432292b-f114-4601-bca5-35fbc8087bf7" data-loc="62:6-73:7" data-file-name="components/Coin.tsx">
        <div className="w-1 h-4 bg-yellow-600 rounded-full" data-unique-id="d01ee5cb-71a8-4d42-815d-9b982e279559" data-loc="74:8-74:60" data-file-name="components/Coin.tsx"></div>
        
        {/* Shine effect */}
        <motion.div className="absolute inset-0 bg-white rounded-full" style={{
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
      }} variants={shineVariants} animate="animate" data-unique-id="7c932d30-e136-4f6f-89ac-12a060bc6219" data-loc="77:8-79:54" data-file-name="components/Coin.tsx" />
        
        {/* Hover glow effect */}
        {isHovered && <motion.div className="absolute -inset-1 bg-yellow-300 rounded-full -z-10" initial={{
        opacity: 0
      }} animate={{
        opacity: 0.6
      }} exit={{
        opacity: 0
      }} data-unique-id="dac432de-8064-4c9c-bc38-a922b96881e3" data-loc="82:22-88:11" data-file-name="components/Coin.tsx" />}
      </motion.div>
    </motion.div> : null;
}