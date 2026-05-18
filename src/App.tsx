import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Heart, Sparkles, Navigation, Globe, GraduationCap, Building2, HeartCrack, Frown } from 'lucide-react';

const BackgroundTexts = () => {
  const words = ["I am dumb", "I am bhulakkad", "dumbo!", "fool", "Worst Person 4ever!", "idiot", "goldfish memory", "clueless", "sorry 🥺", "my fault"];
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Determine screen radius roughly
    const maxRadius = typeof window !== 'undefined' ? window.innerWidth / 1.2 : 500;
    
    const newItems = Array.from({ length: 45 }).map((_, i) => {
      const isReverse = Math.random() > 0.5;
      const startAngle = Math.random() * 360;
      const radius = 60 + Math.random() * maxRadius; // Distance from center
      
      return {
        id: i,
        word: words[i % words.length],
        radius,
        startAngle,
        endAngle: startAngle + (isReverse ? -360 : 360),
        duration: 2 + Math.random() * 5, // Fast-paced
        delay: Math.random() * 2,
        scale: 0.5 + Math.random() * 2,
        jitterY: (Math.random() - 0.5) * 50,
        skewX: Math.random() * 30 - 15,
        jitterX: (Math.random() > 0.5 ? 20 : -20)
      };
    });
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center mix-blend-overlay">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute origin-center"
          initial={{ rotate: item.startAngle }}
          animate={{ rotate: item.endAngle }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Positional offset (Radius) from center */}
          <motion.div
            style={{ x: item.radius, y: item.jitterY }}
            animate={{ 
              x: [item.radius, item.radius + item.jitterX, item.radius],
              opacity: [0, 0, 0.8, 0, 0.5, 0] // Erratic broken fade-in and fade-out
            }}
            transition={{
              x: { duration: 0.1 + Math.random() * 0.2, repeat: Infinity, repeatType: "mirror" },
              opacity: { duration: item.duration * (0.4 + Math.random() * 0.4), repeat: Infinity, ease: "easeInOut", delay: item.delay }
            }}
          >
            {/* Counter-rotate so text remains readable but slightly skewed/broken */}
            <motion.div
              initial={{ rotate: -item.startAngle }}
              animate={{ rotate: -item.endAngle + (Math.random() * 30 - 15) }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "linear",
              }}
              className="font-black whitespace-nowrap text-3xl md:text-6xl text-stone-700/60 mix-blend-color-burn tracking-tighter"
              style={{ scale: item.scale }}
            >
              <motion.span
                animate={{ skewX: [0, item.skewX, 0], filter: ["blur(0px)", "blur(3px)", "blur(0px)"] }}
                transition={{ duration: 0.1 + Math.random() * 0.4, repeat: Infinity }}
                className="inline-block"
              >
                {item.word}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(28,25,23,0.5)_100%)] pointer-events-none" />
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  // Faster, jagged animations
  const variants = {
    initial: { opacity: 0, x: -20, y: 30, scale: 0.95, rotate: -3 },
    animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
    exit: { opacity: 0, x: 20, y: -30, scale: 0.95, rotate: 3 },
  };

  const careerBadges = [
    { text: "Apparel Business ✨", icon: <Building2 size={16} />, className: "top-0 -left-10 md:-left-20 bg-rose-900/60 text-white border border-rose-400" },
    { text: "Research 🔬", icon: <Navigation size={16} />, className: "top-10 -right-10 md:-right-24 bg-indigo-900/60 text-white border border-indigo-400" },
    { text: "JEE 📚", icon: <GraduationCap size={16} />, className: "bottom-10 -left-6 md:-left-16 bg-sky-900/60 text-white border border-sky-400" },
    { text: "European Colleges ✈️", icon: <Globe size={16} />, className: "bottom-0 -right-4 md:-right-12 bg-purple-900/60 text-white border border-purple-400" },
  ];

  return (
    <div className="relative min-h-screen bg-neutral-900 flex items-center justify-center overflow-hidden font-sans text-stone-200 p-4">
      {/* Background Rotating Words */}
      <BackgroundTexts />

      {/* Background Floating Blobs */}
      <div className="fixed top-10 left-10 w-[30vh] h-[30vh] bg-stone-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-[40vh] h-[40vh] bg-rose-900 rounded-full mix-blend-color-dodge filter blur-3xl opacity-30 animate-float-delayed pointer-events-none" />
      <div className="fixed top-1/2 left-2/3 w-[25vh] h-[25vh] bg-indigo-900 rounded-full mix-blend-color-dodge filter blur-3xl opacity-20 animate-float pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-lg">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="broken-card rounded-md p-8 md:p-12 text-center relative"
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 0.9, 1.1, 1], opacity: [0.8, 1, 0.4, 0.8] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                >
                  <HeartCrack size={56} className="text-stone-300" strokeWidth={2} />
                </motion.div>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4 glitch-text" data-text="For the girl with a million dreams...">
                For the girl with a million dreams...
              </h1>
              <p className="text-lg text-stone-400 mb-8 font-medium italic opacity-80">
                (And a best friend completely drowning in guilt)
              </p>
              <button
                onClick={nextStep}
                className="broken-button text-stone-200 font-bold py-3 px-8 rounded-sm tracking-widest uppercase text-sm"
              >
                Can we talk? 🌧️
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="broken-card rounded-md p-8 md:p-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-black mb-12 glitch-text" data-text="I feel so terrible...">
                I feel so terrible...
              </h2>
              
              <div className="relative w-40 h-40 mx-auto border-2 border-dashed border-red-900 rounded-sm flex items-center justify-center mb-12 opacity-80 animate-frenzy">
                <Brain size={48} className="text-red-500" strokeWidth={2} />
                
                {careerBadges.map((badge, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
                      y: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
                      rotate: [0, (Math.random() - 0.5) * 20]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.1 + Math.random() * 0.3,
                      repeatType: "mirror"
                    }}
                    className={`absolute px-2 py-1 rounded-sm text-xs font-bold flex items-center gap-2 whitespace-nowrap ${badge.className}`}
                  >
                    {badge.icon}
                    {badge.text}
                  </motion.div>
                ))}
              </div>

              <p className="text-lg text-stone-400 mb-8 font-medium italic">
                Between apparel setups, research labs, JEE books, and European flights... my goldfish memory completely failed you.
              </p>

              <button
                onClick={nextStep}
                className="broken-button text-stone-200 font-bold py-3 px-8 rounded-sm tracking-widest uppercase text-sm"
              >
                I was clueless.
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="broken-card rounded-md p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-6 animate-pulse">
                <Frown size={48} className="text-stone-400" strokeWidth={2} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-6 glitch-text" data-text="The Confession">
                The Confession
              </h2>
              <p className="text-xl md:text-2xl text-stone-300 leading-relaxed mb-10 font-bold">
                I got so overwhelmed by how brilliantly multi-talented you are, that I ended up sounding like an idiot when we talked about your future. You deserve a best friend who actually listens to all of your dreams.
              </p>
              <button
                onClick={nextStep}
                className="broken-button text-stone-200 font-bold py-3 px-8 rounded-sm tracking-widest uppercase text-sm"
              >
                I'm so sorry...
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="broken-card rounded-md p-8 md:p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <Sparkles size={48} className="text-stone-400 animate-spin" strokeWidth={2} style={{ animationDuration: '3s' }} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-widest text-stone-100">
                Because honestly...
              </h2>
              <p className="text-lg md:text-xl text-stone-400 leading-relaxed mb-4 font-medium italic">
                Whether you're running a business, doing research, or flying to Europe, you are going to conquer the world!
              </p>
              <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-10 font-bold">
                Having so many passions isn't a bad thing. It's what makes you so incredibly amazing.
              </p>
              <button
                onClick={nextStep}
                className="broken-button text-stone-200 font-bold py-3 px-8 rounded-sm tracking-widest uppercase text-sm"
              >
                Too late now.
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step-4"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="broken-card rounded-md p-8 md:p-12 text-center"
            >
              <div className="text-6xl mb-6 opacity-60">📝</div>
              <h2 className="text-2xl md:text-3xl font-black mb-6 text-stone-100 uppercase tracking-widest border-b border-stone-600 pb-2">
                My Promise As Your Bestie
              </h2>
              <p className="text-lg md:text-xl text-stone-400 leading-relaxed mb-10 font-medium">
                I am carrying so much guilt for making you feel unheard. From now on, I am taking literal notes. I'm keeping track of every single big dream you have.
              </p>
              <button
                onClick={nextStep}
                className="broken-button text-stone-200 font-bold py-3 px-8 rounded-sm tracking-widest uppercase text-sm"
              >
                If you still want me around...
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step-5"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="broken-card rounded-md p-8 md:p-12 text-center"
            >
              <div className="text-6xl mb-6 opacity-60 glitch-text" data-text="🧸">🧸</div>
              <h2 className="text-2xl md:text-3xl font-black mb-8 glitch-text" data-text="So, Apoorva...">
                So, Apoorva... will you forgive your stupid best friend?
              </h2>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={nextStep}
                  className="broken-button text-stone-300 font-bold py-4 px-6 uppercase tracking-widest text-sm"
                >
                  I can't just forget it...
                </button>
                
                <button
                  onClick={nextStep}
                  className="broken-button text-red-400 font-bold py-4 px-6 uppercase tracking-widest text-sm border-red-900"
                >
                  Just forget me too.
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step-6"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.1, ease: 'linear' }}
              className="broken-card rounded-none border-4 border-red-900 p-8 md:p-12 text-center bg-black/80"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 0.8, 1.1, 1], rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="flex justify-center mb-6"
              >
                <HeartCrack size={80} className="text-red-700" strokeWidth={3} />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-neutral-300 glitch-text uppercase tracking-tighter" data-text="YEAH. I DESERVE THAT.">
                YEAH. I DESERVE THAT.
              </h2>
              
              <p className="text-xl text-stone-500 font-bold uppercase tracking-widest">
                System Failure. Connection Lost.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
