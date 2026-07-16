import { motion } from 'framer-motion';
import { staggerContainer } from '../animations';

const itemVariant = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-950">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
          variants={itemVariant}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Prêt à transformer votre business?
        </motion.h2>

        <motion.p
          className="text-xl text-gray-400 mb-10 leading-relaxed"
          variants={itemVariant}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Plateforme web premium en 72 heures. Pas de templates. Pas de délais. Juste des résultats.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariant}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.a
            href="mailto:info@ntwebux.com"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto text-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            info@ntwebux.com
          </motion.a>
          <motion.a
            href="tel:4388067640"
            className="border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all w-full sm:w-auto text-center"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            438-806-7640
          </motion.a>
        </motion.div>

        <motion.p
          className="mt-8 text-gray-600 text-sm"
          variants={itemVariant}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          NT Digital Group · Montréal, Québec · nickson.t@ntwebux.com
        </motion.p>
      </motion.div>
    </section>
  );
}
