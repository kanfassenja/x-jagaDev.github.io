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

  // Special animation for intro level
  const introSpecialVariants: Variants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5
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
  }} className="relative min-h-screen w-full overflow-hidden" data-unique-id="a5931294-e46a-4189-a45f-e1c8c315b809" data-loc="183:9-186:62" data-file-name="components/LevelSection.tsx">
      {/* Level title with its own animation */}
      <motion.div className="absolute top-20 left-0 right-0 flex flex-col items-center z-30" variants={titleVariants} data-unique-id="f2eea9f3-b483-4912-ad47-d59a186fae89" data-loc="188:6-188:118" data-file-name="components/LevelSection.tsx">
        <div className={`${level.bgColor} text-white text-2xl font-bold py-2 px-8 rounded-lg border-4 border-white shadow-lg flex items-center gap-2`} data-unique-id="90cbeb1a-d06f-46f9-ab78-addd083d0a51" data-loc="189:8-189:151" data-file-name="components/LevelSection.tsx">
          {level.icon && <span className="text-2xl" data-unique-id="b2e68b0b-1704-4000-91d7-a772e4b0aeda" data-loc="190:25-190:52" data-file-name="components/LevelSection.tsx">{level.icon}</span>}
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
      }} data-unique-id="1c2261d3-1a3c-43f7-8d45-fe69160e2baf" data-loc="195:30-203:9" data-file-name="components/LevelSection.tsx">
            {level.description}
          </motion.p>}
      </motion.div>
      
      {/* Animated clouds */}
      <motion.div className="absolute top-10 left-1/4 w-32 h-20 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" data-unique-id="870daec2-e215-40c8-b39c-c47c38044f7a" data-loc="209:6-209:141" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute top-20 left-1/4 translate-x-4 w-24 h-16 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" transition={{
      delay: 1.5
    }} data-unique-id="53bd4d14-a898-4ee7-960a-5e5fdddef77b" data-loc="210:6-212:7" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute top-15 right-1/4 w-36 h-24 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" transition={{
      delay: 0.8
    }} data-unique-id="73b627ec-af5f-434f-bd21-544a644a82a0" data-loc="213:6-215:7" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute top-30 right-1/4 translate-x-8 w-28 h-18 bg-white rounded-full opacity-80" variants={cloudVariants} animate="animate" transition={{
      delay: 2.2
    }} data-unique-id="16b4d122-aa3f-4654-947c-9aea63046691" data-loc="216:6-218:7" data-file-name="components/LevelSection.tsx"></motion.div>
      
      {/* Special animations for intro level */}
      {level.id === "intro" && <>
          <motion.div className="absolute top-1/3 left-10 w-16 h-16 text-5xl" initial={{
        opacity: 0,
        scale: 0,
        rotate: -180
      }} animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -15, 0]
      }} transition={{
        delay: 2,
        duration: 3,
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }} data-unique-id="ca3e2a78-9b08-41d6-826e-c90e290fe382" data-loc="223:10-241:11" data-file-name="components/LevelSection.tsx">
            🚀
          </motion.div>
          
          <motion.div className="absolute bottom-1/3 right-20 w-16 h-16 text-5xl" initial={{
        opacity: 0,
        scale: 0
      }} animate={{
        opacity: 1,
        scale: 1,
        y: [0, -20, 0],
        x: [0, 10, 0]
      }} transition={{
        delay: 2.5,
        duration: 0.5,
        y: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        },
        x: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }
      }} data-unique-id="c1aba5ea-5408-47aa-ba0b-857c7108cdf1" data-loc="245:10-268:11" data-file-name="components/LevelSection.tsx">
            💻
          </motion.div>
          
          <motion.div className="absolute top-1/2 right-1/4 w-16 h-16 text-5xl" initial={{
        opacity: 0,
        y: 100
      }} animate={{
        opacity: 1,
        y: 0,
        rotate: [0, 10, -10, 0]
      }} transition={{
        delay: 3,
        duration: 1,
        rotate: {
          duration: 4,
          repeat: Infinity
        }
      }} data-unique-id="324d72c7-bc7f-4e77-9db4-56425626ee3c" data-loc="272:10-288:11" data-file-name="components/LevelSection.tsx">
            🎨
          </motion.div>
        </>}
      
      {/* Animated hills */}
      <motion.div className="absolute bottom-[100px] left-0 w-64 h-32 bg-green-700 rounded-t-full" variants={hillVariants} data-unique-id="ad9668ca-3df5-4c9a-81ce-81ee633d76ae" data-loc="295:6-295:123" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute bottom-[100px] right-0 w-80 h-40 bg-green-700 rounded-t-full" variants={hillVariants} transition={{
      delay: 0.4
    }} data-unique-id="443ab1de-0eb5-447c-8e8c-600d5dd212ed" data-loc="296:6-298:7" data-file-name="components/LevelSection.tsx"></motion.div>
      <motion.div className="absolute bottom-[100px] left-1/2 w-72 h-36 bg-green-700 rounded-t-full" variants={hillVariants} transition={{
      delay: 0.6
    }} data-unique-id="63a1ae85-3d06-46ed-9264-2d66356446d0" data-loc="299:6-301:7" data-file-name="components/LevelSection.tsx"></motion.div>
      
      {/* Render children (game elements) */}
      {children}
    </motion.div>;
}