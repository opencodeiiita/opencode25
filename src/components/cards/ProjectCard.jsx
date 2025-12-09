// 'use client';
// import {
//   motion,
//   useMotionTemplate,
//   useMotionValue,
//   useSpring,
// } from 'framer-motion';
// import { ArrowUpRight } from 'lucide-react';
// import Image from 'next/image';
// import { useRef } from 'react';

// export default function ProjectCard({ project, index }) {
//   const ref = useRef(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
//   const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
//   const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

//   const handleMouseMove = (e) => {
//     if (!ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     const mouseX = (e.clientX - rect.left) * 20;
//     const mouseY = (e.clientY - rect.top) * 20;
//     const rX = (mouseY / rect.height - 10) * -1;
//     const rY = mouseX / rect.width - 10;
//     x.set(rX);
//     y.set(rY);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       viewport={{ once: true }}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={() => {
//         x.set(0);
//         y.set(0);
//       }}
//       style={{ transformStyle: 'preserve-3d', transform }}
//       className="relative h-full rounded-xl bg-white/5 border border-white/10 p-1 backdrop-blur-sm group"
//     >
//       <div
//         style={{ transform: 'translateZ(50px)' }}
//         className="absolute inset-4 -z-10 bg-[#893193]/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
//       />
//       <div className="relative h-full flex flex-col overflow-hidden rounded-lg bg-[#0B1843] shadow-xl">
//         <div className="relative h-52 w-full overflow-hidden">
//           <Image
//             src={project.image}
//             alt={project.title}
//             fill
//             className="object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         </div>
//         <div
//           className="p-6 flex flex-col flex-1"
//           style={{ transform: 'translateZ(20px)' }}
//         >
//           <div className="flex justify-between items-start mb-4">
//             <h4 className="text-xl font-bold text-white group-hover:text-[#9b87fe] transition-colors">
//               {project.title}
//             </h4>
//             <a
//               href={project.url}
//               target="_blank"
//               className="bg-white/5 p-2 rounded-full text-white hover:bg-[#9b87fe] transition-colors"
//             >
//               <ArrowUpRight size={20} />
//             </a>
//           </div>
//           <p className="text-sm text-gray-300 mb-4 flex-1">
//             {project.description}
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {project.tags?.map((tag, i) => (
//               <span
//                 key={i}
//                 className="text-xs bg-white/5 text-[#9b87fe] px-2 py-1 rounded"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
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

  // Physics settings - Strong & Bouncy
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleInteract = (clientX, clientY) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    // Calculate tilt based on cursor/finger position relative to center
    const width = rect.width;
    const height = rect.height;

    const mouseX = (clientX - rect.left) * 20; // Rotation intensity
    const mouseY = (clientY - rect.top) * 20;

    const rX = (mouseY / height - 10) * -1;
    const rY = mouseX / width - 10;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseMove = (e) => handleInteract(e.clientX, e.clientY);

  // Mobile Touch Support for 3D Tilt
  const handleTouchMove = (e) => {
    // Prevent scrolling while tilting explicitly if you want "pure" tilt
    // e.preventDefault();
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      // Interaction Handlers
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove} // Active on mobile
      onMouseLeave={handleReset}
      onTouchEnd={handleReset}
      style={{
        transformStyle: 'preserve-3d',
        transform,
        willChange: 'transform', // Critical for mobile performance
      }}
      className="relative h-full rounded-xl bg-white/5 border border-white/10 p-1 backdrop-blur-sm group select-none"
    >
      {/* 3D Depth Glow */}
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="absolute inset-4 -z-10 bg-[#893193]/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div className="relative h-full flex flex-col overflow-hidden rounded-lg bg-[#0B1843] shadow-2xl">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1843] to-transparent opacity-80" />
        </div>

        <div
          className="p-6 flex flex-col flex-1"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-xl font-bold text-white group-hover:text-[#9b87fe] transition-colors">
              {project.title}
            </h4>
            <a
              href={project.url}
              target="_blank"
              className="bg-white/5 p-2 rounded-full text-white hover:bg-[#9b87fe] transition-colors shadow-lg shadow-purple-500/20"
            >
              <ArrowUpRight size={20} />
            </a>
          </div>

          <p className="text-sm text-gray-300 mb-4 flex-1 font-light leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-white/5 text-[#9b87fe] border border-[#9b87fe]/20 px-2.5 py-1 rounded-md"
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
