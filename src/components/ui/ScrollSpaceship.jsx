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
  const [direction, setDirection] = useState(1); // 1 = down, -1 = up
  const [isMoving, setIsMoving] = useState(false);

  // 1. Smooth Physics for Position
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Map Progress to Screen Height (10% to 90%)
  const yPosition = useTransform(smoothProgress, [0, 1], ['5vh', '85vh']);

  // 3. Detect Scroll Direction & Movement
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous) {
      setDirection(1); // Moving Down
    } else {
      setDirection(-1); // Moving Up
    }

    // Check velocity to determine if moving
    const velocity = scrollVelocity.get();
    setIsMoving(Math.abs(velocity) > 5);
  });

  // 4. Warp Speed Effect (Stretch based on speed)
  const skew = useTransform(scrollVelocity, [-1000, 1000], [-10, 10]);
  const scaleY = useTransform(scrollVelocity, [-1000, 0, 1000], [1.2, 1, 1.2]);

  return (
    <div className="fixed right-4 top-0 bottom-0 w-12 z-40 hidden lg:flex items-start justify-center pointer-events-none">
      {/* The Track Line */}
      <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent dashed-line" />

      {/* The Spaceship Container */}
      <motion.div style={{ y: yPosition }} className="relative z-10">
        <motion.div
          animate={{ rotate: direction === 1 ? 180 : 0 }} // Rotate based on direction
          style={{ skewY: skew, scaleY: scaleY }} // Warp physics
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative flex flex-col items-center"
        >
          {/* Rocket Body */}
          <div className="relative z-20 bg-[#0B1843] p-2 rounded-full border border-white/20 shadow-[0_0_15px_rgba(155,135,254,0.5)]">
            <Rocket size={24} className="text-[#9b87fe] fill-[#9b87fe]/20" />
          </div>

          {/* Engine Flame (Animated) */}
          <motion.div
            animate={{
              height: isMoving ? [10, 25, 10] : [5, 8, 5],
              opacity: isMoving ? 1 : 0.6,
            }}
            transition={{ duration: 0.2, repeat: Infinity }}
            className={`absolute w-2 rounded-full bg-gradient-to-b from-orange-400 to-red-600 blur-[2px] -z-10 ${
              direction === 1 ? '-top-4 rotate-180' : '-bottom-4'
            }`}
          />

          {/* Blue Thruster Glow */}
          <motion.div
            animate={{
              scale: isMoving ? 1.5 : 1,
              opacity: isMoving ? 0.8 : 0.4,
            }}
            className="absolute inset-0 bg-[#9b87fe] blur-xl -z-20 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
