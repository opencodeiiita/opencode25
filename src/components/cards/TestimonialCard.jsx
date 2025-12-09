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
      className="group relative h-full rounded-2xl border border-white/5 bg-white/5 px-8 py-10 backdrop-blur-md"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(155, 135, 254, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 rounded-full overflow-hidden border border-[#893193]">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h6 className="text-lg font-bold text-white">{testimonial.name}</h6>
            <p className="text-sm text-[#9b87fe]">{testimonial.role}</p>
          </div>
        </div>
        <div className="relative flex-1">
          <Quote className="absolute -left-2 -top-3 h-8 w-8 text-[#9b87fe]/20 rotate-180" />
          <p className="relative z-10 text-gray-200 italic leading-relaxed pl-4 border-l border-[#893193]/50">
            "{testimonial.quote}"
          </p>
        </div>
        {testimonial.blogUrl && (
          <a
            href={testimonial.blogUrl}
            target="_blank"
            className="flex items-center gap-2 text-sm text-[#9b87fe] hover:text-white transition-colors"
          >
            Read story <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
