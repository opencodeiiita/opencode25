'use client';
import StepCard from '@/components/cards/StepCard';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 bg-transparent">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white">
            How It Works
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
