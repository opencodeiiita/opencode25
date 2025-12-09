'use client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ActiveBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const resizeTimeout = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let dpr = Math.max(1, window.devicePixelRatio || 1);

    // Config
    const CONFIG = {
      STAR_DENSITY: 1 / 4500,
      NUM_NEBULA_LAYERS: 3,
      MAX_SHOOTING: 4,
      PLANETS: [
        { r: 120, x: 0.15, y: 0.7, speed: 0.02, color: '#9b6bff' },
        { r: 70, x: 0.8, y: 0.25, speed: -0.015, color: '#ff9fb8' },
      ],
    };

    // Pools
    let stars = [];
    let shootingStars = [];
    let nebulaLayers = [];

    // Offscreen star sprite for fast draw
    const starSprite = document.createElement('canvas');
    const spriteSize = 12 * dpr;
    starSprite.width = spriteSize;
    starSprite.height = spriteSize;
    const sctx = starSprite.getContext('2d');

    const makeStarSprite = () => {
      sctx.clearRect(0, 0, starSprite.width, starSprite.height);
      const g = sctx.createRadialGradient(
        spriteSize / 2,
        spriteSize / 2,
        0,
        spriteSize / 2,
        spriteSize / 2,
        spriteSize / 2
      );
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      g.addColorStop(0.5, 'rgba(200,200,255,0.25)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = g;
      sctx.beginPath();
      sctx.arc(spriteSize / 2, spriteSize / 2, spriteSize / 2, 0, Math.PI * 2);
      sctx.fill();
    };

    const rand = (a, b) => Math.random() * (b - a) + a;

    const init = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1);
      width = Math.floor(window.innerWidth);
      height = Math.floor(window.innerHeight);

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      makeStarSprite();

      const targetStars = Math.floor(width * height * CONFIG.STAR_DENSITY);
      stars = new Array(targetStars).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: rand(0.3, 1.8),
        speed: rand(0.02, 0.5),
        twinkle: Math.random() * Math.PI * 2,
        layer:
          Math.random() > 0.85 ? 'near' : Math.random() > 0.6 ? 'mid' : 'far',
        opacity: rand(0.4, 1),
      }));

      shootingStars = new Array(CONFIG.MAX_SHOOTING).fill(0).map(() => ({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        length: 0,
        speed: 0,
        createdAt: 0,
        waitUntil: Date.now() + rand(500, 4000),
      }));

      // MINIMAL glowing fog nebula blobs
      nebulaLayers = new Array(CONFIG.NUM_NEBULA_LAYERS).fill(0).map(() => ({
        cx: width * rand(0.1, 0.9),
        cy: height * rand(0.1, 0.9),
        r: rand(width * 0.2, width * 0.45),
        hue: rand(190, 280),
        alpha: rand(0.04, 0.08),
        drift: rand(0.0003, 0.0008),
      }));
    };

    // Minimal soft fog nebula
    const drawNebula = (layer, t) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const { cx, cy, r, hue, alpha, drift } = layer;

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `hsla(${hue}, 80%, 70%, ${alpha})`);
      g.addColorStop(1, `hsla(${hue}, 80%, 40%, 0)`);

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Smooth drifting motion
      layer.cx += Math.sin(t * drift) * 0.2;
      layer.cy += Math.cos(t * drift) * 0.2;

      ctx.restore();
    };

    const trySpawnShootingStar = (s) => {
      if (s.active) return;
      if (Date.now() > s.waitUntil && Math.random() < 0.02) {
        s.active = true;
        s.x = rand(width * 0.2, width * 1.1);
        s.y = rand(-50, height * 0.3);
        const angle = rand(0.25, 0.7);
        const speed = rand(8, 18);
        s.vx = -Math.cos(angle) * speed;
        s.vy = Math.sin(angle) * speed;
        s.length = rand(60, 220);
        s.size = rand(0.6, 2.4);
        s.createdAt = Date.now();
      }
    };

    const drawPlanets = (t) => {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      for (let p of CONFIG.PLANETS) {
        const px = (p.x * width + Math.sin(t * p.speed) * 40) | 0;
        const py = (p.y * height + Math.cos(t * p.speed) * 20) | 0;

        const gradient = ctx.createRadialGradient(
          px - p.r / 3,
          py - p.r / 3,
          p.r * 0.1,
          px,
          py,
          p.r
        );
        gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
        gradient.addColorStop(0.25, `${p.color}`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = Math.max(1, p.r * 0.08);
        ctx.beginPath();
        ctx.ellipse(
          px,
          py + p.r * 0.25,
          p.r * 1.4,
          p.r * 0.5,
          t * p.speed * 0.2,
          0,
          Math.PI * 2
        );
        ctx.stroke();

        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.restore();
    };

    const drawStars = (t) => {
      for (let s of stars) {
        let speedFactor =
          s.layer === 'near' ? 0.6 : s.layer === 'mid' ? 0.3 : 0.12;

        s.y -= s.speed * speedFactor;
        if (s.y < -10) s.y = height + 10;

        s.twinkle += 0.02 + s.size * 0.005;
        const alpha = s.opacity * (0.6 + Math.abs(Math.sin(s.twinkle)) * 0.8);

        const size = Math.max(0.5, s.size * (dpr * 0.8));

        ctx.globalAlpha = alpha;
        ctx.drawImage(
          starSprite,
          0,
          0,
          starSprite.width,
          starSprite.height,
          s.x - size,
          s.y - size,
          size * 2,
          size * 2
        );
        ctx.globalAlpha = 1;
      }
    };

    const drawShooting = () => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let s of shootingStars) {
        if (!s.active) continue;

        const steps = 18;
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const tx = s.x - s.vx * t * 0.6;
          const ty = s.y - s.vy * t * 0.6;

          ctx.globalAlpha = (1 - t) * 0.9;
          ctx.beginPath();
          ctx.arc(
            tx,
            ty,
            Math.max(0.2, s.size * (1 - t) * 1.6),
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'white';
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(1.2, s.size * 1.8), 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -100 || s.y > height + 100) {
          s.active = false;
          s.waitUntil = Date.now() + rand(800, 5000);
        }
      }
      ctx.restore();
    };

    const start = performance.now();
    const render = (now) => {
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#071228';
      ctx.fillRect(0, 0, width, height);

      // minimal nebula fog
      for (let L of nebulaLayers) drawNebula(L, t);

      drawPlanets(t);
      drawStars(t);

      for (let s of shootingStars) {
        if (!s.active) trySpawnShootingStar(s);
      }
      drawShooting();

      rafRef.current = requestAnimationFrame(render);
    };

    const onResize = () => {
      clearTimeout(resizeTimeout.current);
      resizeTimeout.current = setTimeout(() => init(), 120);
    };

    init();
    rafRef.current = requestAnimationFrame(render);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0B1843] pointer-events-none">
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-12%] left-[-12%] w-[52vw] h-[52vw]
        bg-gradient-to-tr from-[#9b87fe]/30 via-[#5eead4]/20 to-[#893193]/20
        rounded-full blur-[160px] opacity-60"
      />

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.35, 0.18] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
        className="absolute bottom-[-8%] right-[-8%] w-[62vw] h-[62vw]
        bg-gradient-to-br from-[#893193]/25 via-[#ff9fb8]/10 to-[#9b87fe]/10
        rounded-full blur-[200px] opacity-50"
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}
