import { motion } from 'framer-motion';
import { Cloud, Shield, Cpu, ChevronDown, Mail, AtSign } from 'lucide-react';
import { useEffect, useRef } from 'react';

const badges = [
  { icon: Cloud, label: 'Cloud-Native' },
  { icon: Shield, label: 'Enterprise Security' },
  { icon: Cpu, label: 'AI-Ready' },
];

// Floating icons for the animated background
const floatingIcons = [
  { Icon: Cloud, x: '15%', y: '25%', delay: 0 },
  { Icon: Mail, x: '85%', y: '20%', delay: 0.5 },
  { Icon: AtSign, x: '10%', y: '60%', delay: 1 },
  { Icon: Shield, x: '90%', y: '65%', delay: 1.5 },
  { Icon: Cpu, x: '25%', y: '80%', delay: 2 },
  { Icon: Mail, x: '75%', y: '85%', delay: 2.5 },
  { Icon: AtSign, x: '50%', y: '15%', delay: 0.8 },
  { Icon: Cloud, x: '70%', y: '40%', delay: 1.2 },
];

// Network nodes for connecting lines effect
const networkNodes = [
  { x: 100, y: 150 },
  { x: 300, y: 100 },
  { x: 500, y: 200 },
  { x: 200, y: 350 },
  { x: 400, y: 400 },
  { x: 600, y: 300 },
  { x: 150, y: 500 },
  { x: 450, y: 550 },
  { x: 700, y: 450 },
  { x: 250, y: 250 },
  { x: 550, y: 150 },
  { x: 350, y: 300 },
];

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const numParticles = 80;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 31, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      ctx.strokeStyle = 'rgba(124, 181, 57, 0.15)'; // Brand olive color
      ctx.lineWidth = 0.5;

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = 1 - dist / 150;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      // Draw and update particles
      particles.forEach((p) => {
        // Draw particle with brand color glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, 'rgba(124, 181, 57, 0.8)');
        gradient.addColorStop(0.5, 'rgba(124, 181, 57, 0.3)');
        gradient.addColorStop(1, 'rgba(124, 181, 57, 0)');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, hsl(200 30% 10%) 0%, hsl(200 25% 8%) 50%, hsl(180 30% 12%) 100%)' }}
      />
      
      {/* Brand color overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 6,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute"
            style={{ left: item.x, top: item.y }}
          >
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <item.Icon className="w-6 h-6 text-primary/60" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Enterprise Cloud Solutions
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            Transform Your Business with{' '}
            <span className="text-primary">Intelligent Cloud</span> Solutions
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
          >
            We specialize in Microsoft 365, SharePoint, and custom enterprise applications. 
            Secure, scalable, and AI-ready solutions for modern organizations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 group"
            >
              Start Your Journey
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-transparent text-white px-8 py-4 rounded-xl font-medium border-2 border-white/30 transition-all duration-300 ease-out hover:border-primary hover:text-primary hover:-translate-y-0.5"
            >
              Explore Services
            </motion.a>
          </motion.div>

          {/* Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
              >
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-sm text-white/60">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="p-2 rounded-full border border-primary/30"
          >
            <ChevronDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
