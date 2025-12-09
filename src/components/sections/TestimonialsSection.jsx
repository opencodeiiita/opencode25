'use client';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent(
      (prev) =>
        (prev + newDirection + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      className="relative py-32 bg-transparent overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-20">
          Community Stories
        </h2>
        <div className="max-w-4xl mx-auto relative px-12">
          <div className="relative h-[400px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <TestimonialCard testimonial={testimonials[current]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 text-white hover:bg-[#9b87fe]"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 text-white hover:bg-[#9b87fe]"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
