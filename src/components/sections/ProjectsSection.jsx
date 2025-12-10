'use client';
import ProjectCard from '@/components/cards/ProjectCard';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProjectsSection() {
  const [visibleCount, setVisibleCount] = useState(9);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, projects.length));
  };

  return (
    <section id="projects" className="relative py-32 scroll-mt-20">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Past <span className="text-[#9B87FE]">Projects</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the innovative projects built by our community
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.slice(0, visibleCount).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < projects.length && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={loadMore}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#9B87FE] hover:border-[#9B87FE] transition-all font-medium shadow-lg hover:shadow-[#9B87FE]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
            >
              Load More Projects ({projects.length - visibleCount} remaining)
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
