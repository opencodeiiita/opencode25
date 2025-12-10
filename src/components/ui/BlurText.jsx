'use client';
import { motion } from 'framer-motion';
import { memo } from 'react';

const BlurText = memo(({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');

  return (
    <div
      className={`flex flex-wrap justify-center gap-x-2 gap-y-1 ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{ filter: 'blur(12px)', opacity: 0, y: 8 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: idx * 0.03 + delay * 0.001,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          viewport={{ once: true, margin: '-50px' }}
          className="inline-block will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
});

BlurText.displayName = 'BlurText';
export default BlurText;
