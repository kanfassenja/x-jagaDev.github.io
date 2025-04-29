"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
interface MarioCharacterProps {
  position: {
    x: number;
    y: number;
  };
}
export default function MarioCharacter({
  position
}: MarioCharacterProps) {
  const [direction, setDirection] = useState("right");
  const [isJumping, setIsJumping] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastX, setLastX] = useState(position.x);

  // Update direction and movement state based on position changes
  useEffect(() => {
    const checkDirection = () => {
      if (position.x > lastX) {
        setDirection("right");
        setIsMoving(true);
      } else if (position.x < lastX) {
        setDirection("left");
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }
      setLastX(position.x);
    };
    checkDirection();

    // Reset moving state after a short delay
    if (isMoving) {
      const timer = setTimeout(() => {
        setIsMoving(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [position.x, lastX]);

  // Detect jumping state
  useEffect(() => {
    if (position.y < 0) {
      setIsJumping(true);
    } else {
      setIsJumping(false);
    }
  }, [position.y]);

  // Animation variants for different character states
  const characterVariants = {
    idle: {
      y: [0, -2, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    },
    moving: {
      y: [0, -3, 0],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    },
    jumping: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5
      }
    }
  };

  // Leg animation variants
  const legVariants = {
    idle: {},
    moving: (side: string) => ({
      rotate: side === "left" ? [0, 15, 0, -15, 0] : [0, -15, 0, 15, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    })
  };

  // Arm animation variants
  const armVariants = {
    idle: {},
    moving: (side: string) => ({
      rotate: side === "left" ? [0, -15, 0, 15, 0] : [0, 15, 0, -15, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }),
    jumping: {
      y: -5,
      transition: {
        duration: 0.5
      }
    }
  };
  return <motion.div animate={{
    x: position.x,
    y: position.y
  }} transition={{
    type: "spring",
    stiffness: 500,
    damping: 30
  }} className="absolute bottom-[120px] z-20" style={{
    left: 0
  }} data-unique-id="7d70b466-d166-439b-9a71-ac834e4cfcaa" data-loc="110:9-119:5" data-file-name="components/MarioCharacter.tsx">
      <motion.div className="relative w-16 h-24" animate={isJumping ? "jumping" : isMoving ? "moving" : "idle"} variants={characterVariants} data-unique-id="309c4237-1aa2-41f1-885e-6f8ceb1b4a03" data-loc="120:6-120:141" data-file-name="components/MarioCharacter.tsx">
        {/* Character sprite - using div with styling for simplicity */}
        <div className="w-16 h-24 relative" style={{
        backgroundColor: "#ff0000",
        // Red overalls
        borderRadius: "50% 50% 0 0",
        position: "relative",
        overflow: "hidden"
      }} data-unique-id="efcebb87-3271-4dac-8af1-f29874e808ea" data-loc="122:8-128:9" data-file-name="components/MarioCharacter.tsx">
          {/* Face */}
          <div className="absolute top-2 left-0 right-0 mx-auto w-12 h-8 bg-[#ffcc99] rounded-full" style={{
          transform: direction === "left" ? "scaleX(-1)" : "none"
        }} data-unique-id="57ee016d-33be-48ca-94b8-77317581add6" data-loc="130:10-132:11" data-file-name="components/MarioCharacter.tsx">
            {/* Eyes */}
            <motion.div className="absolute top-2 left-2 w-2 h-2 bg-black rounded-full" animate={isJumping ? {
            scaleY: 0.7
          } : {
            scaleY: 1
          }} data-unique-id="0440fa00-8280-419f-a4c5-e2343bdb596c" data-loc="134:12-138:13" data-file-name="components/MarioCharacter.tsx"></motion.div>
            <motion.div className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full" animate={isJumping ? {
            scaleY: 0.7
          } : {
            scaleY: 1
          }} data-unique-id="f87f977d-500b-4b25-ab8d-6892ef7455f3" data-loc="139:12-143:13" data-file-name="components/MarioCharacter.tsx"></motion.div>
            
            {/* Mustache */}
            <div className="absolute bottom-0 left-0 right-0 mx-auto w-10 h-2 bg-[#663300] rounded-lg" data-unique-id="e595d38f-28f1-4dbf-928d-abe276330b4c" data-loc="146:12-146:103" data-file-name="components/MarioCharacter.tsx"></div>
          </div>

          {/* Hat */}
          <div className="absolute top-0 left-0 right-0 mx-auto w-14 h-4 bg-[#ff0000] rounded-t-lg" data-unique-id="dc5de887-3e4a-4ad1-918a-22f81fb4b224" data-loc="150:10-150:100" data-file-name="components/MarioCharacter.tsx"></div>

          {/* Body */}
          <div className="absolute bottom-0 left-0 right-0 mx-auto w-14 h-12 bg-blue-700 rounded-lg" data-unique-id="a3a1dd69-310d-455a-8d28-de8db1e4fa1c" data-loc="153:10-153:101" data-file-name="components/MarioCharacter.tsx"></div>

          {/* Hands with animation */}
          <motion.div className={`absolute bottom-8 ${direction === "left" ? "left-[-4px]" : "right-[-4px]"} w-4 h-4 bg-[#ffcc99] rounded-full`} variants={armVariants} custom="right" animate={isJumping ? "jumping" : isMoving ? "moving" : "idle"} data-unique-id="90cb6dc0-73af-4828-96c8-6f864aad6bd6" data-loc="156:10-156:246" data-file-name="components/MarioCharacter.tsx"></motion.div>
          <motion.div className={`absolute bottom-8 ${direction === "left" ? "right-[-4px]" : "left-[-4px]"} w-4 h-4 bg-[#ffcc99] rounded-full`} variants={armVariants} custom="left" animate={isJumping ? "jumping" : isMoving ? "moving" : "idle"} data-unique-id="ba2b49d4-f7f8-4829-a68f-a2ec57acd25f" data-loc="157:10-157:245" data-file-name="components/MarioCharacter.tsx"></motion.div>

          {/* Feet with animation */}
          <motion.div className="absolute bottom-[-4px] left-1 w-6 h-4 bg-[#663300] rounded" variants={legVariants} custom="left" animate={isMoving && !isJumping ? "moving" : "idle"} data-unique-id="ee981215-adad-4b70-b3c1-28a3192d5ed1" data-loc="160:10-160:183" data-file-name="components/MarioCharacter.tsx"></motion.div>
          <motion.div className="absolute bottom-[-4px] right-1 w-6 h-4 bg-[#663300] rounded" variants={legVariants} custom="right" animate={isMoving && !isJumping ? "moving" : "idle"} data-unique-id="5230dfc7-1cb4-40ef-8ebe-e78362fda1dd" data-loc="161:10-161:185" data-file-name="components/MarioCharacter.tsx"></motion.div>
          
          {/* Shadow */}
          <motion.div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-black rounded-full opacity-30" animate={isJumping ? {
          scale: 0.7,
          opacity: 0.2
        } : {
          scale: 1,
          opacity: 0.3
        }} data-unique-id="94433ea8-3a0e-4a2b-a5ea-e13711569074" data-loc="164:10-170:11" data-file-name="components/MarioCharacter.tsx"></motion.div>
        </div>
      </motion.div>
    </motion.div>;
}