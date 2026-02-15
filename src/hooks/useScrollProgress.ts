import { useEffect, useState } from "react";

/**
 * Returns progress 0..1 based on how much user scrolled within `rangePx`.
 * Example: rangePx=200 -> at scrollY 0 => 0, at scrollY 200 => 1
 */
export function useScrollProgress(rangePx: number) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const next = Math.min(1, Math.max(0, y / rangePx));
      setP(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [rangePx]);

  return p;
}
