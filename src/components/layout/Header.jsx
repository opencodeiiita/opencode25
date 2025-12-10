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
import { useCallback, useState } from 'react';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

export default function Header() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useStore();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 180) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const scrollToSection = useCallback(
    (id) => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        closeMobileMenu();
      }
    },
    [closeMobileMenu]
  );

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-40 flex h-20 items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B1843]/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-[#9B87FE]/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between w-full">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Image
                src={IMAGE_PATHS.logoRb}
                alt="OpenCode Logo"
                width={55}
                height={55}
                className="object-contain transition-transform group-hover:rotate-12"
                priority
              />
              <div className="absolute inset-0 bg-[#9B87FE] blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
            </div>
            <Image
              src={IMAGE_PATHS.logoText}
              alt="OpenCode 25"
              width={140}
              height={40}
              className="hidden sm:block object-contain"
            />
          </motion.div>

          <Navbar onNavigate={scrollToSection} />

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="md:hidden rounded-full bg-white/5 p-2.5 text-white hover:bg-white/10 transition-colors border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9B87FE]"
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
