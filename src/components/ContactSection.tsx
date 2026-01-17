import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      content: "Rua das Flores, 1234 - Centro",
      subContent: "São Paulo - SP, 01234-567",
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(11) 1234-5678",
      subContent: "(11) 91234-5678",
    },
    {
      icon: Mail,
      title: "E-mail",
      content: "contato@sinirastoucco.edu.br",
      subContent: "matriculas@sinirastoucco.edu.br",
    },
    {
      icon: Clock,
      title: "Horário",
      content: "Segunda a Sexta: 7h às 18h",
      subContent: "Sábado: 8h às 12h",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contato" ref={ref} className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
            Fale Conosco
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Venha <span className="text-primary">Nos Conhecer</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Agende uma visita e conheça nossa estrutura. Teremos o prazer de
            apresentar nossa proposta pedagógica e tirar todas as suas dúvidas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-8">
              Informações de Contato
            </h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="flex gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <info.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                    <p className="text-muted-foreground">{info.content}</p>
                    <p className="text-muted-foreground text-sm">{info.subContent}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 rounded-2xl overflow-hidden border border-border h-[200px] bg-muted flex items-center justify-center"
            >
              <div className="text-center text-muted-foreground">
                <MapPin className="w-10 h-10 mx-auto mb-2 text-primary" />
                <p>Localização no mapa</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-card p-8 rounded-2xl shadow-xl border border-border">
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                Solicite Informações
              </h3>
              <p className="text-muted-foreground mb-8">
                Preencha o formulário e entraremos em contato em breve.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Série de interesse
                  </label>
                  <select className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                    <option value="">Selecione...</option>
                    <option value="infantil">Educação Infantil</option>
                    <option value="fundamental1">Ensino Fundamental I</option>
                    <option value="fundamental2">Ensino Fundamental II</option>
                    <option value="medio">Ensino Médio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all btn-glow ${
                    isSubmitted
                      ? "bg-success text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Mensagem Enviada!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar Mensagem
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
