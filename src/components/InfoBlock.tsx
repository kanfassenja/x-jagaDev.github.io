"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
interface InfoBlockProps {
  onClick: () => void;
}
export default function InfoBlock({
  onClick
}: InfoBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFloating, setIsFloating] = useState(true);

  // Floating animation
  useEffect(() => {
    setIsFloating(true);
    return () => setIsFloating(false);
  }, []);
  const handleClick = () => {
    setIsClicked(true);
    onClick();

    // Reset the block after animation completes
    setTimeout(() => setIsClicked(false), 500);
  };

  // Enhanced block animations
  const blockVariants = {
    hover: {
      scale: 1.1,
      boxShadow: "0px 0px 15px rgba(255, 208, 104, 0.7)",
      rotate: [0, 2, -2, 0],
      transition: {
        rotate: {
          duration: 0.5,
          repeat: 1
        }
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 0px 5px rgba(255, 208, 104, 0.3)"
    },
    clicked: {
      y: [0, -30, 0],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1]
      }
    },
    float: {
      y: [0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  // Question mark animation
  const questionMarkVariants = {
    hover: {
      scale: [1, 1.2, 1],
      color: ["#FFFFFF", "#FFD700", "#FFFFFF"],
      transition: {
        duration: 1,
        repeat: Infinity
      }
    },
    rest: {
      scale: 1,
      color: "#FFFFFF"
    }
  };

  // Tooltip animation
  const tooltipVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };
  return <motion.div whileHover="hover" whileTap="tap" animate={isClicked ? "clicked" : isFloating ? "float" : "rest"} variants={blockVariants} className="relative cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick} data-unique-id="5e288b1f-6c87-4a0e-ace3-c3552b1c1fd4" data-loc="96:9-96:283" data-file-name="components/InfoBlock.tsx">
      {/* Question mark block with enhanced styling */}
      <div className="w-16 h-16 bg-[#E8A010] border-4 border-b-[#986008] border-r-[#986008] border-t-[#FFD068] border-l-[#FFD068] rounded-lg flex items-center justify-center overflow-hidden relative" data-unique-id="65dca4b6-4d93-487f-8af1-97e6300f38a1" data-loc="98:6-98:200" data-file-name="components/InfoBlock.tsx">
        {/* Animated background pattern */}
        <motion.div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(45deg, #986008 25%, transparent 25%, transparent 50%, #986008 50%, #986008 75%, transparent 75%, transparent)",
        backgroundSize: "8px 8px"
      }} animate={{
        backgroundPosition: ["0px 0px", "8px 8px"]
      }} transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }} data-unique-id="c270d00f-6b2d-487f-a18a-36022689952e" data-loc="100:8-109:11" data-file-name="components/InfoBlock.tsx" />
        
        {/* Animated question mark */}
        <motion.span className="text-white text-2xl font-bold relative z-10" variants={questionMarkVariants} data-unique-id="4e4e721d-b5b1-4ca5-afa3-ca2e1cd61856" data-loc="112:8-112:109" data-file-name="components/InfoBlock.tsx">
          ?
        </motion.span>
        
        {/* Shine effect */}
        <motion.div className="absolute inset-0 bg-white opacity-0" animate={{
        opacity: [0, 0.3, 0],
        left: ["-100%", "100%"],
        top: ["-100%", "100%"]
      }} transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }} style={{
        width: "50%",
        height: "50%",
        transform: "rotate(45deg)",
        filter: "blur(5px)"
      }} data-unique-id="981fd28f-77fa-4525-9485-8b555dcf769d" data-loc="117:8-130:11" data-file-name="components/InfoBlock.tsx" />
      </div>
      
      {/* Hover tooltip with animation */}
      <AnimatePresence>
        {isHovered && <motion.div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded whitespace-nowrap" variants={tooltipVariants} initial="hidden" animate="visible" exit="hidden" data-unique-id="b8e1b853-774c-4f36-9035-afd49870a1c6" data-loc="135:22-135:253" data-file-name="components/InfoBlock.tsx">
            Click for info
          </motion.div>}
      </AnimatePresence>
    </motion.div>;
}