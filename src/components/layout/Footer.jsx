'use client';
import { IMAGE_PATHS, SOCIAL_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowUp, Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';

const SocialIcon = ({ href, Icon, delay }) => (
  <motion.a
    href={href}
    target="_blank"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    whileHover={{ y: -5, backgroundColor: '#9b87fe' }}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-colors"
  >
    <Icon size={18} />
  </motion.a>
);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 overflow-hidden bg-transparent">
      <div className="container-custom relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:items-end">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src={IMAGE_PATHS.logo} alt="Logo" width={50} height={50} />
              <Image
                src={IMAGE_PATHS.logoText}
                alt="Text"
                width={120}
                height={35}
              />
            </div>
            <p className="text-xs text-gray-400">Open Source. Open Minds.</p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex gap-3">
              <SocialIcon
                href={SOCIAL_LINKS.twitter}
                Icon={Twitter}
                delay={0.1}
              />
              <SocialIcon
                href={SOCIAL_LINKS.facebook}
                Icon={Facebook}
                delay={0.2}
              />
              <SocialIcon
                href={SOCIAL_LINKS.instagram}
                Icon={Instagram}
                delay={0.3}
              />
              <SocialIcon
                href="mailto:geekhaven@iiita.ac.in"
                Icon={Mail}
                delay={0.4}
              />
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
