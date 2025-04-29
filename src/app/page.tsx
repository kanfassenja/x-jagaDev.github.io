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
    role: "Senior UI/UX Designer",
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
  description: "I'm a Creative UI/UX Designer and Developer specializing in interactive experiences. Explore my journey through this gamified portfolio!",
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
  return <div className="min-h-screen overflow-hidden relative" data-unique-id="31d91cf5-4dae-430a-a8a0-78c5736bab99" data-loc="286:9-286:64" data-file-name="app/page.tsx">
      {/* Sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-500 z-0" data-unique-id="2abfd4c3-7a4b-4444-a21b-c3436f4d52af" data-loc="288:6-288:85" data-file-name="app/page.tsx"></div>
      
      {/* Game UI - Score and Level */}
      <div className="fixed top-4 left-4 z-50 bg-yellow-800 text-white px-4 py-2 rounded-lg border-4 border-yellow-600 shadow-lg" data-unique-id="a7e9daf1-ad31-41a8-a863-2126bfd925df" data-loc="291:6-291:130" data-file-name="app/page.tsx">
        <div className="flex items-center gap-3" data-unique-id="06def2d2-f008-4bfa-94c8-213de4a010ef" data-loc="292:8-292:49" data-file-name="app/page.tsx">
          <div data-unique-id="71c66135-e832-4722-a2e3-845d1ffe1f8a" data-loc="293:10-293:15" data-file-name="app/page.tsx">
            <span className="font-bold" data-unique-id="830c2069-0317-40e1-a477-8ada80fedf25" data-loc="294:12-294:40" data-file-name="app/page.tsx">SCORE:</span> {score}
          </div>
          <div data-unique-id="d3e69c23-54d6-44c1-90e8-af7228b94c08" data-loc="296:10-296:15" data-file-name="app/page.tsx">
            <span className="font-bold" data-unique-id="2aeef86d-821f-4f74-a14e-3abccc9436a7" data-loc="297:12-297:40" data-file-name="app/page.tsx">LEVEL:</span> {currentLevel + 1}/{levels.length}
          </div>
        </div>
      </div>

      {/* Level navigation controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2" data-unique-id="e5165883-da3e-4b7c-9151-83fe75da18dd" data-loc="303:6-303:59" data-file-name="app/page.tsx">
        <button onClick={goToPrevLevel} disabled={currentLevel === 0} className={`p-2 bg-yellow-500 rounded-full border-4 border-yellow-600 ${currentLevel === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`} data-unique-id="cb18fc38-ce0c-4e97-899c-df86a8573dff" data-loc="304:8-304:222" data-file-name="app/page.tsx">
          <ChevronLeft size={24} className="text-yellow-900" />
        </button>
        <button onClick={goToNextLevel} disabled={currentLevel === levels.length - 1} className={`p-2 bg-yellow-500 rounded-full border-4 border-yellow-600 ${currentLevel === levels.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`} data-unique-id="4c4b3e69-bb08-4ed6-9c14-8d061d3e588e" data-loc="307:8-307:254" data-file-name="app/page.tsx">
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
      }} data-unique-id="3d3644d5-244b-4cc6-be99-a94232c0a9ce" data-loc="314:29-320:9" data-file-name="app/page.tsx">
            <motion.div className="absolute inset-0 bg-black bg-opacity-70" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowInstructions(false)} data-unique-id="4835af74-1dfb-4944-99ea-2ae347981d48" data-loc="321:12-327:56" data-file-name="app/page.tsx" />
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
        }} className="bg-yellow-100 p-8 rounded-xl max-w-md border-8 border-yellow-600 relative z-10" data-unique-id="bc377b0c-ebf3-4c5d-b1fa-6165310c3cbf" data-loc="328:12-344:102" data-file-name="app/page.tsx">
              <motion.h2 className="text-2xl font-bold text-yellow-800 mb-4" initial={{
            y: -20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} data-unique-id="0e00222d-0185-49d3-8424-4bf57f53bfe3" data-loc="345:14-353:13" data-file-name="app/page.tsx">
                How to Play
              </motion.h2>
              <motion.ul className="list-disc pl-5 space-y-2 text-yellow-900" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} data-unique-id="a0734bfd-5ade-4430-9fa4-19b973fbef24" data-loc="356:14-362:13" data-file-name="app/page.tsx">
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
            }} data-unique-id="d129ac48-a3ec-4d49-87be-22788ed4a92e" data-loc="363:422-373:17" data-file-name="app/page.tsx" />)}
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
          }} data-unique-id="6ba33af4-540d-403e-88af-084670acfd36" data-loc="375:14-387:13" data-file-name="app/page.tsx">
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
        }} data-unique-id={`77ad8ee2-d3a5-4d11-9257-c16f31f1cd5b_${index}`} data-loc="401:35-404:13" data-file-name="app/page.tsx" />)}

          {/* Level content */}
          <div className="absolute bottom-0 left-0 right-0 z-10" data-unique-id="c8128d18-9987-421b-b2a2-42ae75da7e9f" data-loc="407:10-407:65" data-file-name="app/page.tsx">
            {/* Ground platform */}
            <GamePlatform />
            
            {/* Info blocks based on level content */}
            <div className="absolute bottom-[150px] left-0 right-0 px-8" data-unique-id="18873d25-9268-4194-b87a-099bbb98fab5" data-loc="412:12-412:73" data-file-name="app/page.tsx">
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
            }} data-unique-id="02697e66-6010-4d0e-8aa4-625d430fe119" data-loc="413:14-423:15" data-file-name="app/page.tsx">
                {levels[currentLevel].content === "intro" && <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
              }} data-unique-id="64629792-329a-4a99-b7df-c2c1566f03a0" data-loc="424:61-433:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: "Welcome to My Interactive CV!",
                  content: "I'm a Creative UI/UX Designer with a passion for building engaging digital experiences. I combine artistic vision with technical skills to create interfaces that delight users. My background in game design influences my approach to all digital products - making them intuitive, enjoyable, and memorable. Navigate through the levels to discover my journey!",
                  icon: levels[currentLevel].icon
                })} />
                  </motion.div>}
                
                {levels[currentLevel].content === "education" && cvData.education.map((edu, idx) => <motion.div key={edu.id} initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 + idx * 0.15
              }} data-unique-id="d45c0821-0faa-4786-a4c9-72c0bd489241" data-loc="441:100-450:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: edu.degree,
                  institution: edu.institution,
                  year: edu.year,
                  description: edu.description
                })} data-unique-id={`ac15e362-ab7f-4027-b2dc-dab149375b71_${idx}`} data-loc="451:20-456:22" data-file-name="app/page.tsx" />
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
              }} data-unique-id="803b4ef6-2eaf-46a3-9c6c-5c9c1d5ee189" data-loc="459:102-469:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: exp.role,
                  company: exp.company,
                  year: exp.year,
                  description: exp.description
                })} data-unique-id={`24f9d214-bc86-4fbf-8459-67d994d6364d_${idx}`} data-loc="470:20-475:22" data-file-name="app/page.tsx" />
                  </motion.div>)}
                
                {levels[currentLevel].content === "skills" && <div className="flex flex-wrap justify-center gap-8 w-full" data-unique-id="89c1cc51-725c-4bca-b158-70c89999bec9" data-loc="479:18-479:78" data-file-name="app/page.tsx">
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
                }} data-unique-id="53b74c0e-76b6-4ad2-8f04-84571102df48" data-loc="486:22-491:23" data-file-name="app/page.tsx">
                        <InfoBlock onClick={() => handleInfoClick({
                    title: `${category.title} Skills`,
                    content: category.skills,
                    icon: levels[currentLevel].icon
                  })} data-unique-id={`750f41a6-61fe-461e-aadd-566c8a8fedd5_${idx}`} data-loc="492:24-496:30" data-file-name="app/page.tsx" />
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
              }} data-unique-id="906937eb-e7de-4f73-9d7e-8d4048dfd90b" data-loc="502:104-512:17" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: project.title,
                  description: project.description,
                  technologies: project.technologies,
                  link: project.link,
                  image: project.image,
                  icon: levels[currentLevel].icon
                })} data-unique-id={`1bc5a3aa-f0d7-4acc-9595-3c076e717789_${idx}`} data-loc="513:20-520:22" data-file-name="app/page.tsx" />
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
              }} data-unique-id="6527a671-2a11-4c98-beae-b907e4377f4b" data-loc="524:18-539:19" data-file-name="app/page.tsx">
                    <InfoBlock onClick={() => handleInfoClick({
                  title: achievement.title,
                  organization: achievement.organization,
                  year: achievement.year,
                  description: achievement.description,
                  icon: levels[currentLevel].icon
                })} data-unique-id={`6329c21c-e4e7-426f-aa90-e3b44edf5ae3_${idx}`} data-loc="540:20-546:26" data-file-name="app/page.tsx" />
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
      }} data-unique-id="8b6aa160-2510-4479-81a9-d25895177069" data-loc="557:22-565:9" data-file-name="app/page.tsx">
            <motion.div className="absolute inset-0 bg-black bg-opacity-70" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowModal(false)} data-unique-id="74976b99-2155-4320-9d3f-93de2609e4bb" data-loc="566:12-572:49" data-file-name="app/page.tsx" />
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
        }} className="bg-yellow-100 p-6 rounded-xl max-w-md w-full mx-4 border-8 border-yellow-600 relative z-10" data-unique-id="7690bd92-c996-4e20-a258-81a45c66d5d4" data-loc="573:12-589:114" data-file-name="app/page.tsx">
              <div className="flex justify-between items-center mb-4" data-unique-id="9891e3a3-6a56-4a01-9243-806c3f5704ca" data-loc="590:14-590:70" data-file-name="app/page.tsx">
                <motion.h2 className="text-2xl font-bold text-yellow-800" initial={{
              x: -20,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              delay: 0.2
            }} data-unique-id="aa19eb55-2141-44dc-95f1-1b3c54fd257e" data-loc="591:16-599:15" data-file-name="app/page.tsx">
                  {modalContent.title}
                </motion.h2>
                <motion.button whileHover={{
              scale: 1.1,
              rotate: 90
            }} whileTap={{
              scale: 0.9
            }} onClick={() => setShowModal(false)} className="text-yellow-800 hover:text-yellow-600" data-unique-id="87db8ad5-c29b-4f85-b170-4b9e5b8ae185" data-loc="602:16-607:101" data-file-name="app/page.tsx">
                  <X size={24} />
                </motion.button>
              </div>
              
              <motion.div className="space-y-2" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} data-unique-id="aaddb58b-5305-4b50-8b34-f4fdf4ae851b" data-loc="612:14-618:13" data-file-name="app/page.tsx">
                {modalContent.icon && <motion.div className="text-4xl mb-2 text-center" initial={{
              scale: 0
            }} animate={{
              scale: 1,
              rotate: [0, 10, -10, 0]
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} data-unique-id="191ca4c9-b097-4d9e-ba6b-df94828ac6a9" data-loc="619:38-624:17" data-file-name="app/page.tsx">
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
            }} data-unique-id="60d38f0a-6baf-4bc4-b412-0f5eb7a603e4" data-loc="629:18-634:19" data-file-name="app/page.tsx">
                    <span className="text-yellow-800 text-sm font-medium" data-unique-id="25670490-d5ce-46cc-af19-1076a60f6d3e" data-loc="635:20-635:74" data-file-name="app/page.tsx">{modalContent.organization}</span>
                  </motion.div>}
                
                {modalContent.image && <motion.div className="mb-4 rounded-lg overflow-hidden" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.25
            }} data-unique-id="2cbc1b2d-e6f6-4beb-9f8d-408f3860eccc" data-loc="639:39-644:17" data-file-name="app/page.tsx">
                  <img src={modalContent.image} alt={modalContent.title} className="w-full h-48 object-cover" data-unique-id="48b6449b-0613-4311-ac5c-81adb39e543b" data-loc="645:18-649:20" data-file-name="app/page.tsx" />
                </motion.div>}
                
                {modalContent.institution && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.3
            }} data-unique-id="757c02ad-53e7-410d-90b7-ac8c59fbb1e0" data-loc="652:45-660:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="c81bdfa3-770c-4263-8f72-0b0743d084fc" data-loc="661:20-661:28" data-file-name="app/page.tsx">Institution:</strong> {modalContent.institution}
                  </motion.p>}
                {modalContent.company && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.35
            }} data-unique-id="a500b3da-5fe6-4dee-ab3e-616399cbdf66" data-loc="663:41-671:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="7f8f37de-b8ba-49c1-8acb-be122a596af0" data-loc="672:20-672:28" data-file-name="app/page.tsx">Company:</strong> {modalContent.company}
                  </motion.p>}
                {modalContent.year && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4
            }} data-unique-id="7f843140-2a63-4bb4-ae82-b70bc16aa91f" data-loc="674:38-682:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="80a40431-e196-4366-95a0-1db2acfa4598" data-loc="683:20-683:28" data-file-name="app/page.tsx">Period:</strong> {modalContent.year}
                  </motion.p>}
                {modalContent.description && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.45
            }} data-unique-id="61e236e0-d7f9-4249-b970-c91b5d98bb22" data-loc="685:45-693:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="7ac5c4f7-d6d7-44da-b90f-5f83d0837952" data-loc="694:20-694:28" data-file-name="app/page.tsx">Description:</strong> {modalContent.description}
                  </motion.p>}
                {modalContent.technologies && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.5
            }} data-unique-id="35bd2ac7-7ed0-4360-a996-b735f3c20db2" data-loc="696:46-704:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="663f5879-177c-4cd2-ad25-a24128c8d1a4" data-loc="705:20-705:28" data-file-name="app/page.tsx">Technologies:</strong> {modalContent.technologies}
                  </motion.p>}
                {modalContent.link && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.52
            }} data-unique-id="59415de8-64f9-44f3-bb50-c551b1fb8431" data-loc="707:38-715:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="4b99ba6d-02e0-4a05-ba2d-2474be4cc074" data-loc="716:20-716:28" data-file-name="app/page.tsx">Project Link:</strong> <a href={`https://${modalContent.link}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="b14a1714-bacc-458a-a16c-39e2ff0c51e9" data-loc="716:51-716:176" data-file-name="app/page.tsx">{modalContent.link}</a>
                  </motion.p>}
                {modalContent.email && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.55
            }} data-unique-id="a088f785-6a30-44cd-81c7-ea10b53570eb" data-loc="718:39-726:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="30a78891-650c-40dc-ae44-6b11307db43e" data-loc="727:20-727:28" data-file-name="app/page.tsx">Email:</strong> {modalContent.email}
                  </motion.p>}
                {modalContent.phone && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.6
            }} data-unique-id="b926230e-1e04-4575-866e-a7f230a56f60" data-loc="729:39-737:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="31d1b11b-c60c-4db1-9b05-e504436b84fd" data-loc="738:20-738:28" data-file-name="app/page.tsx">Phone:</strong> {modalContent.phone}
                  </motion.p>}
                {modalContent.linkedin && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.65
            }} data-unique-id="5ccf9a01-c08a-4375-a1d4-e05314ce1ae6" data-loc="740:42-748:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="4f3056b3-a1e6-4280-a948-a1a3b3d40817" data-loc="749:20-749:28" data-file-name="app/page.tsx">LinkedIn:</strong> <a href={`https://${modalContent.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="f38fc2a3-f5dd-4b3b-9f18-0ac2941e13a8" data-loc="749:47-749:176" data-file-name="app/page.tsx">{modalContent.linkedin}</a>
                  </motion.p>}
                {modalContent.github && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.7
            }} data-unique-id="0f636fb2-8ff9-4e78-b937-a9391e1f8753" data-loc="751:40-759:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="a479e46f-6275-45db-8122-e3001a82f7d0" data-loc="760:20-760:28" data-file-name="app/page.tsx">GitHub:</strong> <a href={`https://${modalContent.github}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="56fc636b-675a-4f11-b696-a94af5ccb35e" data-loc="760:45-760:172" data-file-name="app/page.tsx">{modalContent.github}</a>
                  </motion.p>}
                {modalContent.portfolio && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.75
            }} data-unique-id="a7f64aa7-871d-4a71-9518-a876978390f4" data-loc="762:43-770:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="735ab9ff-410b-4812-94e7-a4ea2ef3eda7" data-loc="771:20-771:28" data-file-name="app/page.tsx">Portfolio:</strong> <a href={`https://${modalContent.portfolio}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="1b3fbded-cbf8-417c-af0d-aceda4a90adf" data-loc="771:48-771:178" data-file-name="app/page.tsx">{modalContent.portfolio}</a>
                  </motion.p>}
                {modalContent.twitter && <motion.p className="text-yellow-900" initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.8
            }} data-unique-id="28d7613a-e54e-4d84-8e95-27acdb9810e2" data-loc="773:41-781:15" data-file-name="app/page.tsx">
                    <strong data-unique-id="ff83fd05-e4f1-453a-a2ce-a9894c163dd3" data-loc="782:20-782:28" data-file-name="app/page.tsx">Twitter:</strong> <a href={`https://twitter.com/${modalContent.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" data-unique-id="53ca831b-82c8-4627-b8b9-d19411556538" data-loc="782:46-782:203" data-file-name="app/page.tsx">{modalContent.twitter}</a>
                  </motion.p>}
                {modalContent.content && Array.isArray(modalContent.content) ? <motion.div initial={{
              y: 10,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.5
            }} data-unique-id="6f31aa17-ce5f-432f-8a44-e19bd2479eb8" data-loc="784:79-792:15" data-file-name="app/page.tsx">
                    <strong className="text-yellow-900" data-unique-id="b4697a77-8ea1-4dba-8f45-dcc579a36023" data-loc="793:20-793:56" data-file-name="app/page.tsx">Skills:</strong>
                    <motion.div className="flex flex-wrap gap-2 mt-2" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.6
              }} data-unique-id="c1e4ff27-5c88-471d-9602-059c1a1ec8ec" data-loc="794:20-800:17" data-file-name="app/page.tsx">
                      {modalContent.content.map((skill: string, idx: number) => <motion.span key={idx} className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded text-sm font-medium" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  delay: 0.6 + idx * 0.05,
                  type: "spring",
                  stiffness: 300
                }} data-unique-id="bd6bab83-6a3a-4830-b881-c7b1b38e069a" data-loc="801:80-809:19" data-file-name="app/page.tsx">
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
            }} data-unique-id="ecec85a1-d27a-4f4d-bbe6-c93ad3eae431" data-loc="813:57-821:15" data-file-name="app/page.tsx">
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
          }} data-unique-id="27d10a82-723e-41f9-abff-d2f54a7992e7" data-loc="826:14-836:13" data-file-name="app/page.tsx">
                Close
              </motion.button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Game controls hint */}
      <div className="fixed bottom-4 left-4 bg-yellow-800 bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm z-40" data-unique-id="6aefd130-1d79-40fa-ae06-5749a0f0254e" data-loc="844:6-844:118" data-file-name="app/page.tsx">
        <p data-unique-id="d26f3e29-21e7-4e3b-a102-859f255c8690" data-loc="845:8-845:11" data-file-name="app/page.tsx">Controls: ← → to move | ↑ to jump | Space to advance level</p>
        <button onClick={() => setShowInstructions(true)} className="underline hover:text-yellow-200" data-unique-id="b59a7ea5-1e32-4c45-8ac0-5dbd7e4d6484" data-loc="846:8-846:102" data-file-name="app/page.tsx">
          Show Instructions
        </button>
      </div>
    </div>;
}