import { useEffect, useState } from "react";

export function useScrollProgress(maxPx = 1200) {
  const [p, setP] = useState(0); // 0..1

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const next = Math.min(1, Math.max(0, y / maxPx));
      setP(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [maxPx]);

  return p;
}
