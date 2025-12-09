'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-[#9B87FE] transition-all duration-300 hover:scale-105"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xl font-semibold text-white group-hover:text-[#9B87FE] transition-colors">
            {project.title}
          </h4>
          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#9B87FE] transition-colors" />
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        {project.tags && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-[#9B87FE]/20 text-[#9B87FE] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.a>
  );
}
