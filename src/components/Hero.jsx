import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';

const roles = ['AI Engineer', 'Backend Architect', 'LLM Specialist', 'Geospatial Wizard'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

/* Magnetic hover wrapper — element gently follows the cursor */
function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

const floatChips = [
  { text: 'PyTorch', x: '8%', y: '24%', delay: 0 },
  { text: 'FastAPI', x: '84%', y: '20%', delay: 1.2 },
  { text: '.NET Core', x: '12%', y: '66%', delay: 0.6 },
  { text: 'LangChain', x: '82%', y: '62%', delay: 1.8 },
  { text: 'Neo4j', x: '70%', y: '80%', delay: 0.3 },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Parallax fade-out as you scroll away
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 100]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Floating tech chips (desktop only) */}
      {floatChips.map((chip) => (
        <motion.div
          key={chip.text}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + chip.delay * 0.25, type: 'spring', stiffness: 200, damping: 14 }}
          className="hidden lg:block absolute z-0"
          style={{ left: chip.x, top: chip.y }}
        >
          <div
            className="animate-float glass px-4 py-2 rounded-full text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400"
            style={{ animationDelay: `${chip.delay}s` }}
          >
            {chip.text}
          </div>
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl"
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <span className="px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-md flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for New Opportunities
          </span>
        </motion.div>

        {/* Name with shimmering gradient */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white"
        >
          AmirHossein{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400 text-shimmer">
            Shamsi
          </span>
        </motion.h1>

        {/* Static lead-in line */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl text-slate-600 dark:text-slate-300 mb-2 font-light tracking-wide"
        >
          I build intelligent, high-performance systems as a
        </motion.h2>

        {/* Rotating role — masked vertical slide with blur */}
        <motion.div variants={itemVariants} className="text-2xl md:text-4xl mb-8 font-bold">
          <span className="inline-flex h-[1.5em] items-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: '110%', opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: '-110%', opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-nowrap bg-gradient-to-r from-blue-500 to-emerald-400 bg-clip-text text-transparent"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed text-lg md:text-xl mx-auto mb-10"
        >
          Specializing in geospatial data processing, real-time platforms, and memory-enabled LLM
          pipelines using <strong>Python</strong> and <strong>.NET</strong>.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <Magnetic>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 text-white font-medium overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <span className="relative">View Projects</span>
              <FiArrowRight className="relative transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-block px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium transition-colors"
            >
              Contact Me
            </motion.a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <FiChevronDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}