'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const menuVariants = {
  closed: { x: '100%' },
  open: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const itemVariants = {
  closed: { x: 50, opacity: 0 },
  open: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  }),
};

export default function MobileMenu({ onClose, onNavigate }) {
  const navItems = ['How It Works', 'Projects', 'Testimonials', 'Sponsors'];
  const ids = ['how-it-works', 'projects', 'testimonials', 'sponsors'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        variants={menuVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="relative h-full w-[85%] max-w-sm border-l border-white/10 bg-gradient-to-br from-[#0B1843]/98 to-[#1a2654]/98 backdrop-blur-2xl p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-8 right-8 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
        >
          <X size={24} />
        </button>

        <div className="mt-24 flex flex-col gap-2">
          {navItems.map((item, i) => (
            <motion.button
              key={item}
              custom={i}
              variants={itemVariants}
              onClick={() => onNavigate(ids[i])}
              className="group relative text-left text-xl font-semibold text-white/80 hover:text-white py-4 px-6 rounded-xl overflow-hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#9B87FE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
                whileHover={{ scale: 1.05 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#9B87FE] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                {item}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Decorative gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#9B87FE]/20 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
}
