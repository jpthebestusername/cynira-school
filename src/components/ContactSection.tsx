import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Sparkles, MessageSquare } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serie: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: "ENDEREÇO",
      content: "Rua da Educação, 1234",
      subContent: "Centro - São Paulo, SP",
      color: "primary",
    },
    {
      icon: Phone,
      title: "TELEFONE",
      content: "(11) 1234-5678",
      subContent: "(11) 91234-5678",
      color: "secondary",
    },
    {
      icon: Mail,
      title: "E-MAIL",
      content: "contato@cynirastocco.edu.br",
      subContent: "matriculas@cynirastocco.edu.br",
      color: "accent",
    },
    {
      icon: Clock,
      title: "HORÁRIO",
      content: "Segunda a Sexta: 7h às 18h",
      subContent: "Sábado: 8h às 12h",
      color: "warm",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", email: "", serie: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contato" ref={ref} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 60%)" }}
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wider">FALE CONOSCO</span>
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
            VAMOS
            <br />
            <span className="text-gradient">CONVERSAR?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Agende uma visita e conheça nossa estrutura. Estamos ansiosos para recebê-lo!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-3xl text-foreground mb-8">
              INFORMAÇÕES DE <span className="text-primary">CONTATO</span>
            </h3>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const colorClasses = {
                  primary: { bg: "bg-primary/10", text: "text-primary" },
                  secondary: { bg: "bg-secondary/10", text: "text-secondary" },
                  accent: { bg: "bg-accent/10", text: "text-accent" },
                  warm: { bg: "bg-warm/10", text: "text-warm" },
                };
                const colors = colorClasses[info.color as keyof typeof colorClasses];

                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="flex gap-4 p-4 md:p-5 rounded-xl card-glass card-hover-glow cursor-pointer group"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <info.icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.text}`} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-lg text-foreground mb-1">{info.title}</h4>
                      <p className="text-muted-foreground font-body break-words">{info.content}</p>
                      <p className="text-sm text-muted-foreground/70 font-body break-all">{info.subContent}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8 rounded-2xl overflow-hidden border border-border h-[200px] bg-muted/30 flex items-center justify-center relative group cursor-pointer"
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-primary animate-pulse" />
                <p className="text-muted-foreground font-body">Clique para abrir no Google Maps</p>
              </div>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-2xl card-glass">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="font-display text-2xl text-foreground">SOLICITE INFORMAÇÕES</h3>
              </div>
              <p className="text-muted-foreground mb-8 font-body">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas.
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
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
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
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Série de interesse
                  </label>
                  <select 
                    value={formData.serie}
                    onChange={(e) => setFormData({ ...formData, serie: e.target.value })}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground"
                  >
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
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-foreground placeholder:text-muted-foreground"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitted}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    isSubmitted
                      ? "bg-success text-primary-foreground"
                      : "bg-primary text-primary-foreground btn-neon"
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      MENSAGEM ENVIADA!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      ENVIAR MENSAGEM
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
