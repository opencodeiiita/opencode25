'use client';
import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS, IMAGE_PATHS } from '@/lib/constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yImg = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-transparent"
    >
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#9b87fe]/30 bg-[#9b87fe]/10">
              <span className="text-sm font-semibold text-[#9b87fe]">
                🚀 Registration Open
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight text-white">
              Start your <br />{' '}
              <span className="text-[#9b87fe]">Open Source</span> Odyssey.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-lg">
              A month-long journey into software development. No experience
              required—just an enthusiastic heart to learn.
            </p>
            <div className="flex gap-4">
              <Button
                className="h-12 px-8 rounded-full bg-[#9b87fe] hover:bg-[#8A76ED]"
                onClick={() => window.open(EXTERNAL_LINKS.unstop)}
              >
                Join Unstop
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white"
                onClick={() => window.open(EXTERNAL_LINKS.githubOrg)}
              >
                View Projects
              </Button>
            </div>
          </motion.div>

          <motion.div
            style={{ y: yImg }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={IMAGE_PATHS.mainImage}
                alt="Illustration"
                width={600}
                height={500}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
