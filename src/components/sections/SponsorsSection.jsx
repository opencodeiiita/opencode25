'use client';
import { sponsors } from '@/data/sponsors';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Past Sponsors</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={150}
                    height={sponsor.height}
                    className={sponsor.invert ? 'invert' : ''}
                    style={{ height: `${sponsor.height}px`, width: 'auto' }}
                  />
                </a>
              ) : (
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={150}
                  height={sponsor.height}
                  className={sponsor.invert ? 'invert' : ''}
                  style={{ height: `${sponsor.height}px`, width: 'auto' }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
