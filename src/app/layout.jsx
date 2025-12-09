import SmoothScroll from '@/components/layout/SmoothScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScrollSpaceship from '@/components/ui/ScrollSpaceship'; // Import it
import { SITE_CONFIG } from '@/lib/constants';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800', '900'],
  variable: '--font-poppins',
});

export const metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  keywords: 'open source, programming, hackathon, student competition, coding',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} font-poppins antialiased bg-[#0B1843] text-white overflow-x-hidden selection:bg-[#9b87fe] selection:text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollSpaceship />
        <ScrollProgress />
      </body>
    </html>
  );
}
