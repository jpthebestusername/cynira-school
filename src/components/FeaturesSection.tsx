import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Cpu, 
  Gamepad2, 
  Palette, 
  Trophy, 
  BookOpen, 
  Rocket,
  ChevronRight,
  Sparkles
} from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Cpu,
      title: "TECH LAB",
      subtitle: "Laboratório de Inovação",
      description: "Robótica, programação e inteligência artificial para todas as idades",
      color: "primary",
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Gamepad2,
      title: "GAMIFICAÇÃO",
      subtitle: "Aprendizado Interativo",
      description: "Metodologias que transformam o aprendizado em uma aventura épica",
      color: "secondary",
      bgGradient: "from-secondary/20 to-secondary/5",
    },
    {
      icon: Palette,
      title: "ARTES & MÍDIA",
      subtitle: "Expressão Criativa",
      description: "Música, teatro, artes visuais e produção de conteúdo digital",
      color: "accent",
      bgGradient: "from-accent/20 to-accent/5",
    },
    {
      icon: Trophy,
      title: "ESPORTES",
      subtitle: "Corpo & Mente",
      description: "Infraestrutura completa para desenvolvimento físico e mental",
      color: "warm",
      bgGradient: "from-warm/20 to-warm/5",
    },
    {
      icon: BookOpen,
      title: "BIBLIOTECA 4.0",
      subtitle: "Conhecimento Infinito",
      description: "Acervo físico e digital com mais de 10.000 títulos disponíveis",
      color: "primary",
      bgGradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Rocket,
      title: "PROJETOS",
      subtitle: "Mão na Massa",
      description: "Feiras de ciências, hackathons e competições acadêmicas",
      color: "secondary",
      bgGradient: "from-secondary/20 to-secondary/5",
    },
  ];

  return (
    <section id="diferenciais" ref={ref} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/3 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)" }}
          animate={{ x: [0, 50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)" }}
          animate={{ x: [0, -50, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wider">DIFERENCIAIS</span>
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
            POR QUE SOMOS
            <br />
            <span className="text-gradient">DIFERENTES</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Uma experiência educacional que combina o melhor da tecnologia com metodologias inovadoras
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colorClasses = {
              primary: { bg: "bg-primary/10", text: "text-primary", gradient: "from-primary/20 to-primary/5" },
              secondary: { bg: "bg-secondary/10", text: "text-secondary", gradient: "from-secondary/20 to-secondary/5" },
              accent: { bg: "bg-accent/10", text: "text-accent", gradient: "from-accent/20 to-accent/5" },
              warm: { bg: "bg-warm/10", text: "text-warm", gradient: "from-warm/20 to-warm/5" },
            };
            const colors = colorClasses[feature.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-6 md:p-8 rounded-2xl card-glass card-hover-glow cursor-pointer overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl ${colors.bg} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 md:w-8 md:h-8 ${colors.text}`} />
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className={`text-xs md:text-sm ${colors.text} font-medium tracking-wider mb-3 md:mb-4`}>
                    {feature.subtitle}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Arrow on Hover - Desktop Only */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? 0 : -10 }}
                    className="hidden md:flex items-center gap-2 mt-6 text-primary font-medium"
                  >
                    <span className="text-sm">SAIBA MAIS</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold btn-neon"
          >
            <Rocket className="w-5 h-5" />
            AGENDE UMA VISITA
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
