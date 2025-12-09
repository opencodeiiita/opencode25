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

  // Smooth out the progress value so it doesn't jitter
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to the circle's path length
  // 0 = empty, 1 = full circle
  const pathLength = useTransform(scaleX, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      // Show button only after scrolling 100px
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
        >
          <button
            onClick={scrollToTop}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1843]/80 backdrop-blur-md shadow-[0_0_20px_rgba(155,135,254,0.3)] transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(155,135,254,0.5)] border border-white/10"
          >
            {/* The SVG Progress Ring */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              {/* Foreground Indicator */}
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#9b87fe"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>

            {/* The Icon */}
            <ArrowUp className="relative z-10 h-5 w-5 text-[#9b87fe] transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-white" />

            {/* Inner Glow Dot */}
            <div className="absolute inset-0 rounded-full bg-[#9b87fe] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-20" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
