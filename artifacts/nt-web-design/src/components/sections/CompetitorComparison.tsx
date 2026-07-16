import React from 'react';

export const CompetitorComparison = () => {
  return (
    <section className="py-24 bg-[#030712] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="pill-label mb-4">Competitor Comparison</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-sans">
            Why Compromise on Speed & Quality?
          </h2>
          <p className="text-muted text-lg">
            See how traditional web agencies stack up against the NT WebUX model.
          </p>
        </div>

        {/* Table Wrapper */}
        <div className="glass rounded-2xl overflow-hidden border border-border/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-border/60 text-sm font-semibold uppercase tracking-wider text-muted">
                  <th className="py-6 px-8 w-2/5">Features</th>
                  <th className="py-6 px-8 text-center bg-white/[0.02] border-l border-border/60">
                    <span className="text-white block text-base font-bold">NT WebUX</span>
                    <span className="text-xs text-primary font-normal">Our Model</span>
                  </th>
                  <th className="py-6 px-8 text-center border-l border-border/60">
                    <span className="text-muted-foreground block text-base font-bold">Traditional Agencies</span>
                    <span className="text-xs text-muted font-normal">Typical Experience</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {/* Row 1: Turnaround Time */}
                <tr className="transition-colors hover:bg-white/[0.01]">
                  <td className="py-6 px-8 font-medium text-foreground">Turnaround Time</td>
                  <td className="py-6 px-8 text-center bg-primary/5 font-semibold text-primary border-l border-border/60">
                    72 Hours
                  </td>
                  <td className="py-6 px-8 text-center text-muted border-l border-border/60">
                    4 to 12+ Weeks
                  </td>
                </tr>
                {/* Row 2: Source Code Ownership */}
                <tr className="transition-colors hover:bg-white/[0.01]">
                  <td className="py-6 px-8 font-medium text-foreground">Source Code Ownership</td>
                  <td className="py-6 px-8 text-center bg-primary/5 text-primary border-l border-border/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary mr-2">✓</span> Full Ownership
                  </td>
                  <td className="py-6 px-8 text-center text-muted border-l border-border/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-400 mr-2">✕</span> Restricted / Platform Locked
                  </td>
                </tr>
                {/* Row 3: Modern AI Integration */}
                <tr className="transition-colors hover:bg-white/[0.01]">
                  <td className="py-6 px-8 font-medium text-foreground">AI & Modern Integrations</td>
                  <td className="py-6 px-8 text-center bg-primary/5 font-semibold text-primary border-l border-border/60">
                    Seamless (Built-in)
                  </td>
                  <td className="py-6 px-8 text-center text-muted border-l border-border/60">
                    Extra Cost / Add-on
                  </td>
                </tr>
                {/* Row 4: Monthly Retainers */}
                <tr className="transition-colors hover:bg-white/[0.01]">
                  <td className="py-6 px-8 font-medium text-foreground">Hidden Fees & Retainers</td>
                  <td className="py-6 px-8 text-center bg-primary/5 text-primary border-l border-border/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary mr-2">✓</span> None (One-time build)
                  </td>
                  <td className="py-6 px-8 text-center text-muted border-l border-border/60">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500/10 text-red-400 mr-2">✕</span> Mandatory Monthly Retainers
                  </td>
                </tr>
                {/* Row 5: Communication */}
                <tr className="transition-colors hover:bg-white/[0.01]">
                  <td className="py-6 px-8 font-medium text-foreground">Direct Developer Access</td>
                  <td className="py-6 px-8 text-center bg-primary/5 text-primary border-l border-border/60">
                    Direct (1-on-1)
                  </td>
                  <td className="py-6 px-8 text-center text-muted border-l border-border/60">
                    Account Manager (Middleman)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a href="#contact" className="btn-violet px-8 py-4 h-12 text-base">
            Start Your Build Today
          </a>
        </div>
      </div>
    </section>
  );
};