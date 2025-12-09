'use client';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { IMAGE_PATHS, SOCIAL_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative bg-[#0B1843] border-t border-white/10 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Image
              src={IMAGE_PATHS.logo}
              alt="GeekHaven Logo"
              width={70}
              height={70}
            />
            <div>
              <Image
                src={IMAGE_PATHS.logoText}
                alt="OpenCode 25"
                width={150}
                height={50}
                className="mb-2"
              />
              <p className="text-gray-400 text-sm">Code of Conduct</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <p className="text-white font-semibold text-lg mb-4">
              Follow Us On
            </p>
            <div className="flex gap-6 justify-center md:justify-end">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#9B87FE] transition-colors"
              >
                <Twitter size={28} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#9B87FE] transition-colors"
              >
                <Facebook size={28} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#9B87FE] transition-colors"
              >
                <Instagram size={28} />
              </a>
              <a
                href="mailto:geekhaven@iiita.ac.in"
                className="text-white hover:text-[#9B87FE] transition-colors"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400">
            © Copyright{' '}
            <span className="font-semibold text-white">• Team GeekHaven</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
