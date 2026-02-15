import { useEffect, useState } from "react";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/**
 * Returns 0..1 based on scrollY / rangePx, smoothed with rAF.
 */
export function useScrollProgress(rangePx: number) {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const next = clamp01(window.scrollY / Math.max(1, rangePx));
      setP(next);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [rangePx]);

  return p;
}
