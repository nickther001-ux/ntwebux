import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
  Layout,
  ShoppingCart,
  Search,
  Smartphone,
  Zap,
  ShieldCheck,
} from "lucide-react";

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Layout,
      title: "Business Website",
      desc: "Professional sites that build trust.",
      id: "01",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Store",
      desc: "High-conversion online shops.",
      id: "02",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      desc: "Get found on the first page.",
      id: "03",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      desc: "Custom iOS and Android solutions.",
      id: "04",
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Lightning fast loading speeds.",
      id: "05",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      desc: "Enterprise-grade protection.",
      id: "06",
    },
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <service.icon size={24} />
                </div>
                <span className="text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                  {service.id}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
