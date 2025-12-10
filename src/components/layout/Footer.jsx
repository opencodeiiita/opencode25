'use client';
import DownloadBrochureButton from '@/components/ui/DownloadBrochureButton';
import { IMAGE_PATHS, SOCIAL_LINKS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowUp, Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';

const SocialIcon = ({ href, Icon, delay, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    initial={{ opacity: 0, scale: 0, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, type: 'spring', stiffness: 260, damping: 20 }}
    viewport={{ once: true }}
    whileHover={{
      y: -8,
      backgroundColor: '#9B87FE',
      boxShadow: '0 10px 30px rgba(155, 135, 254, 0.4)',
    }}
    whileTap={{ scale: 0.9 }}
    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white transition-all hover:border-[#9B87FE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
  >
    <Icon size={20} />
  </motion.a>
);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/10 pt-20 pb-10 overflow-hidden bg-gradient-to-b from-transparent to-[#0B1843]/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#9B87FE]/50 to-transparent" />

      <div className="container-custom relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:items-end mb-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <Image
                src={IMAGE_PATHS.logo}
                alt="OpenCode Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <Image
                src={IMAGE_PATHS.logoText}
                alt="OpenCode 25"
                width={140}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <p className="text-base text-gray-300 font-medium">
                Open Source. Open Minds.
              </p>
              <p className="text-sm text-gray-500">
                Empowering students through collaborative coding
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <DownloadBrochureButton variant="outline" size="default" />
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-6 md:items-end">
            <motion.p
              className="text-sm font-semibold text-gray-400 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Connect With Us
            </motion.p>
            <div className="flex gap-4">
              <SocialIcon
                href={SOCIAL_LINKS.twitter}
                Icon={Twitter}
                delay={0.1}
                label="Twitter"
              />
              <SocialIcon
                href={SOCIAL_LINKS.facebook}
                Icon={Facebook}
                delay={0.2}
                label="Facebook"
              />
              <SocialIcon
                href={SOCIAL_LINKS.instagram}
                Icon={Instagram}
                delay={0.3}
                label="Instagram"
              />
              <SocialIcon
                href="mailto:geekhaven@iiita.ac.in"
                Icon={Mail}
                delay={0.4}
                label="Email"
              />
            </div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#9B87FE] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE] rounded-lg px-2 py-1"
            >
              Back to top
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </motion.button>
          </div>
        </div>

        <motion.div
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>
            © 2025 <span className="text-white font-semibold">OpenCode</span> •
            Built with <span className="text-[#9B87FE]">♥</span> by Team
            GeekHaven
          </p>
          <p className="text-gray-600">All rights reserved</p>
        </motion.div>
      </div>
    </footer>
  );
}
