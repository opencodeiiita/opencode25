'use client';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton.jsx';
import { Button } from '@/components/ui/Button';
import { EXTERNAL_LINKS, IMAGE_PATHS } from '@/lib/constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yImg = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div
          className="absolute top-6 right-6 hidden md:flex items-center gap-3 z-30"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '6px 10px',
            borderRadius: 9999,
            backdropFilter: 'blur(6px)'
          }}
          aria-hidden={false}
        >
          <a
            href="https://ethindia.org"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ETHIndia"
            className="block p-1 rounded-md hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/images/ethindia-light.png"
              alt="ETHIndia"
              width={120}
              height={30}
              className="object-contain"
            />
          </a>

          <div className="w-px h-6 bg-white/10" aria-hidden="true" />

          <a
            href="https://devfolio.co"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Devfolio"
            className="block p-1 rounded-md hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/images/Devfolio_Logo-White.png"
              alt="Devfolio"
              width={120}
              height={26}
              className="object-contain"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            style={{ y: yText, opacity }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[#9B87FE]/30 bg-[#9B87FE]/10 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-[#9B87FE]" />
              <span className="text-sm font-semibold text-[#9B87FE] tracking-wide">
                Apply with Devfolio
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] text-white">
              Start your{' '}
              <span className="inline-block bg-gradient-to-r from-[#9B87FE] via-[#FF9FB8] to-[#9B87FE] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Open Source
              </span>
              <br />
              Odyssey
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-lg leading-relaxed">
              A month-long journey into software development. No experience
              required—just an{' '}
              <span className="text-[#9B87FE] font-semibold">
                enthusiastic heart
              </span>{' '}
              to learn.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <div className="sm:col-span-2">
                <Button
                  size="default"
                  className="group w-full"
                  onClick={() => window.open(EXTERNAL_LINKS.devfolio, '_blank')}
                >
                  Apply with Devfolio
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </div>

              <Button
                variant="outline"
                size="default"
                className="w-full"
                onClick={() => window.open(EXTERNAL_LINKS.githubOrg, '_blank')}
              >
                View Projects
              </Button>

              <DownloadBrochureButton
                variant="outline"
                size="default"
                className="w-full"
              />
            </div>

            

            <motion.div
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { label: 'Projects', value: '20+' },
                { label: 'Contributors', value: '500+' },
                { label: 'PRs Merged', value: '1000+' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-[#9B87FE]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: yImg }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <Image
                src={IMAGE_PATHS.mainImage}
                alt="Open Source Illustration"
                width={600}
                height={500}
                className="w-full h-auto drop-shadow-2xl relative z-10"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#9B87FE]/30 to-transparent blur-3xl -z-10" />
            </motion.div>

            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-[#9B87FE]/40 blur-sm"
                style={{
                  top: `${20 + i * 30}%`,
                  right: `${10 + i * 15}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
