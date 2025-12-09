'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { IMAGE_PATHS } from '@/lib/constants';
import { useStore } from '@/store/useStore';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1843]/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={IMAGE_PATHS.logoRb}
              alt="OpenCode Logo"
              width={70}
              height={70}
              className="cursor-pointer"
              onClick={() => scrollToSection('hero')}
            />
            <Image
              src={IMAGE_PATHS.logoText}
              alt="OpenCode 25"
              width={150}
              height={50}
              className="hidden sm:block"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {['How It Works', 'Projects', 'Testimonials', 'Sponsors'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))
                  }
                  className="text-white hover:text-[#9B87FE] transition-colors font-medium"
                >
                  {item}
                </button>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {['How It Works', 'Projects', 'Testimonials', 'Sponsors'].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))
                  }
                  className="text-white hover:text-[#9B87FE] transition-colors font-medium text-left"
                >
                  {item}
                </button>
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
