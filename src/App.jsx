import { useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

/* Animated divider with a travelling light */
function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-px origin-center bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"
    >
      <motion.span
        animate={{ left: ['-15%', '115%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
        className="absolute top-1/2 -translate-y-1/2 w-28 h-[2px] rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px]"
      />
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Mouse-follow ambient glow (springed for buttery motion)
  const mouseX = useMotionValue(-800);
  const mouseY = useMotionValue(-800);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 18, mass: 0.5 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 18, mass: 0.5 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400"
      />

      {/* Ambient background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Faded grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(100,116,139,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,0.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 35%, black 25%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 35%, black 25%, transparent 75%)',
          }}
        />

        {/* Drifting blobs */}
        <motion.div
          animate={{ x: [0, -80, 40, 0], y: [0, 60, -40, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-12%] right-[-8%] w-[520px] h-[520px] rounded-full bg-blue-500/20 dark:bg-blue-600/10 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 120, -60, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.85, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-12%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 dark:bg-purple-900/20 blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -60, 60, 0], y: [0, -40, 40, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] left-[38%] w-[420px] h-[420px] rounded-full bg-emerald-500/10 dark:bg-emerald-900/10 blur-[130px]"
        />

        {/* Mouse-follow glow */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="absolute left-0 top-0 w-[560px] h-[560px] -ml-[280px] -mt-[280px] rounded-full bg-blue-400/[0.07] dark:bg-blue-500/[0.06] blur-[110px]"
        />
      </div>

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col gap-24 lg:gap-36 pt-10 pb-32 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Hero />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </motion.div>

      <footer className="relative z-10 py-8 mt-12 text-center pb-28 border-t border-slate-200/50 dark:border-slate-800/50">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-slate-500 dark:text-slate-400"
        >
          © {new Date().getFullYear()}{' '}
          <span className="text-slate-900 dark:text-slate-200">AmirHossein Shamsi</span>. Crafted with{' '}
          <span className="text-red-500">♥</span>
        </motion.p>
      </footer>
    </main>
  );
}