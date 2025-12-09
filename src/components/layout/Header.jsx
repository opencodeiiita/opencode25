'use client';
import { IMAGE_PATHS } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useStore();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
    setScrolled(latest > 50);
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35 }}
        className={`fixed top-0 left-0 right-0 z-40 flex h-20 items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B1843]/80 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between w-full">
          <div
            className="flex items-center gap-4 cursor-pointer group shrink-0"
            onClick={() => scrollToSection('hero')}
          >
            <Image
              src={IMAGE_PATHS.logoRb}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <Image
              src={IMAGE_PATHS.logoText}
              alt="Text"
              width={140}
              height={40}
              className="hidden sm:block"
            />
          </div>

          <Navbar onNavigate={scrollToSection} />

          <button
            onClick={toggleMobileMenu}
            className="md:hidden rounded-full bg-white/5 p-2 text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={closeMobileMenu} onNavigate={scrollToSection} />
        )}
      </AnimatePresence>
    </>
  );
}
