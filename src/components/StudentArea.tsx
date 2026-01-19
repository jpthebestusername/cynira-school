import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  User, 
  BookOpen, 
  Trophy, 
  MessageSquare, 
  Calendar, 
  Star,
  Gamepad2,
  Zap,
  Lock,
  ArrowRight
} from "lucide-react";

const StudentArea = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: BookOpen,
      title: "NOTAS & BOLETIM",
      description: "Acompanhe seu desempenho em tempo real",
      color: "primary",
    },
    {
      icon: Calendar,
      title: "AGENDA ESCOLAR",
      description: "Provas, trabalhos e eventos",
      color: "secondary",
    },
    {
      icon: Trophy,
      title: "CONQUISTAS",
      description: "Badges e recompensas por performance",
      color: "accent",
    },
    {
      icon: MessageSquare,
      title: "CHAT COM PROFESSORES",
      description: "Tire dúvidas diretamente",
      color: "warm",
    },
  ];

  const achievements = [
    { icon: Star, label: "Destaque em Matemática", points: 500 },
    { icon: Zap, label: "Presença Perfeita", points: 300 },
    { icon: Gamepad2, label: "Campeão do Quiz", points: 750 },
  ];

  return (
    <section id="alunos" ref={ref} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--secondary) / 0.08) 0%, transparent 60%)" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-6"
          >
            <Gamepad2 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary tracking-wider">EXCLUSIVO</span>
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
            ÁREA DO
            <br />
            <span className="text-gradient">ALUNO</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Uma experiência gamificada para acompanhar sua jornada acadêmica
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {features.map((feature, index) => {
              const colorClasses = {
                primary: { bg: "bg-primary/10", text: "text-primary" },
                secondary: { bg: "bg-secondary/10", text: "text-secondary" },
                accent: { bg: "bg-accent/10", text: "text-accent" },
                warm: { bg: "bg-warm/10", text: "text-warm" },
              };
              const colors = colorClasses[feature.color as keyof typeof colorClasses];

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  onClick={() => setActiveTab(index)}
                  className={`p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeTab === index 
                      ? 'card-glass border-l-4 border-primary glow-primary' 
                      : 'bg-muted/30 hover:bg-muted/50 border-l-4 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg md:text-xl text-foreground mb-1">{feature.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right - Portal Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="relative p-8 rounded-2xl card-glass overflow-hidden">
              {/* Fake Browser Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-warm/50" />
                  <div className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 mx-3 md:mx-4 min-w-0">
                  <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-muted rounded-lg min-w-0">
                    <Lock className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-xs md:text-sm text-muted-foreground truncate">portal.cynirasttouco.edu.br</span>
                  </div>
                </div>
              </div>

              {/* Portal Content */}
              <div className="space-y-6">
                {/* User Header */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl text-foreground">BEM-VINDO, ALUNO!</h4>
                    <p className="text-sm text-muted-foreground">8º Ano - Turma A</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-display text-3xl text-primary">1.550</p>
                    <p className="text-xs text-muted-foreground tracking-wider">XP POINTS</p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h5 className="font-display text-lg text-foreground mb-4">ÚLTIMAS CONQUISTAS</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="p-4 rounded-xl bg-muted/30 border border-border hover:border-accent/50 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                          <achievement.icon className="w-5 h-5 text-accent" />
                        </div>
                        <p className="text-xs text-foreground font-medium mb-1">{achievement.label}</p>
                        <p className="text-xs text-accent">+{achievement.points} XP</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                 {/* Quick Stats */}
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="font-display text-2xl text-primary">9.2</p>
                    <p className="text-[10px] text-muted-foreground">MÉDIA</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl text-accent">98%</p>
                    <p className="text-[10px] text-muted-foreground">PRESENÇA</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl text-secondary">15</p>
                    <p className="text-[10px] text-muted-foreground">BADGES</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl text-warm">#3</p>
                    <p className="text-[10px] text-muted-foreground">RANKING</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.a
                href="#contato"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full mt-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-bold btn-neon"
              >
                ACESSAR PORTAL
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentArea;
