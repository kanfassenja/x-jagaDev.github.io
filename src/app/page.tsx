"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarioCharacter from "@/components/MarioCharacter";
import LevelSection from "@/components/LevelSection";
import GamePlatform from "@/components/GamePlatform";
import InfoBlock from "@/components/InfoBlock";
import Coin from "@/components/Coin";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Define the CV data structure
const cvData = {
  education: [{
    id: 1,
    degree: "Master of Interactive Media",
    institution: "Digital Arts University",
    year: "2019-2021",
    description: "Graduated with honors. Thesis on 'Gamification in User Experience Design'. Received the Innovation Award for creative digital solutions."
  }, {
    id: 2,
    degree: "Bachelor of Computer Science",
    institution: "Tech Institute of Design",
    year: "2015-2019",
    description: "Specialized in Frontend Development and UI/UX Design. Led the student game development club and organized two successful game jams."
  }, {
    id: 3,
    degree: "Certificate in 3D Animation",
    institution: "Creative Design Academy",
    year: "2018",
    description: "Intensive 6-month program focused on character animation and interactive storytelling techniques."
  }],
  experience: [{
    id: 1,
    role: "Junior UI/UX Designer",
    company: "GameCraft Studios",
    year: "2021-Present",
    description: "Lead designer for award-winning mobile games with over 5 million downloads. Implemented gamification elements that increased user retention by 45%."
  }, {
    id: 2,
    role: "Interactive Developer",
    company: "Digital Experiences Inc.",
    year: "2019-2021",
    description: "Created immersive web experiences for major brands including Nike and Spotify. Specialized in animation-heavy interfaces and interactive storytelling."
  }, {
    id: 3,
    role: "Frontend Developer",
    company: "WebPlay Interactive",
    year: "2017-2019",
    description: "Developed responsive game-like web applications. Implemented particle systems and physics-based animations that increased user engagement metrics by 37%."
  }, {
    id: 4,
    role: "UI Design Intern",
    company: "Pixel Perfect Agency",
    year: "2016-2017",
    description: "Assisted in designing user interfaces for mobile applications. Created icon sets and animation prototypes for client presentations."
  }],
  skills: ["UI/UX Design", "Interactive Prototyping", "Animation", "Game Design", "React", "Three.js", "WebGL", "GSAP", "Framer Motion", "Figma", "Adobe Creative Suite", "Blender", "Unity", "TypeScript", "JavaScript", "HTML5 Canvas", "CSS3", "GLSL Shaders"],
  portfolio: [{
    id: 1,
    title: "Eco Quest",
    description: "An educational game teaching environmental sustainability through interactive challenges",
    technologies: "Unity, C#, Adobe Illustrator",
    link: "ecoquest.example.com",
    image: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?q=80&w=2071&auto=format&fit=crop"
  }, {
    id: 2,
    title: "Immersive Portfolio",
    description: "Award-winning 3D interactive portfolio website with game-like navigation",
    technologies: "Three.js, React, GSAP",
    link: "portfolio.example.com",
    image: "https://picsum.photos/200"
  }, {
    id: 3,
    title: "Rhythm Runner",
    description: "Music-driven endless runner game with procedurally generated levels",
    technologies: "JavaScript, HTML5 Canvas, Web Audio API",
    link: "rhythmrunner.example.com",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop"
  }, {
    id: 4,
    title: "AR Product Visualizer",
    description: "Augmented reality application for furniture visualization in real space",
    technologies: "AR.js, Three.js, React Native",
    link: "arvisualizer.example.com",
    image: "https://picsum.photos/200"
  }],
  achievements: [{
    id: 1,
    title: "Design Innovation Award",
    organization: "Interactive Design Association",
    year: "2022",
    description: "Recognized for pioneering work in gamified user interfaces"
  }, {
    id: 2,
    title: "Best Mobile Experience",
    organization: "App Design Awards",
    year: "2021",
    description: "Won for the Rhythm Runner mobile game design and implementation"
  }, {
    id: 3,
    title: "Speaker",
    organization: "Frontend Development Conference",
    year: "2020",
    description: "Presented on 'Animation Techniques for Engaging User Experiences'"
  }],
  contact: {
    email: "creative.designer@example.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/creativedesigner",
    github: "github.com/creativedev",
    portfolio: "www.creativeportfolio.com",
    twitter: "@creative_dev"
  }
};

