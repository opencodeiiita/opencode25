'use client';
import { motion } from 'framer-motion';

export default function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative flex flex-col items-center text-center p-6"
    >
      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[120px] font-black leading-none text-white/5 transition-transform group-hover:scale-110">
        {step.number}
      </span>
      <div className="relative mb-6 mt-10 h-16 w-16 flex items-center justify-center rounded-2xl bg-[#0B1843] border border-[#9b87fe]/30 shadow-[0_0_20px_rgba(155,135,254,0.2)] group-hover:border-[#9b87fe] transition-colors">
        <span className="text-2xl font-bold text-[#9b87fe] group-hover:text-white">
          {step.number}
        </span>
      </div>
      <div className="relative z-10">
        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#9b87fe] transition-colors">
          {step.title}
        </h3>
        <div className="w-12 h-1 bg-[#893193] mx-auto mb-4 rounded-full group-hover:w-24 transition-all" />
        <p className="text-sm text-gray-300">{step.description}</p>
      </div>
    </motion.div>
  );
}
