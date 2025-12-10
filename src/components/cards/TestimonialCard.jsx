'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialCard({ testimonial }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative h-full rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent px-8 py-10 backdrop-blur-xl overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(155, 135, 254, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative flex h-full flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#9B87FE] shadow-lg shadow-[#9B87FE]/30">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h6 className="text-xl font-bold text-white group-hover:text-[#9B87FE] transition-colors">
              {testimonial.name}
            </h6>
            <p className="text-sm text-[#9B87FE] font-medium">
              {testimonial.role}
            </p>
            <p className="text-xs text-gray-400">{testimonial.company}</p>
          </div>
        </div>

        {/* Quote */}
        <div className="relative flex-1">
          <Quote className="absolute -left-2 -top-3 h-10 w-10 text-[#9B87FE]/20 rotate-180" />
          <p className="relative z-10 text-gray-200 leading-relaxed pl-6 border-l-2 border-[#893193]/50 italic">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Blog Link */}
        {testimonial.blogUrl && (
          <a
            href={testimonial.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9B87FE] hover:text-white transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE] rounded px-2 py-1"
          >
            Read full story
            <ExternalLink
              size={14}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </a>
        )}
      </div>
    </div>
  );
}
