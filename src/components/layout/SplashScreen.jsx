'use client';
import { IMAGE_PATHS } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen({ finishLoading }) {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState([]);

  // ---------------------------
  // 1️⃣ Countdown / completion timer
  // ---------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        }
        const jump = Math.floor(Math.random() * 12) + 3;
        return Math.min(prev + jump, 100);
      });
    }, 40);

    const timeout = setTimeout(() => {
      finishLoading();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [finishLoading]);

  // ---------------------------
  // 2️⃣ Generate particles safely after mount
  // ---------------------------
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const generated = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      floatTo: Math.random() * height,
      duration: Math.random() * 3 + 2,
    }));

    setParticles(generated);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center
      bg-gradient-to-br from-[#0B1843] via-[#1a2654] to-[#0B1843] overflow-hidden"
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* 🌌 Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#9B87FE] rounded-full"
            initial={{
              x: p.x,
              y: p.y,
              scale: p.scale,
              opacity: p.opacity,
            }}
            animate={{
              y: p.floatTo,
              opacity: 0,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1],
        }}
        className="relative"
      >
        <Image
          src={IMAGE_PATHS.logo}
          alt="Loading..."
          width={140}
          height={140}
          className="object-contain relative z-10"
          priority
        />

        <motion.div
          className="absolute inset-0 bg-[#9B87FE] blur-3xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Text */}
      <motion.div
        className="mt-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider font-poppins">
          OPENCODE<span className="text-[#9B87FE]">'25</span>
        </h2>

        <motion.p
          className="text-[#9B87FE] text-sm tracking-widest uppercase font-semibold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing Environment
        </motion.p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r
        from-[#9B87FE] via-[#FF9FB8] to-[#9B87FE]"
        style={{ width: `${count}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Big Percentage */}
      <motion.div
        className="absolute bottom-12 right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h1 className="text-7xl md:text-9xl font-black text-white/5 font-poppins">
          {count}%
        </h1>
      </motion.div>
    </motion.div>
  );
}
