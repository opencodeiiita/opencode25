'use client';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleInteract = (clientX, clientY) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (clientX - rect.left) * 20;
    const mouseY = (clientY - rect.top) * 20;

    const rX = (mouseY / height - 10) * -1;
    const rY = mouseX / width - 10;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseMove = (e) => handleInteract(e.clientX, e.clientY);

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleInteract(touch.clientX, touch.clientY);
  };

  const handleReset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleReset}
      onTouchEnd={handleReset}
      style={{
        transformStyle: 'preserve-3d',
        transform,
        willChange: 'transform',
      }}
      className="relative h-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-1 backdrop-blur-sm group select-none"
    >
      {/* 3D Depth Glow */}
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="absolute inset-4 -z-10 bg-gradient-to-br from-[#893193]/40 to-[#9B87FE]/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative h-full flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0B1843] to-[#1a2654] shadow-2xl">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1843] via-[#0B1843]/50 to-transparent" />
        </div>

        {/* Content */}
        <div
          className="p-6 flex flex-col flex-1"
          style={{ transform: 'translateZ(25px)' }}
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-xl font-bold text-white group-hover:text-[#9B87FE] transition-colors pr-2">
              {project.title}
            </h4>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-white/5 p-2.5 rounded-full text-white hover:bg-[#9B87FE] hover:text-black transition-all shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={18} />
            </a>
          </div>

          <p className="text-sm text-gray-300 mb-4 flex-1 font-light leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-[#9B87FE]/10 text-[#9B87FE] border border-[#9B87FE]/20 px-3 py-1 rounded-full hover:bg-[#9B87FE]/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
