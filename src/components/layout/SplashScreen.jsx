'use client';
import { IMAGE_PATHS } from '@/lib/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen({ finishLoading }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          return 100;
        }
        const jump = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + jump, 100);
      });
    }, 50);
    const timeout = setTimeout(() => {
      finishLoading();
    }, 2800);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1843] overflow-hidden"
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Image
          src={IMAGE_PATHS.logo}
          alt="Loading..."
          width={120}
          height={120}
          className="object-contain"
          priority
        />
        <div className="absolute inset-0 bg-[#9b87fe] blur-3xl opacity-20 animate-pulse" />
      </motion.div>

      <motion.div className="mt-8 flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold text-white tracking-widest font-poppins">
          OPENCODE'25
        </h2>
        <p className="text-[#9b87fe] text-sm tracking-widest uppercase">
          Initializing Environment
        </p>
      </motion.div>

      <div className="absolute bottom-10 right-10">
        <h1 className="text-8xl font-black text-white/5 font-poppins">
          {count}%
        </h1>
      </div>

      <div
        className="absolute bottom-0 left-0 h-1 bg-[#9b87fe]"
        style={{ width: `${count}%`, transition: 'width 0.1s' }}
      />
    </motion.div>
  );
}
