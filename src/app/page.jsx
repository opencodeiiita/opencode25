import ActiveBackground from '@/components/layout/ActiveBackground';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import HowItWorks from '@/components/sections/HowItWorks';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SponsorsSection from '@/components/sections/SponsorsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden text-white">
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
