import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../animations';

const steps = [
  {
    number: '01',
    title: 'Découverte',
    description: 'Appel de 30 minutes. On cartographie vos besoins, votre marché, et vos objectifs de revenus.'
  },
  {
    number: '02',
    title: 'Proposition',
    description: 'Proposition détaillée sous 24h. Scope clair, prix fixe, délai garanti. Pas de surprises.'
  },
  {
    number: '03',
    title: 'Construction',
    description: 'Développement sur 72 heures. Vous voyez les progrès en temps réel. Feedback intégré immédiatement.'
  },
  {
    number: '04',
    title: 'Livraison',
    description: 'Déploiement en production. Formation incluse. Support post-livraison de 30 jours.'
  }
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-24 px-6 bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Comment on travaille
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Un processus simple, transparent, et optimisé pour la vitesse.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="text-6xl font-bold text-white/5 absolute top-4 right-4 leading-none select-none">
                {step.number}
              </div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-bold text-sm mb-3 tracking-widest uppercase">
                {step.number}
              </div>
              <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
