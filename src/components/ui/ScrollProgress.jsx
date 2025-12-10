'use client';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = useTransform(scaleX, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    // Throttle scroll event for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1843]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(155,135,254,0.4)] transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(155,135,254,0.6)] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
          >
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#9B87FE" />
                  <stop offset="100%" stopColor="#FF9FB8" />
                </linearGradient>
              </defs>
            </svg>

            <ArrowUp className="relative z-10 h-5 w-5 text-[#9B87FE] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-white" />

            <div className="absolute inset-0 rounded-full bg-[#9B87FE] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
