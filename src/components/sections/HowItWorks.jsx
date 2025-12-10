'use client';
import BlurText from '@/components/ui/BlurText';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Code, GitPullRequest, Search, Trophy } from 'lucide-react';

const icons = [Search, Code, GitPullRequest, Trophy];

const ProcessCard = ({ step, index }) => {
  const Icon = icons[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative h-full bg-gradient-to-br from-[#0B1843]/80 to-[#1a2654]/60 backdrop-blur-xl rounded-2xl border border-[#9B87FE]/10 p-8 transition-all duration-500 hover:border-[#9B87FE]/40 hover:shadow-2xl hover:shadow-[#9B87FE]/20 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9B87FE]/0 via-[#9B87FE]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Step number watermark */}
      <div className="absolute -top-4 -right-4 text-[140px] font-black text-white/3 group-hover:text-[#9B87FE]/10 transition-colors leading-none">
        {step.number}
      </div>

      <div className="relative z-10 flex flex-col h-full items-center text-center">
        {/* Icon */}
        <motion.div
          className="mb-6 p-5 bg-gradient-to-br from-[#9B87FE]/20 to-[#893193]/20 rounded-2xl shadow-lg shadow-[#9B87FE]/20 group-hover:shadow-[#9B87FE]/40 transition-shadow"
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-[#9B87FE]" />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#9B87FE] transition-colors">
          {step.title}
        </h3>

        <div className="w-16 h-1 bg-gradient-to-r from-[#893193] to-[#9B87FE] mx-auto mb-6 rounded-full group-hover:w-24 transition-all" />

        <p className="text-gray-300 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 scroll-mt-20 overflow-visible"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#9B87FE]/30 bg-[#9B87FE]/10 backdrop-blur-md"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-[#9B87FE] tracking-wide uppercase">
              The Process
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-[#9B87FE]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How OpenCode Works
          </motion.h2>

          <BlurText
            text="Join our open-source events and contribute to meaningful projects while building your skills and network"
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            delay={50}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
