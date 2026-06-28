import React from "react";
import { useLanguage } from "@/lib/i18n";

export const AnimatedWhyUs = () => {
  const { t } = useLanguage();
  const title: string = t("whyUs.title");

  return (
    <section className="relative w-full overflow-hidden bg-[#030712] py-20 text-center text-white">
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-600/20 blur-[110px]" />
      <h2 className="relative z-10 text-4xl md:text-5xl font-bold">{title}</h2>
    </section>
  );
};