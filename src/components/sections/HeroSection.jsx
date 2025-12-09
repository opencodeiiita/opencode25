'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { EXTERNAL_LINKS, IMAGE_PATHS } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="shadow"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Your journey into <br />
              <span className="text-gradient">open source starts here</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              A month-long program starting in December for students to start
              their journey in the world of open source. The Only requirement
              being an enthusiastic heart to learn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.open(EXTERNAL_LINKS.unstop, '_blank')}
              >
                Join Unstop
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open(EXTERNAL_LINKS.githubOrg, '_blank')}
              >
                Go To Projects
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Image
              src={IMAGE_PATHS.mainImage}
              alt="OpenCode Illustration"
              width={486}
              height={408}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
