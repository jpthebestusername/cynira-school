import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  BookOpen, 
  Users, 
  Palette, 
  Trophy, 
  Monitor, 
  Leaf 
} from "lucide-react";
import libraryImage from "@/assets/library.jpg";
import sportsImage from "@/assets/sports.jpg";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: BookOpen,
      title: "Biblioteca Moderna",
      description: "Acervo completo com mais de 5.000 títulos e espaço de leitura acolhedor",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Monitor,
      title: "Tecnologia Educacional",
      description: "Laboratórios de informática e salas com recursos multimídia",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: Palette,
      title: "Artes e Cultura",
      description: "Atividades de música, teatro, dança e artes visuais",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Trophy,
      title: "Esportes",
      description: "Quadra poliesportiva, campo de futebol e atividades diversificadas",
      color: "bg-warm/10 text-warm",
    },
    {
      icon: Users,
      title: "Turmas Reduzidas",
      description: "Atenção personalizada para cada aluno com turmas de até 25 estudantes",
      color: "bg-success/10 text-success",
    },
    {
      icon: Leaf,
      title: "Educação Ambiental",
      description: "Horta escolar, projetos ecológicos e consciência sustentável",
      color: "bg-secondary/10 text-secondary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="diferenciais" ref={ref} className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Nossos Diferenciais
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Estrutura Completa para o{" "}
            <span className="text-primary">Aprendizado</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Oferecemos infraestrutura moderna e recursos pedagógicos de qualidade
            para proporcionar a melhor experiência educacional.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          >
            <img
              src={libraryImage}
              alt="Biblioteca"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                  Biblioteca
                </h3>
                <p className="text-primary-foreground/80">
                  Espaço inspirador para leitura e pesquisa
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          >
            <img
              src={sportsImage}
              alt="Área esportiva"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                  Área Esportiva
                </h3>
                <p className="text-primary-foreground/80">
                  Espaços amplos para atividades físicas
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
