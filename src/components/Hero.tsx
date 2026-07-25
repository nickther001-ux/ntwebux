import { motion } from 'framer-motion';
import { staggerContainer } from '../animations';

const itemVariant = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-950 pt-20 px-6 overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="inline-block bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-8"
          variants={itemVariant}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Agence Web Premium · Montreal
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.08] tracking-tight"
          variants={itemVariant}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Infrastructure Web & Solutions{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 font-extrabold">Premium</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariant}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Livraison en 72 heures. Systèmes automatisés. Moteurs de revenus pour professionnels B2B.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariant}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.a
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] active:scale-[0.98] w-full sm:w-auto text-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Réserver une démo
          </motion.a>
          <motion.a
            href="#services"
            className="border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all w-full sm:w-auto text-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir nos services
          </motion.a>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500"
          variants={itemVariant}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            50+ Clients actifs
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            Livraison 100% à temps
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
            FR / EN par défaut
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
