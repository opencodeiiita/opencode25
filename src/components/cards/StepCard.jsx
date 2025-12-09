'use client';
import { motion } from 'framer-motion';

export default function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center max-w-xs mx-auto"
    >
      <h1 className="text-6xl font-bold mb-4" style={{ color: step.color }}>
        {step.number}
      </h1>
      <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
      <div className="w-11 h-0.5 bg-[#893193] mx-auto mb-6"></div>
      <p className="text-gray-300 leading-relaxed">{step.description}</p>
    </motion.div>
  );
}
