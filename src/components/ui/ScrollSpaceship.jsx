'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { Rocket } from 'lucide-react';
import { useState } from 'react';

export default function ScrollSpaceship() {
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const [direction, setDirection] = useState(1); // 1 = scrolling DOWN, -1 = scrolling UP
  const [isMoving, setIsMoving] = useState(false);

  // Smooth vertical movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const yPosition = useTransform(smoothProgress, [0, 1], ['10vh', '85vh']);
  const velocityAbs = useTransform(scrollVelocity, (v) => Math.abs(v));

  // Detect scroll direction + movement
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious();
    setDirection(latest > prev ? 1 : -1);
    setIsMoving(Math.abs(scrollVelocity.get()) > 40);
  });

  // Flame physics
  const flameHeight = useTransform(velocityAbs, [0, 2000], ['0px', '60px']);
  const flameOpacity = useTransform(velocityAbs, [0, 200], [0, 1]);
  const flameWidthScale = useTransform(velocityAbs, [0, 2000], [1, 0.6]);

  // Smooth rotation based on scroll direction
  const rotation = direction === 1 ? 180 : 0;

  return (
    <div className="fixed right-8 top-0 bottom-0 w-24 z-50 hidden lg:flex justify-center pointer-events-none">
      <motion.div style={{ y: yPosition }} className="relative">
        {/* 🚀 ROCKET BODY WITH ROTATION */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
            mass: 0.8,
          }}
          className="relative z-20 bg-slate-950 p-4 rounded-full shadow-xl border-2 border-indigo-500/50 hover:border-indigo-400/70 transition-colors"
          style={{
            boxShadow:
              '0 0 30px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(99, 102, 241, 0.1)',
          }}
        >
          <Rocket size={28} className="text-indigo-200" strokeWidth={2.5} />
        </motion.div>

        {/* 🔥 PHYSICS-ACCURATE THRUST FLAME */}
        <motion.div
          style={{
            height: flameHeight,
            opacity: flameOpacity,
            scaleX: flameWidthScale,
            // Flame appears opposite to travel direction
            // Scrolling DOWN (rocket moving down) → flame on TOP
            // Scrolling UP (rocket moving up) → flame on BOTTOM
            top: direction === 1 ? '-60px' : undefined,
            bottom: direction === -1 ? '-60px' : undefined,
            originY: direction === 1 ? 'bottom' : 'top',
          }}
          className="absolute left-1/2 -translate-x-1/2 w-5 z-10"
        >
          {/* Inner Flame Core */}
          <motion.div
            animate={{
              scaleY: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 blur-[3px]"
            style={{
              background:
                direction === 1
                  ? 'linear-gradient(to top, #ffffff, #fbbf24, #f97316, transparent)'
                  : 'linear-gradient(to bottom, #ffffff, #fbbf24, #f97316, transparent)',
              borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
            }}
          />

          {/* Outer Flame Glow */}
          <motion.div
            animate={{
              scaleY: [1, 1.15, 0.9, 1],
              scaleX: [1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 blur-xl opacity-60"
            style={{
              background:
                direction === 1
                  ? 'linear-gradient(to top, #f97316, #ef4444, #991b1b, transparent)'
                  : 'linear-gradient(to bottom, #f97316, #ef4444, #991b1b, transparent)',
              borderRadius: '50% 50% 50% 50% / 20% 20% 80% 80%',
            }}
          />

          {/* Flame Particles */}
          <motion.div
            animate={{
              opacity: [0.5, 0.8, 0.4, 0.6],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
            }}
            className="absolute inset-0 blur-sm"
            style={{
              background:
                direction === 1
                  ? 'radial-gradient(ellipse at center, #fbbf24, transparent 70%)'
                  : 'radial-gradient(ellipse at center, #fbbf24, transparent 70%)',
            }}
          />
        </motion.div>

        {/* 🌌 Dynamic Glow Aura */}
        <motion.div
          animate={{
            scale: isMoving ? [1, 1.3, 1.1, 1] : [1, 1.05, 1],
            opacity: isMoving ? [0.3, 0.5, 0.3] : [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: isMoving ? 0.8 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-indigo-500 blur-3xl rounded-full -z-10"
        />

        {/* Secondary Glow Ring */}
        <motion.div
          animate={{
            scale: isMoving ? [1.2, 1.5, 1.2] : 1,
            opacity: isMoving ? [0.2, 0.4, 0.2] : 0.1,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-purple-500 blur-2xl rounded-full -z-20"
        />
      </motion.div>
    </div>
  );
}
