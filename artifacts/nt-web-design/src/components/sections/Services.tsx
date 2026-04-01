import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layout,
  ShoppingCart,
  Search,
  Wrench,
  Zap,
  Database,
  Bot,
  Building2,
  X,
} from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Website Design",
    short: "Modern, conversion-focused design tailored to your brand.",
    desc: "Modern, user-focused design tailored to your brand. We focus on conversion and clean engineering — every pixel placed with purpose to turn visitors into paying clients.",
    id: "01",
  },
  {
    icon: Zap,
    title: "Development",
    short: "Lightning-fast frameworks, scalable & secure.",
    desc: "Custom web development using modern, lightning-fast frameworks. Scalable architectures optimized for speed and security — built to perform flawlessly on every device.",
    id: "02",
  },
  {
    icon: ShoppingCart,
    title: "eCommerce",
    short: "High-conversion stores with seamless payments.",
    desc: "Secure online stores with high-end payment integrations and inventory management. We build eCommerce solutions that make buying effortless and selling more profitable.",
    id: "03",
  },
  {
    icon: Database,
    title: "CMS Integration",
    short: "Take full control — no code needed.",
    desc: "Take full control of your website. Intuitive CMS integration lets you easily update text, manage blogs, and upload images without touching a single line of code.",
    id: "04",
  },
  {
    icon: Search,
    title: "SEO & Marketing",
    short: "Rank where it matters. Be found.",
    desc: "Ranking you where it matters. Technical SEO, keyword strategy, and performance optimization included — so the right people find you at exactly the right moment.",
    id: "05",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    short: "Peace of mind — we handle the rest.",
    desc: "Enjoy peace of mind with our dedicated support. Monthly security updates, daily cloud backups, bug fixes, and 24/7 uptime monitoring so your site never goes down.",
    id: "06",
  },
  {
    icon: Building2,
    title: "Enterprise SaaS",
    short: "Multi-tenant cloud apps at scale.",
    desc: "Scalable, multi-tenant cloud applications engineered for high performance. We architect and build enterprise-grade SaaS platforms ready to handle thousands of concurrent users.",
    id: "07",
  },
  {
    icon: Bot,
    title: "AI Integrations",
    short: "Smart automation that drives conversions.",
    desc: "Supercharge your business with custom AI solutions. Smart chatbots, automated customer service workflows, and advanced AI agents tailored to save you time and drive conversions.",
    id: "08",
  },
];

export function Services() {
  const { t } = useLanguage();
  const [active, setActive] = useState<typeof services[0] | null>(null);

  return (
    <section className="py-24 px-5 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-12 bg-blue-500" />
            <span className="text-sm font-bold tracking-widest text-blue-500 uppercase">
              Our Expertise
            </span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight text-white">
            EVERYTHING YOU NEED TO <br /> DOMINATE YOUR MARKET.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              onClick={() => setActive(service)}
              className="group p-7 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <service.icon size={22} />
                </div>
                <span className="text-3xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  {service.id}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.short}</p>
              <div className="mt-4 text-[11px] font-bold uppercase tracking-widest text-blue-500/60 group-hover:text-blue-400 transition-colors">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />

            {/* Modal box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
              style={{ position: "relative" }}
            >
              <div
                style={{ position: "relative" }}
                className="bg-[#060A14] border border-blue-500/25 rounded-xl p-8 shadow-[0_20px_60px_rgba(0,140,255,0.2)]"
              >
                {/* Close button */}
                <button
                  onClick={() => setActive(null)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1.5rem",
                    background: "transparent",
                    border: "none",
                    color: "rgba(180,200,230,0.5)",
                    cursor: "pointer",
                    fontSize: "1.4rem",
                    lineHeight: 1,
                    zIndex: 50,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(180,200,230,0.5)")}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded">
                    <active.icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-500/60 mb-1">
                      {active.id}
                    </div>
                    <h3 className="text-xl font-black text-white">{active.title}</h3>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-sm mb-8">
                  {active.desc}
                </p>

                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="block text-center w-full py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold text-sm uppercase tracking-wider transition-colors rounded"
                >
                  Get a Free Quote
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