// Define level data
const levels = [{
  id: "intro",
  title: "Welcome to My World",
  bgColor: "bg-blue-500",
  content: "intro",
  description: "I'm Mahfudun Niam, a Creative UI/UX Designer and Developer specializing in interactive experiences. Explore my journey through this gamified portfolio!",
  icon: "🎮"
}, {
  id: "education",
  title: "Education Achievements",
  bgColor: "bg-green-600",
  content: "education",
  description: "My academic journey through digital design and interactive media. Each block represents a milestone in my learning path.",
  icon: "🎓"
}, {
  id: "experience",
  title: "Career Adventures",
  bgColor: "bg-yellow-600",
  content: "experience",
  description: "Professional experiences where I've applied my skills to create engaging digital experiences. Each role has been a unique quest!",
  icon: "💼"
}, {
  id: "skills",
  title: "Power-Up Skills",
  bgColor: "bg-red-600",
  content: "skills",
  description: "The tools and technologies I've mastered along my journey. Collect them all to see my complete skill set!",
  icon: "⚡"
}, {
  id: "portfolio",
  title: "Project Gallery",
  bgColor: "bg-purple-600",
  content: "portfolio",
  description: "Featured projects that showcase my creativity and technical abilities. Each one represents a challenge conquered!",
  icon: "🏆"
}, {
  id: "achievements",
  title: "Achievement Unlocked",
  bgColor: "bg-amber-500",
  content: "achievements",
  description: "Awards, recognitions, and special moments that mark significant accomplishments in my professional journey.",
  icon: "🌟"
}, {
  id: "contact",
  title: "Connect With Me",
  bgColor: "bg-emerald-600",
  content: "contact",
  description: "Ready to collaborate? Reach out through any of these channels and let's create something amazing together!",
  icon: "📫"
}];
export default function HomePage() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [playerPosition, setPlayerPosition] = useState({
    x: 50,
    y: 0
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [coins, setCoins] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showModal) return; // Don't move when modal is open

      switch (e.key) {
        case "ArrowRight":
          setPlayerPosition(prev => ({
            ...prev,
            x: Math.min(prev.x + 20, window.innerWidth - 100)
          }));
          break;
        case "ArrowLeft":
          setPlayerPosition(prev => ({
            ...prev,
            x: Math.max(prev.x - 20, 0)
          }));
          break;
        case "ArrowUp":
          // Jump animation logic
          setPlayerPosition(prev => ({
            ...prev,
            y: -50
          }));
          setTimeout(() => setPlayerPosition(prev => ({
            ...prev,
            y: 0
          })), 500);
          break;
        case " ":
          // Spacebar
          if (currentLevel < levels.length - 1) {
            setCurrentLevel(prev => prev + 1);
            setPlayerPosition({
              x: 50,
              y: 0
            });
          }
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLevel, showModal]);

  // Generate random coins for each level
  useEffect(() => {
    const newCoins = [];
    const coinCount = 5;
    for (let i = 0; i < coinCount; i++) {
      newCoins.push(Math.floor(Math.random() * (window.innerWidth - 100)) + 50);
    }
    setCoins(newCoins);
  }, [currentLevel]);

  // Check if player collects a coin
  useEffect(() => {
    const checkCoinCollision = () => {
      const updatedCoins = coins.filter(coinX => {
        const collision = Math.abs(coinX - playerPosition.x) < 30;
        if (collision) {
          setScore(prev => prev + 100);
        }
        return !collision;
      });
      if (updatedCoins.length !== coins.length) {
        setCoins(updatedCoins);
      }
    };
    checkCoinCollision();
  }, [playerPosition, coins]);

  // Handler for clicking info blocks
  const handleInfoClick = (content: any) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Navigate to next level
  const goToNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setPlayerPosition({
        x: 50,
        y: 0
      });
    }
  };

  // Navigate to previous level
  const goToPrevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(prev => prev - 1);
      setPlayerPosition({
        x: 50,
        y: 0
      });
    }
  };
  return <div className="min-h-screen overflow-hidden relative" data-unique-id="a695f81c-c147-4358-838f-9be3c55ea5f5" data-loc="281:9-281:64" data-file-name="app/page.tsx">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500 z-0" data-unique-id="4b54092f-7630-4516-ba37-856ef2aa155e" data-loc="283:6-283:85" data-file-name="app/page.tsx"></div>
      
      {/* Game UI - Score and Level */}
      <div className="fixed top-4 left-4 z-50 bg-yellow-800 text-white px-4 py-2 rounded-lg border-4 border-yellow-600 shadow-lg" data-unique-id="483bf769-2a6d-44b4-9a60-bfd16613c993" data-loc="286:6-286:130" data-file-name="app/page.tsx">
        <div className="flex items-center gap-3" data-unique-id="dfbfcaf3-a3f8-4102-95ac-932d2b99194a" data-loc="287:8-287:49" data-file-name="app/page.tsx">
          <div data-unique-id="44c1d5c4-7dbe-4859-a105-c5a721d1e5c9" data-loc="288:10-288:15" data-file-name="app/page.tsx">
            <span className="font-bold" data-unique-id="91b91d54-ff7b-40b7-b376-903ad9b0a638" data-loc="289:12-289:40" data-file-name="app/page.tsx">SCORE:</span> {score}
          </div>
          <div data-unique-id="b146bcc8-0b08-4081-b976-ca88677736f5" data-loc="291:10-291:15" data-file-name="app/page.tsx">
            <span className="font-bold" data-unique-id="18a6670d-9ab1-4b6d-b6fa-6e826e9f7144" data-loc="292:12-292:40" data-file-name="app/page.tsx">LEVEL:</span> {currentLevel + 1}/{levels.length}
          </div>
        </div>
      </div>

      {/* Level navigation controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2" data-unique-id="fc746815-0eaa-4ca5-9073-c7596a36d7d0" data-loc="298:6-298:59" data-file-name="app/page.tsx">
        <button onClick={goToPrevLevel} disabled={currentLevel === 0} className={`p-2 bg-yellow-500 rounded-full border-4 border-yellow-600 ${currentLevel === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`} data-unique-id="32c796a5-bfe7-469e-b09e-17eec59a3c09" data-loc="299:8-299:222" data-file-name="app/page.tsx">
          <ChevronLeft size={24} className="text-yellow-900" />
        </button>
        <button onClick={goToNextLevel} disabled={currentLevel === levels.length - 1} className={`p-2 bg-yellow-500 rounded-full border-4 border-yellow-600 ${currentLevel === levels.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`} data-unique-id="fed789b1-9d86-4c2d-b079-916b3fd98ea9" data-loc="302:8-302:254" data-file-name="app/page.tsx">
          <ChevronRight size={24} className="text-yellow-900" />
        </button>
      </div>
      
      {/* Instructions modal */}
      <AnimatePresence>
        {showInstructions && <motion.div className="fixed inset-0 flex items-center justify-center z-50" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} data-unique-id="5afa297a-84f7-40b6-b50e-ce57ed6a1133" data-loc="309:29-315:9" data-file-name="app/page.tsx">
            <motion.div className="absolute inset-0 bg-black bg-opacity-70" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowInstructions(false)} data-unique-id="a2a08d17-f3c5-45b9-8447-f9a3b810d4ef" data-loc="316:12-322:56" data-file-name="app/page.tsx" />
            <motion.div initial={{
          scale: 0.8,
          opacity: 0,
          y: -20
        }} animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }} exit={{
          scale: 0.8,
          opacity: 0,
          y: 20
        }} transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }} className="bg-yellow-100 p-8 rounded-xl max-w-md border-8 border-yellow-600 relative z-10" data-unique-id="d33add1e-50c4-4055-86a9-d522d1fe65fa" data-loc="323:12-339:102" data-file-name="app/page.tsx">
              <motion.h2 className="text-2xl font-bold text-yellow-800 mb-4" initial={{
            y: -20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} data-unique-id="f352b867-a927-4113-95c3-667efed0a1e5" data-loc="340:14-348:13" data-file-name="app/page.tsx">
                How to Play
              </motion.h2>
              <motion.ul className="list-disc pl-5 space-y-2 text-yellow-900" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} data-unique-id="a2d46280-843a-416b-9ab8-a3fb2dda747d" data-loc="351:14-357:13" data-file-name="app/page.tsx">
                {["Use <strong>Left/Right Arrow Keys</strong> to move the character", "Press <strong>Up Arrow Key</strong> to jump", "Press <strong>Spacebar</strong> to advance to the next level", "Click on the <strong>Question Blocks</strong> to reveal CV information", "Collect <strong>Coins</strong> to increase your score", "Navigate between levels using the arrow buttons in the top right"].map((instruction, idx) => <motion.li key={idx} initial={{
              x: -20,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              delay: 0.3 + idx * 0.1
            }} dangerouslySetInnerHTML={{
              __html: instruction
            }} data-unique-id="6b3bf292-bc6d-4e20-a5e3-7f8a4a312b89" data-loc="358:422-368:17" data-file-name="app/page.tsx" />)}
              </motion.ul>
              <motion.button onClick={() => setShowInstructions(false)} className="mt-6 px-4 py-2 bg-yellow-500 text-yellow-900 rounded-lg font-bold hover:bg-yellow-400 border-4 border-yellow-600" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.8
          }} data-unique-id="b7cbf9bc-68e7-46eb-8e37-6dfe0110215c" data-loc="370:14-382:13" data-file-name="app/page.tsx">
                Start Playing
              </motion.button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Game level with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <LevelSection key={levels[currentLevel].id} level={levels[currentLevel]}>
          {/* Mario character */}
          <MarioCharacter position={playerPosition} />

          {/* Render coins */}
          {coins.map((x, index) => <Coin key={`coin-${currentLevel}-${index}`} position={{
          x,
          y: 100 + Math.random() * 150
        }} data-unique-id={`f125c2f0-6d0c-43af-98db-51e2bb9eafad_${index}`} data-loc="396:35-399:13" data-file-name="app/page.tsx" />)}

          {/* Level content */}
          <div className="absolute bottom-0 left-0 right-0 z-10" data-unique-id="dcb149ab-fec1-45dd-bd79-23216ee4b96a" data-loc="402:10-402:65" data-file-name="app/page.tsx">
            {/* Ground platform */}
            <GamePlatform />
            
            {/* Info blocks based on level content */}
            <div className="absolute bottom-[150px] left-0 right-0 px-8" data-unique-id="b1c12c85-19a6-4f95-9e1b-0fedf6681012" data-loc="407:12-407:73" data-file-name="app/page.tsx">
              <motion.div className="flex justify-around" initial={{
              opacity: 0,
              y: 50
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.3,
              staggerChildren: 0.1
            }} data-unique-id="9797b127-efba-46d5-be99-c922f172fba3" data-loc="408:14-418:15" data-file-name="app/page.tsx">
                {levels[currentLevel].content === "intro" && <div className="flex flex-col items-center gap-8" data-unique-id="e4768102-41e1-431f-a771-62c7856c11b6" data-loc="420:18-420:68" data-file-name="app/page.tsx">
                    {/* Name with animation */}
                    <motion.div initial={{
                  opacity: 0,
                  y: -50
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                  delay: 0.2
                }} className="relative" data-unique-id="d2b6ec01-b7ed-4d28-8aec-317c74655e31" data-loc="422:20-432:21" data-file-name="app/page.tsx">
                      <h1 className="text-6xl font-bold text-white drop-shadow-lg tracking-wider" data-unique-id="b1d78f89-f52e-4f47-a3b4-1aa83cce9be7" data-loc="433:22-433:98" data-file-name="app/page.tsx">
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      delay: 0.5,
                      duration: 0.5
                    }} className="relative inline-block" data-unique-id="ffd73c90-69c9-4c30-91d4-ed8539e04359" data-loc="434:24-439:25" data-file-name="app/page.tsx">
                          M
                          <motion.span className="absolute -top-6 -right-2 text-yellow-300 text-2xl" animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0],
                        scale: [1, 1.2, 1]
                      }} transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                      }} data-unique-id="6f3cfc45-2c81-4ad7-82e8-a19891d595bd" data-loc="441:26-453:27" data-file-name="app/page.tsx">
                            ✨
                          </motion.span>
                        </motion.span>
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      delay: 0.6,
                      duration: 0.5
                    }} data-unique-id="bba8785e-6ecb-472f-ae53-f5cc80640d4c" data-loc="457:24-461:25" data-file-name="app/page.tsx">
                          ahfudun
                        </motion.span>{" "}
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      delay: 0.9,
                      duration: 0.5
                    }} className="relative inline-block" data-unique-id="75ea37ad-d46f-4b70-adf6-740ba3bbaa70" data-loc="464:24-469:25" data-file-name="app/page.tsx">
                          N
                          <motion.span className="absolute -top-6 -right-2 text-yellow-300 text-2xl" animate={{
                        y: [0, -10, 0],
                        rotate: [0, -5, 0, 5, 0],
                        scale: [1, 1.2, 1]
                      }} transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: 0.5
                      }} data-unique-id="214ed8f1-dfee-4c94-b6dd-8185e361d790" data-loc="471:26-484:27" data-file-name="app/page.tsx">
                            ✨
                          </motion.span>
                        </motion.span>
                        <motion.span initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} transition={{
                      delay: 1.0,
                      duration: 0.5
                    }} data-unique-id="7c6bf16e-6ef0-4d1c-89ae-2de2f59ec1d1" data-loc="488:24-492:25" data-file-name="app/page.tsx">
                          iam
                        </motion.span>
                      </h1>
                      
                      {/* Animated underline */}
                      <motion.div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mt-2 rounded-full" initial={{
                    width: 0
                  }} animate={{
                    width: "100%"
                  }} transition={{
                    delay: 1.2,
                    duration: 0.8
                  }} data-unique-id="2384b80b-305c-46da-b943-32b93767893b" data-loc="498:22-503:24" data-file-name="app/page.tsx" />
                    </motion.div>
                    
                    {/* Info block with welcome message */}
                    <motion.div initial={{
                  scale: 0,
                  rotate: 5
                }} animate={{
                  scale: 1,
                  rotate: 0
                }} transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 1.5
                }} data-unique-id="3ad1d523-57f8-4121-b88a-0c292c4f0089" data-loc="507:20-522:21" data-file-name="app/page.tsx">
                      <InfoBlock onClick={() => handleInfoClick({
                    title: "Welcome to My Interactive CV!",
                    content: "I'm Mahfudun Niam, a Creative UI/UX Designer with a passion for building engaging digital experiences. I combine artistic vision with technical skills to create interfaces that delight users. My background in game design influences my approach to all digital products - making them intuitive, enjoyable, and memorable. Navigate through the levels to discover my journey!",
                    icon: levels[currentLevel].icon
                  })} />
                    </motion.div>
                    
                    {/* Floating arrow indicator */}
                    <motion.div className="text-white text-4xl mt-8" animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }} data-unique-id="d79bc1f8-4260-43b9-a8ac-44ab69444178" data-loc="531:20-542:21" data-file-name="app/page.tsx">
                      ↓
                    </motion.div>
                  </div>}
                
                {levels[currentLevel].content === "education" && cvData.education.map((edu, idx) => <motion.div key={edu.id} initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 + idx * 0.15
              }} data-unique-id="911a0bb9-65b4-41d8-b1e6-69768b47d797" data-loc="548:100-557:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: edu.degree,
                  institution: edu.institution,
                  year: edu.year,
                  description: edu.description
                })} data-unique-id={`02330a9c-d484-4858-81ec-1030be5e6191_${idx}`} data-loc="558:20-563:22" data-file-name="app/page.tsx" />
                  </motion.div>)}
                
                {levels[currentLevel].content === "experience" && cvData.experience.map((exp, idx) => <motion.div key={exp.id} initial={{
                y: 50,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2 + idx * 0.15
              }} data-unique-id="7828050e-d7a4-4ec8-8205-c9ec3851c9e7" data-loc="566:102-576:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: exp.role,
                  company: exp.company,
                  year: exp.year,
                  description: exp.description
                })} data-unique-id={`29426189-6749-4c08-b096-d425d8b61cda_${idx}`} data-loc="577:20-582:22" data-file-name="app/page.tsx" />
                  </motion.div>)}
                
                {levels[currentLevel].content === "skills" && <div className="flex flex-wrap justify-center gap-8 w-full" data-unique-id="45b0bab1-15e7-48cf-856c-8b814af60665" data-loc="585:62-585:122" data-file-name="app/page.tsx">
                    {[{
                  title: "Design",
                  skills: cvData.skills.slice(0, 4)
                }, {
                  title: "Development",
                  skills: cvData.skills.slice(4, 9)
                }, {
                  title: "Tools",
                  skills: cvData.skills.slice(9, 14)
                }, {
                  title: "Languages",
                  skills: cvData.skills.slice(14)
                }].map((category, idx) => <motion.div key={category.title} initial={{
                  rotate: 180,
                  opacity: 0
                }} animate={{
                  rotate: 0,
                  opacity: 1
                }} transition={{
                  duration: 0.5,
                  delay: 0.3 + idx * 0.1
                }} data-unique-id="b20b9b01-48d5-494a-ba5f-99e2f002ec17" data-loc="598:42-607:19" data-file-name="app/page.tsx">
                        <InfoBlock onClick={() => handleInfoClick({
                    title: `${category.title} Skills`,
                    content: category.skills,
                    icon: levels[currentLevel].icon
                  })} data-unique-id={`edac17b6-755a-4a23-9d28-51b81c87a52f_${idx}`} data-loc="608:24-612:24" data-file-name="app/page.tsx" />
                      </motion.div>)}
                  </div>}
                
                {levels[currentLevel].content === "portfolio" && cvData.portfolio.map((project, idx) => <motion.div key={project.id} initial={{
                x: 100 * (idx % 2 === 0 ? -1 : 1),
                opacity: 0
              }} animate={{
                x: 0,
                opacity: 1
              }} transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2 + idx * 0.15
              }} data-unique-id="db64f964-88a3-4539-befc-710c04d4e0c7" data-loc="616:104-626:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: project.title,
                  description: project.description,
                  technologies: project.technologies,
                  link: project.link,
                  image: project.image,
                  icon: levels[currentLevel].icon
                })} data-unique-id={`60a9c369-8b58-472f-aece-4323fcd1d1d3_${idx}`} data-loc="627:20-634:22" data-file-name="app/page.tsx" />
                  </motion.div>)}
                
                {levels[currentLevel].content === "achievements" && cvData.achievements.map((achievement, idx) => <motion.div key={achievement.id} initial={{
                y: 50,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2 + idx * 0.15
              }} data-unique-id="fa2a230b-c7b0-4655-8ea2-35dd7a2a350b" data-loc="637:114-647:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: achievement.title,
                  organization: achievement.organization,
                  year: achievement.year,
                  description: achievement.description,
                  icon: levels[currentLevel].icon
                })} data-unique-id={`8ed7fda5-969b-455b-8a9f-42a10e87b1e0_${idx}`} data-loc="648:20-654:22" data-file-name="app/page.tsx" />
                  </motion.div>)}
              </motion.div>
            </div>
          </div>
        </LevelSection>
      </AnimatePresence>

      {/* Modal for displaying information */}
      <AnimatePresence>
        {showModal && <motion.div className="fixed inset-0 flex items-center justify-center z-50" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.3
      }} data-unique-id="741422de-818c-4251-96f2-4da9fefdf6f1" data-loc="664:22-672:9" data-file-name="app/page.tsx">
            <motion.div className="absolute inset-0 bg-black bg-opacity-70" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowModal(false)} data-unique-id="17316e37-7ad2-4334-9807-a079875511ad" data-loc="673:12-679:49" data-file-name="app/page.tsx" />
            <motion.div initial={{
          scale: 0.8,
          y: 50,
          opacity: 0
        }} animate={{
          scale: 1,
          y: 0,
          opacity: 1
        }} exit={{
          scale: 0.8,
          y: 50,
          opacity: 0
        }} transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }} className="bg-yellow-100 p-6 rounded-xl max-w-md w-full mx-4 border-8 border-yellow-600 relative z-10" data-unique-id="04c2f729-5d8f-4c62-a359-204f470de315" data-loc="680:12-696:114" data-file-name="app/page.tsx">
              <div className="flex justify-between items-center mb-4" data-unique-id="c1e513b9-52a7-4ed1-a713-1ed91281abc8" data-loc="697:14-697:70" data-file-name="app/page.tsx">
                <motion.h2 className="text-2xl font-bold text-yellow-800" initial={{
              x: -20,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              delay: 0.2
            }} data-unique-id="3d0f9887-5d34-4e99-859e-81daf15fe860" data-loc="698:16-706:15" data-file-name="app/page.tsx">
                  {modalContent.title}
                </motion.h2>
                <motion.button whileHover={{
              scale: 1.1,
              rotate: 90
            }} whileTap={{
              scale: 0.9
            }} onClick={() => setShowModal(false)} className="text-yellow-800 hover:text-yellow-600" data-unique-id="cf010ebb-75ea-4da8-b8db-b3de3f718ad4" data-loc="709:16-714:101" data-file-name="app/page.tsx">
                  <X size={24} />
                </motion.button>
              </div>
              
              <motion.div className="space-y-2" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} data-unique-id="c57bf298-4ea0-4858-85e0-dc39d2d163b5" data-loc="719:14-725:13" data-file-name="app/page.tsx">
                {modalContent.icon && <motion.div className="text-4xl mb-2 text-center" initial={{
              scale: 0
            }} animate={{
              scale: 1,
              rotate: [0, 10, -10, 0]
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} data-unique-id="1fde82bb-db56-4739-8aec-a1a7c085efcd" data-loc="726:38-734:15" data-file-name="app/page.tsx">
                  {modalContent.icon}
                </motion.div>}
                
                {modalContent.organization && <motion.div className="bg-yellow-200 px-3 py-1 rounded-full inline-block mb-3" initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.25
            }} data-unique-id="a3b95051-6538-4966-b89d-42f92fbac5f6" data-loc="738:46-746:15" data-file-name="app/page.tsx">
                    <span className="text-yellow-800 text-sm font-medium" data-unique-id="6a6e6060-23a2-4e8a-86df-3fc84f99f493" data-loc="747:20-747:74" data-file-name="app/page.tsx">{modalContent.organization}</span>
                  </motion.div>}
                
                {modalContent.image && <motion.div className="mb-4 rounded-lg overflow-hidden" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.25
            }} data-unique-id="fe905b30-ab70-4c80-b3b3-5b9aa44de992" data-loc="750:39-758:15" data-file-name="app/page.tsx">
                  <img src={modalContent.image} alt={modalContent.title} className="w-full h-48 object-cover" data-unique-id="b3f61c44-d8cf-475c-9d4e-9adce216bc3c" data-loc="759:18-759:112" data-file-name="app/page.tsx" />
                </motion.div>}
                
                {modalContent.institution && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.3
            }} data-unique-id="428a8266-1750-411d-9513-f47ac52aa5ac" data-loc="762:45-770:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="28e7afa0-23ac-4edf-ab4c-eced3534b951" data-loc="771:20-771:28" data-file-name="app/page.tsx">Institution:</strong> {modalContent.institution}
                  </motion.p>}
                {modalContent.company && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.35
            }} data-unique-id="5abaef3f-f2b5-4a26-8abd-acf5254e5344" data-loc="773:41-781:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="ee29d450-a73a-4ed9-b6fe-121e2235f6c4" data-loc="782:20-782:28" data-file-name="app/page.tsx">Company:</strong> {modalContent.company}
                  </motion.p>}
                {modalContent.year && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4
            }} data-unique-id="e79677e7-84af-4d88-9102-0520ce212537" data-loc="784:38-792:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="79035015-fa67-499b-8d15-d69e22de15f5" data-loc="793:20-793:28" data-file-name="app/page.tsx">Period:</strong> {modalContent.year}
                  </motion.p>}
                {modalContent.description && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.45
            }} data-unique-id="e5b7e874-183a-428e-b492-52c22d7ea82c" data-loc="795:45-803:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="2c844894-91f0-4219-87e8-60500d7dda41" data-loc="804:20-804:28" data-file-name="app/page.tsx">Description:</strong> {modalContent.description}
                  </motion.p>}
                {modalContent.technologies && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.5
            }} data-unique-id="bf16e33f-164f-41e5-b310-e295cc730d5e" data-loc="806:46-814:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="531977da-82d9-4f08-8a55-baa6f359414f" data-loc="815:20-815:28" data-file-name="app/page.tsx">Technologies:</strong> {modalContent.technologies}
                  </motion.p>}
                {modalContent.link && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.52
            }} data-unique-id="8f034db3-24f5-484e-aa39-a8be9f70f4cc" data-loc="817:38-825:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="5f4cc6f1-5346-48c2-a99f-c66e6f47cd06" data-loc="826:20-826:28" data-file-name="app/page.tsx">Project Link:</strong> <a href={`https://${modalContent.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="c48d43cd-80aa-497d-a131-73ab224f7dd8" data-loc="826:51-826:176" data-file-name="app/page.tsx">{modalContent.link}</a>
                  </motion.p>}
                {modalContent.email && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.55
            }} data-unique-id="e1b8af6a-7409-4020-8ffa-94c02f2ad156" data-loc="828:39-836:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="4ff9e376-1554-4452-9e95-2244eef161ea" data-loc="837:20-837:28" data-file-name="app/page.tsx">Email:</strong> {modalContent.email}
                  </motion.p>}
                {modalContent.phone && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.6
            }} data-unique-id="3e8dbeb6-4a5c-4381-83cc-0f728fdc4d01" data-loc="839:39-847:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="d9e82a68-6d77-4374-b506-5df190bce2dd" data-loc="848:20-848:28" data-file-name="app/page.tsx">Phone:</strong> {modalContent.phone}
                  </motion.p>}
                {modalContent.linkedin && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.65
            }} data-unique-id="eb79d814-9f65-4f88-9d4b-d5f5cd12abf6" data-loc="850:42-858:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="90f86a08-ae4f-4980-b10b-b96678cd9a5e" data-loc="859:20-859:28" data-file-name="app/page.tsx">LinkedIn:</strong> <a href={`https://${modalContent.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="30365454-dc1b-4d09-b705-a3a8e9cb5dea" data-loc="859:47-859:176" data-file-name="app/page.tsx">{modalContent.linkedin}</a>
                  </motion.p>}
                {modalContent.github && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.7
            }} data-unique-id="107dc686-ad67-42a3-8222-5f5903f21d05" data-loc="861:40-869:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="8016a324-1dd2-41f0-a407-35ca5abbdedf" data-loc="870:20-870:28" data-file-name="app/page.tsx">GitHub:</strong> <a href={`https://${modalContent.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="61218e70-40bd-4eb0-a7a6-cfb1782ddba5" data-loc="870:45-870:172" data-file-name="app/page.tsx">{modalContent.github}</a>
                  </motion.p>}
                {modalContent.portfolio && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.75
            }} data-unique-id="88dc8b00-0fba-452c-a425-02de48e8c5b9" data-loc="872:43-880:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="31b7808e-7cbc-4de8-8168-6ac8bffbb5cf" data-loc="881:20-881:28" data-file-name="app/page.tsx">Portfolio:</strong> <a href={`https://${modalContent.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="9273538d-d032-4e2b-a25d-8ef0ab3d4ad3" data-loc="881:48-881:178" data-file-name="app/page.tsx">{modalContent.portfolio}</a>
                  </motion.p>}
                {modalContent.twitter && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.8
            }} data-unique-id="edc6c0b8-571f-4662-86dc-cd74817b389e" data-loc="883:41-891:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="37ee2833-af95-4d71-b60a-5fa77647e817" data-loc="892:20-892:28" data-file-name="app/page.tsx">Twitter:</strong> <a href={`https://twitter.com/${modalContent.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="da957b7f-754c-4f69-a110-3d1dbfa88c05" data-loc="892:46-892:203" data-file-name="app/page.tsx">{modalContent.twitter}</a>
                  </motion.p>}
                {modalContent.content && Array.isArray(modalContent.content) ? <motion.div initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.5
            }} data-unique-id="0032eac4-2967-4d96-8426-87f70e4cce87" data-loc="894:79-902:15" data-file-name="app/page.tsx">
                    <strong className="text-yellow-900" data-unique-id="f086845c-b81b-4586-b5c1-76f8c0d12d53" data-loc="903:20-903:56" data-file-name="app/page.tsx">Skills:</strong>
                    <motion.div className="flex flex-wrap gap-2 mt-2" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.6
              }} data-unique-id="421364e1-c3d4-4cd0-9730-db33fc443200" data-loc="904:20-910:17" data-file-name="app/page.tsx">
                      {modalContent.content.map((skill: string, idx: number) => <motion.span key={idx} className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded text-sm font-medium" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  delay: 0.6 + idx * 0.05,
                  type: "spring",
                  stiffness: 300
                }} data-unique-id="0b69f956-bcb8-4936-9128-87182a3a2cb8" data-loc="911:80-919:19" data-file-name="app/page.tsx">
                          {skill}
                        </motion.span>)}
                    </motion.div>
                  </motion.div> : modalContent.content ? <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.5
            }} data-unique-id="63e11fc8-5582-4a0b-8858-db921ba040c4" data-loc="923:57-931:15" data-file-name="app/page.tsx">
                    {modalContent.content}
                  </motion.p> : null}
              </motion.div>

              <motion.button onClick={() => setShowModal(false)} className="mt-4 w-full px-4 py-2 bg-yellow-500 text-yellow-900 rounded-lg font-bold hover:bg-yellow-400 border-4 border-yellow-600" whileHover={{
            scale: 1.03
          }} whileTap={{
            scale: 0.97
          }} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.7
          }} data-unique-id="69c64961-68be-40c4-a877-d58e278ff4f4" data-loc="936:14-946:13" data-file-name="app/page.tsx">
                Close
              </motion.button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Game controls hint */}
      <div className="fixed bottom-4 left-4 bg-yellow-800 bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm z-40" data-unique-id="eb8d50a4-6ac5-4a2e-81e8-522513e1ae17" data-loc="954:6-954:118" data-file-name="app/page.tsx">
        <p data-unique-id="eef52f85-e87e-47cc-bbeb-e57cd3cbdcc3" data-loc="955:8-955:11" data-file-name="app/page.tsx">Controls: ← → to move | ↑ to jump | Space to advance level</p>
        <button onClick={() => setShowInstructions(true)} className="underline hover:text-yellow-200" data-unique-id="7a0a8593-40cd-4b29-8511-e0a139fcae7d" data-loc="956:8-956:102" data-file-name="app/page.tsx">
          Show Instructions
        </button>
      </div>
    </div>;
}