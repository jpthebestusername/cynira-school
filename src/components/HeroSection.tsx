import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown, Play, Zap, Star, Rocket } from "lucide-react";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { value: "2500+", label: "ALUNOS", icon: Star },
    { value: "25", label: "ANOS", icon: Zap },
    { value: "98%", label: "APROVAÇÃO", icon: Rocket },
  ];

  return (
    <section ref={containerRef} id="inicio" className="relative min-h-screen flex items-center overflow-hidden noise">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)",
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 relative z-10 pt-20"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary tracking-wider">MATRÍCULAS ABERTAS 2025</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-6"
          >
            <span className="text-foreground">ESCOLA</span>
            <br />
            <motion.span 
              className="text-gradient"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 200%" }}
            >
              CYNIRA STTOUCO
            </motion.span>
            <br />
            <span className="text-foreground">FAUSTO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
          >
            Onde a <span className="text-primary font-semibold">inovação</span> encontra a tradição. 
            Formamos os líderes do amanhã com tecnologia, criatividade e paixão pelo conhecimento.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg btn-neon overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                QUERO ME MATRICULAR
              </span>
            </motion.a>
            <motion.a
              href="#sobre"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground rounded-xl font-bold text-lg hover:border-primary hover:text-primary transition-all"
            >
              <Play className="w-5 h-5" />
              CONHEÇA A ESCOLA
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-widest">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a
          href="#sobre"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ArrowDown className="w-5 h-5 group-hover:glow-text" />
        </motion.a>
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-20 right-8 hidden lg:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-primary/20 rounded-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
