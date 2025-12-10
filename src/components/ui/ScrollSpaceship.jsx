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
  const [direction, setDirection] = useState(1);
  const [isMoving, setIsMoving] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const yPosition = useTransform(smoothProgress, [0, 1], ['8vh', '85vh']);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    setDirection(latest > previous ? 1 : -1);

    const velocity = Math.abs(scrollVelocity.get());
    setIsMoving(velocity > 10);
  });

  const skew = useTransform(scrollVelocity, [-1000, 1000], [-8, 8]);
  const scaleY = useTransform(
    scrollVelocity,
    [-1000, 0, 1000],
    [1.15, 1, 1.15]
  );

  return (
    <div className="fixed right-6 top-0 bottom-0 w-12 z-40 hidden lg:flex items-start justify-center pointer-events-none">
      <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent dashed-line" />

      <motion.div style={{ y: yPosition }} className="relative z-10">
        <motion.div
          animate={{ rotate: direction === 1 ? 180 : 0 }}
          style={{ skewY: skew, scaleY: scaleY }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative flex flex-col items-center will-change-transform"
        >
          <div className="relative z-20 bg-gradient-to-br from-[#0B1843] to-[#1a2654] p-2.5 rounded-full border border-white/20 shadow-[0_0_20px_rgba(155,135,254,0.6)]">
            <Rocket size={24} className="text-[#9B87FE] fill-[#9B87FE]/30" />
          </div>

          <motion.div
            animate={{
              height: isMoving ? [12, 28, 12] : [6, 10, 6],
              opacity: isMoving ? [0.8, 1, 0.8] : [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 0.15, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute w-2.5 rounded-full bg-gradient-to-b from-orange-400 via-red-500 to-red-600 blur-[3px] shadow-[0_0_15px_rgba(255,100,0,0.8)] -z-10 ${
              direction === 1 ? '-top-5 rotate-180' : '-bottom-5'
            }`}
          />

          <motion.div
            animate={{
              scale: isMoving ? [1, 1.6, 1] : [1, 1.2, 1],
              opacity: isMoving ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className="absolute inset-0 bg-[#9B87FE] blur-xl -z-20 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
