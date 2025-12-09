'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ActiveBackground() {
  const canvasRef = useRef(null);

  // 1. Canvas Logic for Stars (High Performance)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let shootingStars = [];

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize random stars
    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 4000); // Density
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.2 + 0.1,
        });
      }
    };

    // Shooting Star Class
    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.size = Math.random() * 1 + 0.1;
        this.waitTime = new Date().getTime() + Math.random() * 3000 + 500; // Random delay
        this.active = false;
      }
      update() {
        if (this.active) {
          this.x -= this.speed;
          this.y += this.speed;
          if (this.x < 0 || this.y >= canvas.height) {
            this.active = false;
            this.waitTime = new Date().getTime() + Math.random() * 5000 + 1000; // Wait before next shot
          }
        } else {
          if (this.waitTime < new Date().getTime()) {
            this.active = true;
            this.x = Math.random() * canvas.width + 200; // Start slightly offscreen right
            this.y = -50;
          }
        }
      }
      draw() {
        if (!this.active) return;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3})`;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.len, this.y - this.len);
        ctx.stroke();
      }
    }

    // Initialize shooting stars
    for (let i = 0; i < 3; i++) {
      // 3 simultaneous shooting stars max
      shootingStars.push(new ShootingStar());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Static Stars
      stars.forEach((star) => {
        star.y -= star.speed; // Move up slowly
        if (star.y < 0) star.y = canvas.height; // Loop

        ctx.fillStyle = `rgba(255, 255, 255, ${
          Math.abs(Math.sin(new Date().getTime() * 0.001 + star.x)) * 0.5 + 0.2
        })`; // Twinkle
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Shooting Stars
      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0B1843] pointer-events-none">
      {/* 2. Moving Gradients (The Aurora) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#9b87fe] rounded-full blur-[150px] opacity-30"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#893193] rounded-full blur-[180px] opacity-20"
      />

      {/* 3. The Star Canvas Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 4. Subtle Noise Texture (Optional: Adds 'film' quality) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
}
