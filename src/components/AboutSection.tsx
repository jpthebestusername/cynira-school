import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Lightbulb } from "lucide-react";
import studentsImage from "@/assets/students-learning.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Heart,
      title: "Acolhimento",
      description: "Ambiente seguro e afetuoso para o desenvolvimento integral",
    },
    {
      icon: Target,
      title: "Excelência",
      description: "Compromisso com a qualidade em todas as práticas pedagógicas",
    },
    {
      icon: Lightbulb,
      title: "Inovação",
      description: "Metodologias modernas que preparam para o futuro",
    },
  ];

  return (
    <section id="sobre" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={studentsImage}
                alt="Alunos aprendendo"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border max-w-[200px]"
            >
              <p className="text-3xl font-bold text-secondary">25+</p>
              <p className="text-muted-foreground">Anos transformando vidas através da educação</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
              Sobre Nós
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Uma Tradição em{" "}
              <span className="text-primary">Educação de Qualidade</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A Escola Sinira Stoucco Fausto nasceu do sonho de oferecer uma educação
              transformadora. Há mais de 25 anos, formamos cidadãos críticos,
              criativos e preparados para os desafios do mundo contemporâneo.
            </p>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Nossa proposta pedagógica une o melhor da tradição educacional com
              práticas inovadoras, garantindo um ensino que respeita a individualidade
              de cada aluno e estimula seu pleno desenvolvimento.
            </p>

            {/* Values */}
            <div className="grid sm:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
