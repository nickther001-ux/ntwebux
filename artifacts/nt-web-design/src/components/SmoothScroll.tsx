import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Mobile : scroll natif seulement
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let currentY = window.scrollY;
    let targetY = window.scrollY;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetY = Math.max(0, Math.min(
        targetY + e.deltaY * 0.8,
        document.body.scrollHeight - window.innerHeight
      ));
    };

    const loop = () => {
      currentY += (targetY - currentY) * 0.1;
      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
