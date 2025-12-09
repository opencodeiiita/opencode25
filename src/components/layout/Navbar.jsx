'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'How It Works', id: 'how-it-works' },
  { name: 'Projects', id: 'projects' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'Sponsors', id: 'sponsors' },
];

export default function Navbar({ onNavigate }) {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/10 shadow-lg">
      {navItems.map((item, index) => (
        <button
          key={item.name}
          onClick={() => onNavigate(item.id)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:text-white z-10"
        >
          {hoveredIndex === index && (
            <motion.div
              layoutId="navbar-hover"
              className="absolute inset-0 z-[-1] rounded-full bg-[#9b87fe]"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </button>
      ))}
    </nav>
  );
}
