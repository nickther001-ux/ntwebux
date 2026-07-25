import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../animations';

const projects = [
  {
    name: 'Ace Esthétique',
    url: 'acesthetique.ca',
    category: 'Booking Platform',
    description: 'Système de réservation automatisé + panel administratif. Zéro appels téléphoniques.',
    tag: 'Live'
  },
  {
    name: 'AudreyRH',
    url: 'audreyrh.com',
    category: 'HR Platform',
    description: 'Plateforme RH automatisée avec CRM custom et intégration email avancée.',
    tag: 'Live'
  },
  {
    name: 'Phanor Distribution',
    url: '',
    category: 'E-Commerce',
    description: 'Infrastructure digitale pour distributeur premium de viandes et fruits de mer à Montréal.',
    tag: 'Live'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Nos Réalisations <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-extrabold">Clients</span>
            Clients actifs
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Des systèmes réels, en production, qui génèrent des revenus aujourd'hui.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              variants={fadeInUp}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-1">
                    {project.category}
                  </p>
                  <h3 className="text-white font-bold text-xl">{project.name}</h3>
                </div>
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-2.5 py-1 rounded-full">
                  {project.tag}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
              {project.url && (
                <a
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                  {project.url} →
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
