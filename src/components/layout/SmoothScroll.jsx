'use client';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        // Primary feel
        lerp: 0.16, // Higher → more responsive
        duration: 0.9, // Lower → less float, more snap

        smoothWheel: true,
        smoothTouch: true,

        // Input feel tuning
        wheelMultiplier: 1.1, // More responsive
        touchMultiplier: 1.0, // Balanced for mobile

        // Stability
        syncTouch: false,
        normalizeWheel: true,
        clampWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
