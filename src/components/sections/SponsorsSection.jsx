'use client';
import { sponsors } from '@/data/sponsors';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Split sponsors into 2 rows and duplicate for seamless scrolling
const halfLength = Math.ceil(sponsors.length / 2);
const row1Sponsors = sponsors.slice(0, halfLength);
const row2Sponsors = sponsors.slice(halfLength);

const row1 = [...row1Sponsors, ...row1Sponsors, ...row1Sponsors];
const row2 = [...row2Sponsors, ...row2Sponsors, ...row2Sponsors];

const MarqueeRow = ({ items, direction = 'left', speed = 40 }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex gap-12 items-center whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {items.map((sponsor, i) => {
          const CardContent = (
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10 min-w-[180px] max-w-[280px] h-28 flex items-center justify-center group">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={200}
                height={sponsor.height || 60}
                className="object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 transition-opacity w-auto h-auto max-w-full max-h-full"
              />
            </div>
          );

          return (
            <div
              key={i}
              className="flex-shrink-0 flex justify-center items-center"
            >
              {sponsor.link ? (
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {CardContent}
                </a>
              ) : (
                CardContent
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative py-24 bg-transparent overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-center text-white mb-4"
        >
          Backed by the Best
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400 mb-16 text-lg"
        >
          Trusted by industry leaders worldwide
        </motion.p>

        <div className="space-y-10">
          {/* Row 1 - Left to Right */}
          <MarqueeRow items={row1} direction="left" speed={35} />

          {/* Row 2 - Right to Left */}
          <MarqueeRow items={row2} direction="right" speed={38} />
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
