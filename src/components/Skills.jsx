import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';

const skillCategories = [
  {
    title: 'Machine Learning & AI',
    icon: '🧠',
    skills: ['Python (Expert)', 'PyTorch', 'TensorFlow', 'LangChain', 'LLMs & RAG'],
  },
  {
    title: 'Python Backend',
    icon: '🐍',
    skills: ['FastAPI (Expert)', 'Django', 'AsyncIO', 'Flask'],
  },
  {
    title: '.NET Engineering',
    icon: '⚡',
    skills: ['C# / .NET 10 (Expert)', 'ASP.NET Core', 'EF Core', 'CQRS'],
  },
  {
    title: 'Databases & DevOps',
    icon: '🗄️',
    skills: ['PostgreSQL & PostGIS', 'Neo4j', 'MongoDB', 'Redis', 'Docker', 'WebSockets'],
  },
];

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 20 },
  },
};

function SkillCard({ category, idx }) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(59,130,246,0.10), transparent 65%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: idx * 0.1, type: 'spring', stiffness: 90, damping: 16 }}
      whileHover={{ y: -8 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
      className="relative glass rounded-3xl p-8 group overflow-hidden h-full"
    >
      {/* Mouse spotlight */}
      <motion.div
        style={{ background: spotlight }}
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow ring */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-900/[0.06] dark:ring-white/[0.08] group-hover:ring-blue-500/30 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.1 }}
          transition={{ duration: 0.55 }}
          className="text-4xl mb-6 w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 shadow-inner group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-shadow duration-500"
        >
          {category.icon}
        </motion.div>

        <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100">{category.title}</h4>

        <motion.div
          variants={pillContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {category.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={pillVariants}
              whileHover={{ scale: 1.08, y: -2 }}
              className="bg-slate-200/80 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs px-3 py-1.5 rounded-full hover:bg-blue-500 hover:border-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:border-blue-500 transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="pt-10 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="block text-sm font-bold uppercase tracking-[0.25em] text-blue-500 dark:text-blue-400 mb-3 text-center">
          Capabilities
        </span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-slate-900 dark:text-white">
          Technical Arsenal
        </h3>
        <p className="text-center text-slate-500 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
          A comprehensive toolkit tailored for building high-performance backend systems and
          integrating state-of-the-art AI models.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {skillCategories.map((category, idx) => (
          <SkillCard key={category.title} category={category} idx={idx} />
        ))}
      </div>
    </section>
  );
}