'use client';
import BlurText from '@/components/ui/BlurText';
import { motion } from 'framer-motion';

const howItWorksContent = [
  {
    title: 'Event Registration',
    description:
      'Start your journey by registering for OpenCode events. Choose from hackathons, workshops, and coding challenges.',
    icon: (
      <svg
        className="w-8 h-8 text-[#9b87fe]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
      </svg>
    ),
  },
  {
    title: 'Project Selection',
    description:
      'Browse curated open-source projects. Select repositories that match your skill set or propose innovative ideas.',
    icon: (
      <svg
        className="w-8 h-8 text-[#9b87fe]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M16,4C18.2,4 20,5.8 20,8C20,10.2 18.2,12 16,12C13.8,12 12,10.2 12,8C12,5.8 13.8,4 16,4M16,14C20.4,14 24,15.8 24,18V20H8V18C8,15.8 11.6,14 16,14M8,4C10.2,4 12,5.8 12,8C12,10.2 10.2,12 8,12C5.8,12 4,10.2 4,8C4,5.8 5.8,4 8,4M8,14C12.4,14 16,15.8 16,18V20H0V18C0,15.8 3.6,14 8,14Z" />
      </svg>
    ),
  },
  {
    title: 'Collaborative Dev',
    description:
      'Code alongside developers globally. Our platform facilitates team formation and real-time communication.',
    icon: (
      <svg
        className="w-8 h-8 text-[#9b87fe]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5M12,7.75C13.24,7.75 14.25,8.76 14.25,10C14.25,11.24 13.24,12.25 12,12.25C10.76,12.25 9.75,11.24 9.75,10C9.75,8.76 10.76,7.75 12,7.75M12,15C13.93,15 15.5,15.57 16.6,16.3C16.24,16.76 15.8,17.15 15.3,17.5C14.5,16.5 13.33,16 12,16C10.67,16 9.5,16.5 8.7,17.5C8.2,17.15 7.76,16.76 7.4,16.3C8.5,15.57 10.07,15 12,15Z" />
      </svg>
    ),
  },
  {
    title: 'Recognition',
    description:
      'Celebrate achievements. Top contributors receive recognition, networking opportunities, and career growth.',
    icon: (
      <svg
        className="w-8 h-8 text-[#9b87fe]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M5,16L3,5L8.5,10L12,4L15.5,10L21,5L19,16H5M12,18A2,2 0 0,1 14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20A2,2 0 0,1 12,18Z" />
      </svg>
    ),
  },
];

const ProcessCard = ({ title, description, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered scroll animation
    className="group relative h-full bg-[#0B1843]/60 backdrop-blur-xl rounded-2xl border border-[#9b87fe]/20 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-[#9b87fe]/10 hover:border-[#9b87fe]/50"
  >
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#9b87fe]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full items-center text-center">
      {/* Icon Container */}
      <div className="mb-6 p-4 bg-[#9b87fe]/10 rounded-2xl shadow-[0_0_20px_rgba(155,135,254,0.15)] group-hover:shadow-[0_0_30px_rgba(155,135,254,0.4)] transition-shadow duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#9b87fe] transition-colors">
        {title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

      {/* Step Number Background Watermark (Optional) */}
      <div className="absolute -top-4 -right-4 text-[100px] font-black text-white/5 select-none pointer-events-none group-hover:text-[#9b87fe]/5 transition-colors">
        {index + 1}
      </div>
    </div>
  </motion.div>
);

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32 scroll-mt-28 md:scroll-mt-32 overflow-visible bg-transparent"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-[#9b87fe]/30 bg-[#9b87fe]/10 backdrop-blur-md">
            <span className="text-sm font-semibold text-[#9b87fe] tracking-wide uppercase">
              The Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-purple-200 to-[#9b87fe]">
            How OpenCode Works
          </h2>
          <BlurText
            text="Join our open-source events and contribute to meaningful projects while building your skills and network"
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            delay={40}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {howItWorksContent.map((item, index) => (
            <ProcessCard
              key={index}
              index={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
