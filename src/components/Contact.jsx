import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiArrowUpRight } from 'react-icons/fi';

const channels = [
  {
    icon: <FiMail size={26} />,
    label: 'Email Me At',
    value: 'shamsiamirhossein1@gmail.com',
    href: 'mailto:shamsiamirhossein1@gmail.com',
  },
  {
    icon: <FiLinkedin size={26} />,
    label: 'Connect on LinkedIn',
    value: 'AmirHossein Shamsi',
    href: 'https://linkedin.com/in/amirhossein-shamsi-b2b97b38b',
    external: true,
  },
  {
    icon: <FiGithub size={26} />,
    label: 'View Source Code',
    value: 'Amir-Hossein-shamsi',
    href: 'https://github.com/Amir-Hossein-shamsi',
    external: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 90, damping: 16 } },
};

const inputClass =
  'w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-600';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('sending');
    const { name, email, message } = form;
    setTimeout(() => {
      window.location.href = `mailto:shamsiamirhossein1@gmail.com?subject=${encodeURIComponent(
        `Portfolio Contact — ${name}`
      )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 900);
  };

  return (
    <section id="contact" className="pt-20 px-4 max-w-6xl mx-auto mb-32">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <span className="block text-sm font-bold uppercase tracking-[0.25em] text-blue-500 dark:text-blue-400 mb-3">
          Contact
        </span>
        <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-4">
          Get In Touch
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Interested in collaborating or have a question? Feel free to reach out. I'm always open to
          discussing new projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Channel cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {channels.map((c) => (
            <motion.a
              key={c.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 6 }}
              whileTap={{ scale: 0.98 }}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group relative flex items-center gap-6 p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none hover:border-blue-500/40 transition-colors duration-300 overflow-hidden"
            >
              {/* Hover gradient sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0"
              >
                {c.icon}
              </motion.div>

              <div className="relative z-10 flex-grow">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  {c.label}
                </p>
                <p className="font-medium text-lg text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">
                  {c.value}
                </p>
              </div>

              <FiArrowUpRight className="relative z-10 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 70, damping: 16 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 lg:p-10 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ali Rezaei"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="test@example.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Say something to break this silence..."
              className={`${inputClass} resize-none`}
            ></textarea>
          </div>

          {/* Animated submit button */}
          <motion.button
            type="submit"
            disabled={status !== 'idle'}
            whileHover={status === 'idle' ? { scale: 1.02 } : {}}
            whileTap={status === 'idle' ? { scale: 0.97 } : {}}
            className={`group relative mt-2 w-full py-4 rounded-2xl text-white font-bold text-lg overflow-hidden flex items-center justify-center gap-3 transition-colors duration-500 shadow-xl ${
              status === 'sent'
                ? 'bg-emerald-500 shadow-emerald-500/25'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/25'
            }`}
          >
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <AnimatePresence mode="wait" initial={false}>
              {status === 'idle' && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex items-center gap-3"
                >
                  Send Message
                  <FiSend className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </motion.span>
              )}
              {status === 'sending' && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="relative flex items-center gap-3"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full inline-block"
                  />
                  Sending...
                </motion.span>
              )}
              {status === 'sent' && (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="relative flex items-center gap-3"
                >
                  <FiCheckCircle /> Sent — Talk soon!
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}