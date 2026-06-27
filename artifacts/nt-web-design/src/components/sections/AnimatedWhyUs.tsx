import React from "react";
const cards = [
  { title: "Code Ownership", desc: "You own 100% of your source code. No vendor lock-in." },
  { title: "72h Delivery", desc: "High-performance websites built and shipped in just 3 days." },
  { title: "AI-Driven", desc: "Modern AI solutions integrated directly into your workflow." },
  { title: "Canada & USA", desc: "Optimized for the North American market and speed." },
];
export const AnimatedWhyUs = () => {
  return (
    <section className="py-20 overflow-hidden bg-black text-white">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center">Why Choose Us?</h2>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...cards, ...cards].map((card, idx) => (
            <div
              key={idx}
              className="w-80 h-96 mx-4 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col justify-between shrink-0"
            >
              <h3 className="text-2xl font-bold">{card.title}</h3>
              <p className="text-zinc-400 mt-4">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};
