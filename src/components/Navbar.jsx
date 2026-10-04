import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiCode, FiBriefcase, FiMail, FiMoon, FiSun } from 'react-icons/fi';

const navItems = [
  { id: 'home', icon: <FiHome />, label: 'Home' },
  { id: 'skills', icon: <FiCode />, label: 'Skills' },
  { id: 'projects', icon: <FiBriefcase />, label: 'Projects' },
  { id: 'contact', icon: <FiMail />, label: 'Contact' },
];

function Tooltip({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs py-1.5 px-3 rounded-lg font-semibold shadow-lg whitespace-nowrap pointer-events-none"
    >
      {label}
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
    </motion.div>
  );
}

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved !== null ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isThemeHovered, setIsThemeHovered] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  // Scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: 120, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.3 }}
        className="glass rounded-full px-4 py-2.5 flex items-center gap-1.5 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.25)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
      >
        {navItems.map((item, index) => {
          const isActive = active === item.id;
          return (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.15, y: -6 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              className={`relative p-3 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {/* Sliding active pill — the buttery part */}
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/15 ring-1 ring-blue-500/40 dark:ring-blue-400/40"
                />
              )}
              <motion.span
                animate={{ scale: isActive ? 1.12 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative z-10 text-xl"
              >
                {item.icon}
              </motion.span>

              <AnimatePresence>
                {hoveredIndex === index && <Tooltip key="tip" label={item.label} />}
              </AnimatePresence>
            </motion.a>
          );
        })}

        <div className="w-px h-7 bg-slate-200 dark:bg-slate-700 mx-1.5 rounded-full" />

        {/* Theme toggle */}
        <motion.button
          onClick={() => setIsDarkMode(!isDarkMode)}
          onMouseEnter={() => setIsThemeHovered(true)}
          onMouseLeave={() => setIsThemeHovered(false)}
          whileHover={{ scale: 1.15, y: -6, rotate: 10 }}
          whileTap={{ scale: 0.88, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 420, damping: 18 }}
          aria-label="Toggle theme"
          className="relative p-3 rounded-full text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center justify-center"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDarkMode ? 'sun' : 'moon'}
              initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 120, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl"
            >
              {isDarkMode ? <FiSun /> : <FiMoon />}
            </motion.span>
          </AnimatePresence>

          <AnimatePresence>
            {isThemeHovered && <Tooltip key="tip" label={isDarkMode ? 'Light Mode' : 'Dark Mode'} />}
          </AnimatePresence>
        </motion.button>
      </motion.nav>
    </div>
  );
}