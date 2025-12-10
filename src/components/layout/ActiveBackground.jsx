'use client';
import { motion } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';

const ActiveBackground = memo(() => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const resizeTimeout = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let width = 0;
    let height = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1); // Cap DPR for performance

    const CONFIG = {
      STAR_DENSITY: 1 / 5000,
      NUM_NEBULA_LAYERS: 2,
      MAX_SHOOTING: 3,
      PLANETS: [
        { r: 100, x: 0.15, y: 0.7, speed: 0.015, color: '#9B87FE' },
        { r: 60, x: 0.82, y: 0.28, speed: -0.012, color: '#FF9FB8' },
      ],
    };

    let stars = [];
    let shootingStars = [];
    let nebulaLayers = [];

    const starSprite = document.createElement('canvas');
    const spriteSize = 10 * dpr;
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
      g.addColorStop(0.3, 'rgba(255,255,255,0.7)');
      g.addColorStop(0.6, 'rgba(200,200,255,0.2)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = g;
      sctx.beginPath();
      sctx.arc(spriteSize / 2, spriteSize / 2, spriteSize / 2, 0, Math.PI * 2);
      sctx.fill();
    };

    const rand = (a, b) => Math.random() * (b - a) + a;

    const init = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
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
        size: rand(0.4, 1.5),
        speed: rand(0.03, 0.4),
        twinkle: Math.random() * Math.PI * 2,
        layer:
          Math.random() > 0.8 ? 'near' : Math.random() > 0.5 ? 'mid' : 'far',
        opacity: rand(0.5, 1),
      }));

      shootingStars = new Array(CONFIG.MAX_SHOOTING).fill(0).map(() => ({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        length: 0,
        size: 0,
        createdAt: 0,
        waitUntil: Date.now() + rand(1000, 5000),
      }));

      nebulaLayers = new Array(CONFIG.NUM_NEBULA_LAYERS).fill(0).map(() => ({
        cx: width * rand(0.2, 0.8),
        cy: height * rand(0.2, 0.8),
        r: rand(width * 0.25, width * 0.4),
        hue: rand(220, 280),
        alpha: rand(0.05, 0.1),
        drift: rand(0.0005, 0.001),
      }));
    };

    const drawNebula = (layer, t) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const { cx, cy, r, hue, alpha, drift } = layer;

      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `hsla(${hue}, 70%, 60%, ${alpha})`);
      g.addColorStop(1, `hsla(${hue}, 70%, 40%, 0)`);

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      layer.cx += Math.sin(t * drift) * 0.15;
      layer.cy += Math.cos(t * drift) * 0.15;

      ctx.restore();
    };

    const trySpawnShootingStar = (s) => {
      if (s.active || Date.now() <= s.waitUntil || Math.random() > 0.015)
        return;

      s.active = true;
      s.x = rand(width * 0.3, width * 1.2);
      s.y = rand(-50, height * 0.2);
      const angle = rand(0.3, 0.6);
      const speed = rand(10, 16);
      s.vx = -Math.cos(angle) * speed;
      s.vy = Math.sin(angle) * speed;
      s.length = rand(80, 200);
      s.size = rand(0.8, 2);
      s.createdAt = Date.now();
    };

    const drawPlanets = (t) => {
      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      for (let p of CONFIG.PLANETS) {
        const px = (p.x * width + Math.sin(t * p.speed) * 30) | 0;
        const py = (p.y * height + Math.cos(t * p.speed) * 15) | 0;

        const gradient = ctx.createRadialGradient(
          px - p.r / 3,
          py - p.r / 3,
          p.r * 0.1,
          px,
          py,
          p.r
        );
        gradient.addColorStop(0, 'rgba(255,255,255,0.85)');
        gradient.addColorStop(0.3, p.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = Math.max(1, p.r * 0.06);
        ctx.beginPath();
        ctx.ellipse(
          px,
          py + p.r * 0.2,
          p.r * 1.3,
          p.r * 0.4,
          t * p.speed * 0.15,
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
          s.layer === 'near' ? 0.5 : s.layer === 'mid' ? 0.25 : 0.1;

        s.y -= s.speed * speedFactor;
        if (s.y < -10) s.y = height + 10;

        s.twinkle += 0.015 + s.size * 0.003;
        const alpha = s.opacity * (0.6 + Math.abs(Math.sin(s.twinkle)) * 0.4);

        const size = Math.max(0.4, s.size * (dpr * 0.6));

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

        const steps = 15;
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const tx = s.x - s.vx * t * 0.5;
          const ty = s.y - s.vy * t * 0.5;

          ctx.globalAlpha = (1 - t) * 0.8;
          ctx.beginPath();
          ctx.arc(
            tx,
            ty,
            Math.max(0.2, s.size * (1 - t) * 1.4),
            0,
            Math.PI * 2
          );
          ctx.fillStyle = 'white';
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(1, s.size * 1.6), 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -100 || s.y > height + 100) {
          s.active = false;
          s.waitUntil = Date.now() + rand(1000, 6000);
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
      resizeTimeout.current = setTimeout(() => init(), 150);
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
      {/* Animated gradient orbs */}
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-[#9B87FE]/25 via-[#5eead4]/15 to-[#893193]/20 rounded-full blur-[140px]"
      />

      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute bottom-[-8%] right-[-8%] w-[55vw] h-[55vw] bg-gradient-to-br from-[#893193]/20 via-[#FF9FB8]/8 to-[#9B87FE]/12 rounded-full blur-[180px]"
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
});

ActiveBackground.displayName = 'ActiveBackground';
export default ActiveBackground;
