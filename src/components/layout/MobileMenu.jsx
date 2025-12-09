'use client';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function MobileMenu({ onClose, onNavigate }) {
  const navItems = ['How It Works', 'Projects', 'Testimonials', 'Sponsors'];
  const ids = ['how-it-works', 'projects', 'testimonials', 'sponsors'];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="relative h-full w-[80%] max-w-sm border-l border-white/10 bg-[#0B1843]/95 p-6 backdrop-blur-xl"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white">
          <X size={24} />
        </button>
        <div className="mt-20 flex flex-col gap-4">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => onNavigate(ids[i])}
              className="text-left text-lg font-medium text-white hover:text-[#9b87fe]"
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
