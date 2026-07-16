import { Users, Lightbulb, Car, Dumbbell } from "lucide-react";

const logos = [
  { name: "AudreyRH", category: "HR", icon: Users },
  { name: "Living Lights", category: "RETAIL", icon: Lightbulb },
  { name: "AceStethique", category: "AUTO DETAILING", icon: Car },
  { name: "SeriousInc", category: "FITNESS", icon: Dumbbell },
];

export default function LogoBar() {
  return (
    <section className="w-full bg-[#0a0e1a] py-16 px-6">
      <p className="text-center text-[11px] tracking-[0.25em] text-slate-500 font-semibold mb-10">
        POWERING OPERATIONS ACROSS 3 CONTINENTS
      </p>

      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {logos.map(({ name, category, icon: Icon }) => (
          <div key={name} className="flex items-center gap-2.5 opacity-70">
            <Icon className="w-5 h-5 text-slate-400" strokeWidth={1.75} />
            <div className="leading-tight">
              <div className="text-slate-200 font-semibold text-sm">{name}</div>
              <div className="text-slate-500 text-[10px] tracking-wide">{category}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
