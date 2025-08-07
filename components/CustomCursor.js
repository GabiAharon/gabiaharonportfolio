import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHoverInteractive, setIsHoverInteractive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const x = useSpring(0, { stiffness: 500, damping: 40, mass: 0.8 });
  const y = useSpring(0, { stiffness: 500, damping: 40, mass: 0.8 });

  useEffect(() => {
    // Desktop only
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    setEnabled(isDesktop);
    if (!isDesktop) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const down = () => setIsMouseDown(true);
    const up = () => setIsMouseDown(false);
    const over = (e) => {
      const el = e.target;
      const isInteractive = el.closest('a, button, [role="button"], input, textarea, select, .cursor-interactive');
      setIsHoverInteractive(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseover', over, true);

    // keep cursor enabled within the window; no document mouseleave toggling
    const onResize = () => setEnabled(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseover', over, true);
      window.removeEventListener('resize', onResize);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringScale = isMouseDown ? 0.7 : isHoverInteractive ? 1.25 : 1;
  const ringOpacity = isMouseDown ? 0.6 : 0.8;
  const dotScale = isHoverInteractive ? 0.4 : 1;

  return (
    <>
      {/* Ring */}
      <motion.div
        className="fixed z-[9999] pointer-events-none hidden lg:block"
        style={{ translateX: x, translateY: y }}
        aria-hidden
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 shadow-[0_0_20px_rgba(168,182,255,0.25)]"
          animate={{ scale: ringScale, opacity: ringOpacity }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{ width: 26, height: 26, boxShadow: '0 0 30px rgba(120,140,255,0.25)' }}
        />
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed z-[9999] pointer-events-none hidden lg:block"
        style={{ translateX: x, translateY: y }}
        aria-hidden
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale: dotScale, opacity: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ width: 6, height: 6 }}
        />
      </motion.div>
    </>
  );
}


