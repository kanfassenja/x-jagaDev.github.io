"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
interface LevelSectionProps {
  level: {
    id: string;
    title: string;
    bgColor: string;
    icon?: string;
    description?: string;
  };
  children: ReactNode;
}

// Define animation variants for different level transitions
const levelAnimations: Record<string, Variants> = {
  intro: {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 1.2
    }
  },
  education: {
    initial: {
      x: '100%',
      opacity: 0
    },
    animate: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: '-100%',
      opacity: 0
    }
  },
  experience: {
    initial: {
      y: '100%',
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: '-100%',
      opacity: 0
    }
  },
  skills: {
    initial: {
      rotateY: 90,
      opacity: 0
    },
    animate: {
      rotateY: 0,
      opacity: 1
    },
    exit: {
      rotateY: -90,
      opacity: 0
    }
  },
  portfolio: {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    exit: {
      scale: 0,
      opacity: 0
    }
  },
  contact: {
    initial: {
      opacity: 0,
      filter: 'blur(10px)'
    },
    animate: {
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)'
    }
  }
};

// Default animation if level doesn't have a specific one
const defaultAnimation: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};
export default function LevelSection({
  level,
  children
}: LevelSectionProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure animations run after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the appropriate animation for this level
  const animation = levelAnimations[level.id] || defaultAnimation;

  // Title animation variants
  const titleVariants: Variants = {
    initial: {
      y: -50,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  };

  // Cloud animation variants
  const cloudVariants: Variants = {
    animate: {
      x: [0, 10, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Hill animation variants
  const hillVariants: Variants = {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.2
      }
    }
  };
  if (!mounted) return null;
  return <motion.div key={level.id} initial="initial" animate="animate" exit="exit" variants={animation} transition={{
    duration: 0.8,
    ease: "easeInOut"
  }} className="relative min-h-screen w-full overflow-hidden" data-unique-id="483e80fe-d26a-4673-8851-dd61df5b8aaf" data-loc="174:9-177:62" data-file-name="components/LevelSection.tsx">
      {/* Level title with its own animation */}
      <motion.div className="absolute top-20 left-0 right-0 flex flex-col items-center z-30" variants={titleVariants} data-unique-id="7767daeb-af2d-4e56-8a41-530a14186f7d" data-loc="179:6-179:118" data-file-name="components/LevelSection.tsx">
        <div className={`${level.bgColor} text-white text-2xl font-bold py-2 px-8 rounded-lg border-4 border-white shadow-lg flex items-center gap-2`} data-unique-id="6df13a76-b699-40df-84c2-052f7bc980a8" data-loc="180:8-180:151" data-file-name="components/LevelSection.tsx">
          {level.icon && <span className="text-2xl" data-unique-id="8a7d7bc1-4e73-49f1-be3e-1fb421bf15bd" data-loc="181:25-181:52" data-file-name="components/LevelSection.tsx">{level.icon}</span>}
          {level.title}
        </div>
        
        {/* Level description */}
        {level.description && <motion.p className="mt-3 text-white text-center max-w-md bg-black bg-opacity-50 px-4 py-2 rounded-lg" initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.5
      }} data-unique-id="bd16ee2b-c93c-437e-affd-53d3b7c1beb5" data-loc="187:10-192:11" data-file-name="components/LevelSection.tsx">
            {level.description}
          </motion.p>}
      </motion.div>
      
      {/* Animated clouds */}
      <motion.div className="absolute top-10 left-1/4 w-32 h-20 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" data-unique-id="8aff17aa-121e-4585-af8f-3f9078d692ec" data-loc="199:6-199:141" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute top-20 left-1/4 translate-x-4 w-24 h-16 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" transition={{
      delay: 1.5
    }} data-unique-id="03759d8b-bf94-47e1-93b9-11232f072da6" data-loc="200:6-202:7" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute top-15 right-1/4 w-36 h-24 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" transition={{
      delay: 0.8
    }} data-unique-id="45910d48-0f5f-4e87-9dca-f2a859148b3f" data-loc="203:6-205:7" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute top-30 right-1/4 translate-x-8 w-28 h-18 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" transition={{
      delay: 2.2
    }} data-unique-id="c43168ae-b232-4ea2-b6e1-6d58fe35f2f9" data-loc="206:6-208:7" data-file-name="components/LevelSection.tsx"></motion.div>
      
      {/* Animated hills */}
      <motion.div className="absolute bottom-[100px] left-0 w-64 h-32 bg-green-700 rounded-t-full" variants={hillVariants} data-unique-id="b0c2d912-bfc8-422d-80df-eb15ca43118c" data-loc="211:6-211:123" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute bottom-[100px] right-0 w-80 h-40 bg-green-700 rounded-t-full" variants={hillVariants} transition={{
      delay: 0.4
    }} data-unique-id="83e1d01f-df1c-4d86-b285-7503a1fc54f2" data-loc="212:6-214:7" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute bottom-[100px] left-1/2 w-72 h-36 bg-green-700 rounded-t-full" variants={hillVariants} transition={{
      delay: 0.6
    }} data-unique-id="3917a441-072d-4d50-8dab-8eae1944858e" data-loc="215:6-217:7" data-file-name="components/LevelSection.tsx"></motion.div>
      
      {/* Render children (game elements) */}
      {children}
    </motion.div>;
}