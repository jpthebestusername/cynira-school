import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Play, Zap, Star, Rocket } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const stats = [
    { value: "2500+", label: "ALUNOS", icon: Star },
    { value: "25", label: "ANOS", icon: Zap },
    { value: "98%", label: "APROVAÇÃO", icon: Rocket },
  ];

  return (
    <section ref={containerRef} id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Simplified Background - Better Mobile Performance */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Static gradient orbs - no mouse tracking for performance */}
        <div
          className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 md:w-80 h-48 md:h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.1) 0%, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-4 relative z-10 pt-24 pb-8 md:pt-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 md:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-primary tracking-wider">MATRÍCULAS ABERTAS 2025</span>
          </motion.div>

          {/* Main Title - Mobile Optimized */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-4 md:mb-6"
          >
            <span className="block text-foreground">ESCOLA</span>
            <span className="block text-gradient py-1">
              <span className="block sm:inline">CYNIRA</span>{" "}
              <span className="block sm:inline">STTOUCO</span>
            </span>
            <span className="block text-foreground">FAUSTO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 font-body px-4"
          >
            Onde a <span className="text-primary font-semibold">inovação</span> encontra a tradição. 
            Formamos os líderes do amanhã.
          </motion.p>

          {/* CTA Buttons - Stack on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4"
          >
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group px-6 md:px-8 py-3.5 md:py-4 bg-primary text-primary-foreground rounded-xl font-bold text-base md:text-lg btn-neon text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                QUERO ME MATRICULAR
              </span>
            </motion.a>
            <motion.a
              href="#sobre"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 border-2 border-border text-foreground rounded-xl font-bold text-base md:text-lg hover:border-primary hover:text-primary transition-all"
            >
              <Play className="w-5 h-5" />
              CONHEÇA A ESCOLA
            </motion.a>
          </motion.div>

          {/* Stats - Horizontal Scroll on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-start sm:justify-center gap-6 md:gap-16 overflow-x-auto pb-4 px-4 md:px-0 md:overflow-visible"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex-shrink-0 group">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center">
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-2xl md:text-4xl text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-[10px] md:text-xs text-muted-foreground tracking-widest">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Hidden on Small Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
        <motion.a
          href="#sobre"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
