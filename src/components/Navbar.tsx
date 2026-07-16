import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-gray-950/80 border-b border-white/5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <a href="/" className="text-white font-bold text-xl tracking-tight">
        NT<span className="text-blue-500">webux</span>
      </a>

      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#how-we-work" className="hover:text-white transition-colors">How We Work</a>
        <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
      </div>

      <motion.a
        href="#contact"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Book a Demo
      </motion.a>
    </motion.nav>
  );
}
