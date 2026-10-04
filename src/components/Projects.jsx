import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi';

const projectsList = [
  {
    title: 'Supply Chain Impact Analysis',
    category: 'Enterprise Graph Architecture',
    desc: 'A graph-powered business continuity platform engineered to proactively map dependencies, simulate disruption cascades, and optimize logistics flow across complex supply networks.',
    highlights: [
      'Modeled multi-tier supply chain dependencies using Neo4j',
      'Implemented risk simulation algorithms in .NET Core',
      'Event-driven microservices architecture',
    ],
    tech: ['.NET', 'Neo4j', 'Graph Database', 'Microservices'],
    gradient: 'from-blue-600/30 to-indigo-600/30',
    borderGlow: 'hover:border-blue-500/50',
    github: 'https://github.com/Amir-Hossein-shamsi/Supply_Chain_Dependency',
    demo: '',
  },
  {
    title: 'Real-Time Geo-Tracking Engine',
    category: 'High-Concurrency Systems',
    desc: 'A high-performance geospatial tracking engine designed for ultra-low latency. It processes thousands of concurrent telemetry streams for live fleet and package monitoring.',
    highlights: [
      'Scaled WebSocket connections using Redis Pub/Sub',
      'Asynchronous I/O processing with FastAPI',
      'Real-time geofencing and spatial queries',
    ],
    tech: ['FastAPI', 'WebSockets', 'Redis', 'Geospatial'],
    gradient: 'from-emerald-600/30 to-teal-600/30',
    borderGlow: 'hover:border-emerald-500/50',
    github: 'https://github.com/Amir-Hossein-shamsi/Real-Time-Geo-Tracking-Application',
    demo: '',
  },
  {
    title: 'AddressIntel Engine',
    category: 'Geospatial Data Engineering',
    desc: 'An advanced address standardization and geocoding pipeline. Built to parse, clean, and validate unstructured location data into precise spatial coordinates efficiently.',
    highlights: [
      'Advanced text parsing and normalisation',
      'High-performance spatial indexing with PostGIS',
      'CQRS pattern for separated read/write workloads',
    ],
    tech: ['C#', 'PostGIS', 'Entity Framework', 'CQRS'],
    gradient: 'from-orange-600/30 to-red-600/30',
    borderGlow: 'hover:border-orange-500/50',
    github: 'https://github.com/Amir-Hossein-shamsi/AddressIntel',
    demo: '',
  },
  {
    title: 'QuantumLeap GPT',
    category: 'AI & LLM Orchestration',
    desc: 'A sophisticated agentic pipeline featuring dynamic prompt routing and semantic memory. It seamlessly toggles between multi-model LLMs to deliver context-aware, highly accurate responses.',
    highlights: [
      'Semantic search and context retrieval (RAG)',
      'Dynamic routing between GPT-4 and Gemini',
      'Persistent conversation memory using Vector DBs',
    ],
    tech: ['Python', 'LangChain', 'LLMs', 'Vector DB'],
    gradient: 'from-pink-600/30 to-purple-600/30',
    borderGlow: 'hover:border-pink-500/50',
    github: 'https://github.com/Amir-Hossein-shamsi/quantumleap-gpt',
    demo: '',
  },
  {
    title: 'Smart Energy Analytics',
    category: 'IoT & Telemetry Analytics',
    desc: 'A scalable energy telemetry platform built with Django and GraphQL to aggregate, process, and analyze real-time power consumption metrics across distributed smart devices.',
    highlights: [
      'Flexible schema-driven data fetching using GraphQL APIs',
      'Time-series ingestion and schema-less storage via MongoDB',
      'Containerized deployment with Docker and automated ingestion pipelines',
    ],
    tech: ['Django', 'GraphQL', 'MongoEngine', 'Docker'],
    gradient: 'from-amber-500/30 to-yellow-600/30',
    borderGlow: 'hover:border-amber-500/50',
    github: 'https://github.com/Amir-Hossein-shamsi/Energy-Analytics',
    demo: '',
  },
  {
    title: 'VitaGuide Nutrition Assistant',
    category: 'RAG & Bio-Intelligence',
    desc: 'A specialized biomedical RAG assistant that extracts and synthesizes empirical nutritional data from clinical literature to provide factual, evidence-based dietary recommendations.',
    highlights: [
      'High-precision semantic retrieval pipeline using LangChain',
      'Domain-adapted inference utilizing optimized GPT-4o-mini',
      'Automated extraction pipeline for unstructured clinical content',
    ],
    tech: ['Python', 'LangChain', 'LLMs', 'RAG', 'Vector DB'],
    gradient: 'from-teal-600/30 to-cyan-600/30',
    borderGlow: 'hover:border-teal-500/50',
    github: 'https://github.com/Amir-Hossein-shamsi/vitaguide',
    demo: '',
  },
];

const techContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const techItem = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 350, damping: 20 } },
};

function ProjectCard({ project, idx }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), { stiffness: 160, damping: 20 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (idx % 2) * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      className={`relative glass rounded-3xl p-8 lg:p-10 group flex flex-col h-full border border-slate-200/50 dark:border-white/10 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-shadow duration-500 ${project.borderGlow}`}
    >
      {/* Clipped ambient glow + watermark */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div
          className={`absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br ${project.gradient} rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-700 opacity-40 dark:opacity-80`}
        />
        <span className="absolute -bottom-6 right-4 text-[7rem] leading-none font-black text-slate-900/[0.04] dark:text-white/[0.05] select-none">
          {String(idx + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content pops forward in 3D while the card tilts */}
      <div className="relative z-10 flex flex-col flex-grow" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 block">
              {project.category}
            </span>
            <h4 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white pr-4 leading-tight">
              {project.title}
            </h4>
          </div>
          <div className="flex gap-3 text-slate-400">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: -8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label="View Source Code on GitHub"
              >
                <FiGithub size={20} />
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="p-2 bg-slate-100 dark:bg-white/5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 hover:text-emerald-500 transition-colors"
                aria-label="Visit Live Demo"
              >
                <FiExternalLink size={20} />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-base">{project.desc}</p>

        <ul className="mb-8 space-y-2 flex-grow">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
              <FiCheckCircle className="mt-1 mr-3 flex-shrink-0 opacity-70" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <motion.div
          variants={techContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-200/50 dark:border-white/10"
        >
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              variants={techItem}
              whileHover={{ y: -3, scale: 1.06 }}
              className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-md backdrop-blur-md border border-slate-200/60 dark:border-white/10"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="pt-20 pb-10 px-4 max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 text-center"
      >
        <span className="block text-sm font-bold uppercase tracking-[0.25em] text-blue-500 dark:text-blue-400 mb-3">
          Portfolio
        </span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 mb-6 tracking-tight">
          Featured Engineering Work
        </h3>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Showcasing enterprise-grade architectures, intelligent geospatial engines, and
          high-concurrency systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {projectsList.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
}