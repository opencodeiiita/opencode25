'use client';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';

const navItems = [
  { name: 'How It Works', id: 'how-it-works' },
  { name: 'Projects', id: 'projects' },
  { name: 'Testimonials', id: 'testimonials' },
  { name: 'Sponsors', id: 'sponsors' },
];

const Navbar = memo(({ onNavigate, scrolled }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`hidden md:flex items-center gap-1 backdrop-blur-xl px-2 py-2 rounded-full border shadow-lg transition-all duration-300 ${
        scrolled
          ? 'bg-white/10 border-white/20 shadow-[#9B87FE]/20'
          : 'bg-white/5 border-white/10 shadow-[#9B87FE]/10'
      }`}
    >
      {navItems.map((item, index) => (
        <button
          key={item.name}
          onClick={() => onNavigate(item.id)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative rounded-full px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1843]"
        >
          {hoveredIndex === index && (
            <motion.div
              layoutId="navbar-hover"
              className="absolute inset-0 z-[-1] rounded-full bg-gradient-to-r from-[#9B87FE] to-[#8A76ED] shadow-lg shadow-[#9B87FE]/50"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </button>
      ))}
    </motion.nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
