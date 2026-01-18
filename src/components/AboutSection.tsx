import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Palette, Users, Trophy, Sparkles, Zap } from "lucide-react";
import studentsImage from "@/assets/students-learning.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Cpu, label: "TECNOLOGIA", color: "text-primary" },
    { icon: Palette, label: "CRIATIVIDADE", color: "text-secondary" },
    { icon: Users, label: "COMUNIDADE", color: "text-accent" },
    { icon: Trophy, label: "EXCELÊNCIA", color: "text-warm" },
  ];

  return (
    <section id="sobre" ref={ref} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
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
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent tracking-wider">SOBRE NÓS</span>
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
            MAIS QUE UMA
            <br />
            <span className="text-gradient-cyan">ESCOLA</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden card-glass">
              <motion.img
                src={studentsImage}
                alt="Alunos aprendendo"
                className="w-full h-[500px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 right-6 p-6 rounded-xl card-glass"
              >
                <div className="flex items-center justify-between">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="text-center group cursor-pointer"
                      whileHover={{ y: -5 }}
                    >
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-muted flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <p className="text-[10px] text-muted-foreground tracking-wider">{feature.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30 rounded-xl -z-10"
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/10 rounded-lg -z-10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="font-display text-3xl md:text-4xl text-foreground mb-6">
              ONDE O FUTURO É <span className="text-primary">CONSTRUÍDO</span>
            </h3>

            <div className="space-y-6 font-body text-lg text-muted-foreground leading-relaxed">
              <p>
                A <span className="text-foreground font-semibold">Escola Cynira Sttouco Fausto</span> não é apenas um lugar de aprendizado – 
                é um <span className="text-primary">ecossistema de inovação</span> onde cada aluno descobre seu potencial único.
              </p>
              
              <p>
                Combinamos metodologias ativas, tecnologia de ponta e um ambiente que estimula a 
                <span className="text-accent"> criatividade</span> e o <span className="text-secondary">pensamento crítico</span>.
              </p>

              <p>
                Nossos alunos não apenas aprendem – eles <span className="text-warm font-semibold">criam, inovam e lideram</span>.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border"
            >
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl text-primary">25+</p>
                <p className="text-sm text-muted-foreground mt-1">ANOS</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl text-accent">150+</p>
                <p className="text-sm text-muted-foreground mt-1">EDUCADORES</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl md:text-5xl text-secondary">5k+</p>
                <p className="text-sm text-muted-foreground mt-1">FORMADOS</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#diferenciais"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="inline-flex items-center gap-3 mt-10 text-lg font-semibold text-primary hover:text-accent transition-colors group"
            >
              <span>EXPLORE NOSSOS DIFERENCIAIS</span>
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
