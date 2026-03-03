import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Scene3D from './Scene3D';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-[1]" />

      <motion.div style={{ y: parallaxY }} className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <p className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm mb-6">
            Creative Digital Agency — Hyderabad
          </p>
          <h1 className="font-display font-900 text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
            <span className="text-gradient">Creative Media</span>
            <br />
            <span className="text-foreground">& Digital Marketing</span>
            <br />
            <span className="text-foreground">Agency in</span>
            {' '}
            <span className="text-gradient">Hyderabad</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Turning ideas into powerful brand experiences through social media marketing,
          video production, content direction, and digital strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#works"
            className="glass-card px-8 py-3 font-display font-semibold text-sm tracking-wider uppercase text-primary border border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_hsl(var(--primary)/0.2)] transition-all duration-500 hover:-translate-y-0.5"
          >
            View Works
          </a>
          <a
            href="#contact"
            className="glass-card px-8 py-3 font-display font-semibold text-sm tracking-wider uppercase bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500 hover:-translate-y-0.5"
          >
            Book Now
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
