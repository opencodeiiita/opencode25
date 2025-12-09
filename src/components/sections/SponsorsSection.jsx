'use client';
import { sponsors } from '@/data/sponsors';
import { motion } from 'framer-motion';
import Image from 'next/image';

const MARQUEE = [...sponsors, ...sponsors, ...sponsors];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative py-24 bg-transparent overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-16">
        Backed by the Best
      </h2>
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 30 }}
        >
          {MARQUEE.map((sponsor, i) => (
            <div
              key={i}
              className="w-48 flex justify-center opacity-50 hover:opacity-100 transition-opacity"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={150}
                height={sponsor.height}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
