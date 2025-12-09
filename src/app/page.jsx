'use client'; // This must be a client component now to manage state
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import ActiveBackground from '@/components/layout/ActiveBackground';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SplashScreen from '@/components/layout/SplashScreen'; // Import new component
import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Optional: Prevent scrolling while splash is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      // Scroll to top to ensure we start fresh when curtain lifts
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen relative overflow-x-hidden text-white">
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ActiveBackground />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <HowItWorks />
          <ProjectsSection />
          <TestimonialsSection />
          <SponsorsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
