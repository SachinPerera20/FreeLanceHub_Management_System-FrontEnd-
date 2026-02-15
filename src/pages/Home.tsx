import { useMemo } from "react";
import { useScrollProgress } from "../hooks/useScrollProgress";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HomePage() {
  // 0..1 based on first 900px of scroll
  const p = useScrollProgress(900);

  const heroOpacity = useMemo(
    () => lerp(1, 0, Math.max(0, (p - 0.55) / 0.35)),
    [p],
  );
  const heroScale = useMemo(() => lerp(1, 0.94, Math.min(1, p * 1.1)), [p]);
  const bgBlur = useMemo(() => lerp(0, 16, Math.min(1, p * 1.2)), [p]);
  const bgDim = useMemo(() => lerp(0.15, 0.55, Math.min(1, p * 1.2)), [p]);
  const drift = useMemo(() => lerp(0, 70, p), [p]);

  return (
    <div className="text-white">
      <div className="relative">
        {/* Sticky hero */}
        <section
          id="home-hero"
          className="sticky top-0 h-screen overflow-hidden"
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              filter: `blur(${bgBlur}px)`,
              transform: `scale(${1.05 + p * 0.06})`,
            }}
          >
            <div className="absolute inset-0 bg-black" />
            <div className="absolute -inset-[30%] opacity-60 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.45),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_40%_80%,rgba(244,63,94,0.25),transparent_60%)]" />
          </div>

          {/* Dim overlay */}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: bgDim }}
          />

          {/* Floating tiles */}
          <FloatingTiles drift={drift} />

          {/* Center content */}
          <div className="relative h-full flex items-center justify-center px-6">
            <div
              className="max-w-3xl text-center"
              style={{
                opacity: heroOpacity,
                transform: `scale(${heroScale}) translateY(${lerp(0, -14, p)}px)`,
                transition: "transform 30ms linear, opacity 30ms linear",
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                FreelancerHub • Discover work, hire talent
              </div>

              <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight">
                Your space for <span className="text-white/80">projects</span>
              </h1>

              <p className="mt-4 text-white/70 text-lg">
                Post jobs, submit proposals, manage contracts — all in one
                place.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button className="rounded-full bg-white text-black px-6 py-3 font-medium hover:opacity-90 transition">
                  Get Started
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white/90 backdrop-blur hover:bg-white/10 transition">
                  Explore Jobs
                </button>
              </div>

              <p className="mt-8 text-xs text-white/50">Scroll to explore ↓</p>
            </div>
          </div>
        </section>

        {/* Spacer so hero can fade out before next content */}
        <div className="h-[90vh]" />

        {/* Reveal section (NORMAL FLOW) */}
        <section className="relative bg-white text-black py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Taste isn’t born.
              <br />
              It’s built.
            </h2>
            <p className="mt-4 text-black/60 text-lg">
              Build your profile, craft proposals, and win better work.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="rounded-2xl bg-black/90 text-white px-6 py-4 shadow-xl">
                <span className="text-white/70 text-sm">Next:</span> Browse jobs
                → submit proposals → start contracts
              </div>
            </div>
          </div>

          <div className="absolute inset-0 -z-10 opacity-60 bg-[radial-gradient(circle_at_50%_0%,rgba(0,0,0,0.10),transparent_55%)]" />
        </section>

        {/* Normal content */}
        <section className="bg-white text-black py-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Post Jobs"
              desc="Create jobs with budget, skills, and deadlines."
            />
            <FeatureCard
              title="Send Proposals"
              desc="Apply with cover letters, pricing, and timelines."
            />
            <FeatureCard
              title="Manage Contracts"
              desc="Accept offers and track milestones and status."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-black/60">{desc}</p>
    </div>
  );
}

function FloatingTiles({ drift }: { drift: number }) {
  const tiles = [
    { top: "14%", left: "6%", w: 220, h: 260, r: -8 },
    { top: "18%", left: "78%", w: 260, h: 180, r: 10 },
    { top: "64%", left: "10%", w: 260, h: 190, r: 7 },
    { top: "70%", left: "74%", w: 220, h: 280, r: -6 },
    { top: "40%", left: "88%", w: 160, h: 160, r: 12 },
    { top: "42%", left: "2%", w: 160, h: 160, r: -12 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {tiles.map((t, i) => (
        <div
          key={i}
          className="absolute rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm shadow-[0_20px_80px_rgba(0,0,0,0.35)] overflow-hidden"
          style={{
            top: t.top,
            left: t.left,
            width: t.w,
            height: t.h,
            transform: `translateY(${(i % 2 === 0 ? 1 : -1) * drift}px) rotate(${t.r}deg)`,
            transition: "transform 30ms linear",
          }}
        >
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.28),transparent_55%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
        </div>
      ))}
    </div>
  );
}
