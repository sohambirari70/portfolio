import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 450, damping: 32, mass: 0.4 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 32, mass: 0.4 });

  useEffect(() => {
    if (shouldReduceMotion) {
      setEnabled(false);
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updatePointerType = () => setEnabled(mediaQuery.matches);
    updatePointerType();

    mediaQuery.addEventListener('change', updatePointerType);
    return () => mediaQuery.removeEventListener('change', updatePointerType);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, input, textarea, select, [role="button"]')
      );
      setIsHoveringInteractive(interactive);
    };

    const onLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [enabled, cursorX, cursorY, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Ambient subtle radial glow following cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-cyan-400/10 via-violet-500/5 to-transparent blur-2xl md:block"
        style={{ x: springX, y: springY }}
      />
      {/* Precision ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 transition-[width,height,border-color,background-color] duration-150 md:block"
        style={{
          x: springX,
          y: springY,
          width: isHoveringInteractive ? 36 : 20,
          height: isHoveringInteractive ? 36 : 20,
          backgroundColor: isHoveringInteractive
            ? 'rgba(34, 211, 238, 0.08)'
            : 'transparent',
        }}
      />
    </>
  );
}
