import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, slideInLeft } from '../animations';

const features = [
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: '72-Hour Delivery',
    description: 'From contract signed to production deployment. No 6-week queues. Your digital asset is live before your next weekly standup.',
    active: true
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Full Code Ownership',
    description: 'You own 100% of the source code. No vendor lock-in, no monthly fees for access to your own platform.',
    active: false
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Bilingual by Default',
    description: 'Every platform we build ships in French and English. No plugin, no extra configuration.',
    active: false
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'AI-Driven Systems',
    description: 'Intelligent automation baked in from day one. Not retrofitted. Your platform gets smarter over time.',
    active: false
  }
];

export default function Features() {
  const activeFeature = features[0];

  return (
    <section id="services" className="py-24 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <motion.div
            className="bg-gray-900 border border-white/8 rounded-2xl p-8"
            variants={slideInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="w-14 h-14 bg-blue-600/15 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
              {activeFeature.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{activeFeature.title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">{activeFeature.description}</p>
            <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent w-32"></div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl border transition-all cursor-pointer ${
                  idx === 0
                    ? 'bg-gray-900 border-blue-500/30 text-white'
                    : 'bg-gray-900/40 border-white/5 text-gray-400 hover:text-gray-200 hover:border-white/10'
                }`}
                variants={fadeInUp}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <span className={idx === 0 ? 'text-blue-400' : 'text-gray-600'}>
                  {feature.icon}
                </span>
                <span className="font-semibold text-base">{feature.title}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
