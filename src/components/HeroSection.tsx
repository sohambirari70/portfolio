import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail, Sparkles } from 'lucide-react';
import { PortfolioProfile } from '../types/portfolio';

interface HeroSectionProps {
  profile: PortfolioProfile;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles =
    profile.animatedRoles.length > 0
      ? profile.animatedRoles
      : ['Aspiring AI/ML Engineer', 'Python Developer'];

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduceMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };
    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = width < 640 ? 28 : 52;
      particles.length = 0;
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 0.8,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains('dark');
      const nodeColor = isDark ? 'rgba(34, 211, 238, 0.55)' : 'rgba(14, 116, 144, 0.35)';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Gentle mouse repulsion/attraction
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 140 && distMouse > 1) {
          p.x -= (dxMouse / distMouse) * 0.35;
          p.y -= (dyMouse / distMouse) * 0.35;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 125) {
            const alpha = (1 - dist / 125) * (isDark ? 0.16 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${alpha})`
              : `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationId = window.requestAnimationFrame(draw);
    };

    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reduceMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Subtle grid + ambient mesh gradients */}
      <div aria-hidden="true" className="bg-grid-pattern pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/12 to-violet-600/18 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[110px]"
      />

      {/* Interactive particle network canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Status badge */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/75 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
          <span>
            {profile.currentStatus} &middot; {profile.college}
          </span>
        </motion.div>

        {/* Prominent Name */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="font-mono text-sm font-semibold tracking-[0.28em] text-cyan-600 uppercase sm:text-base dark:text-cyan-400"
        >
          {profile.name.toUpperCase()}
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="font-display mx-auto mt-4 max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl dark:text-white"
        >
          {profile.headline.split('. ').map((part, idx, arr) => (
            <span key={idx} className="block">
              {idx === arr.length - 1 ? (
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-blue-400 dark:to-violet-400">
                  {part}
                </span>
              ) : (
                `${part}.`
              )}
            </span>
          ))}
        </motion.h1>

        {/* Animated Role Ticker */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex min-h-9 items-center justify-center gap-2 font-mono text-sm sm:text-base"
        >
          <span className="text-slate-500 dark:text-slate-400">&gt;</span>
          <div className="relative flex h-7 items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex % roles.length]}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="font-medium text-violet-600 dark:text-cyan-300"
              >
                {roles[roleIndex % roles.length]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Short Introduction */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
        >
          {profile.heroIntro}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <span>Explore My Work</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-100 dark:hover:border-cyan-400/50 dark:hover:bg-white/[0.08]"
          >
            <Mail className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <span>Contact Me</span>
          </button>
        </motion.div>

        {/* Interest Tags */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-lg border border-slate-200/80 bg-white/60 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400"
            >
              {interest}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('about');
        }}
        aria-label="Scroll to About section"
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-xs font-mono text-slate-500 transition-colors hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-300"
      >
        <span>scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
