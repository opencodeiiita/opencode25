'use client';
import { motion } from 'framer-motion';

export default function BlurText({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap justify-center gap-x-1.5 ${className}`}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: idx * 0.05 + delay * 0.001,
            ease: 'easeOut',
          }}
          viewport={{ once: true }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
