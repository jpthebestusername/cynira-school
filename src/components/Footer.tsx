import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Linkedin, Heart, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    institucional: [
      { name: "Sobre", href: "#sobre" },
      { name: "Diferenciais", href: "#diferenciais" },
      { name: "Infraestrutura", href: "#" },
      { name: "Equipe Pedagógica", href: "#" },
    ],
    ensino: [
      { name: "Educação Infantil", href: "#" },
      { name: "Ensino Fundamental", href: "#" },
      { name: "Ensino Médio", href: "#" },
      { name: "Período Integral", href: "#" },
    ],
    acesso: [
      { name: "Área do Aluno", href: "#alunos" },
      { name: "Calendário", href: "#calendario" },
      { name: "Contato", href: "#contato" },
      { name: "Trabalhe Conosco", href: "#" },
    ],
  };

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-muted/30 border-t border-border overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="inline-flex items-center gap-3 mb-6 group"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center glow-primary">
                <span className="font-display text-2xl text-primary-foreground">C</span>
              </div>
              <div>
                <h3 className="font-display text-xl tracking-wider text-foreground">
                  CYNIRA STTOUCO <span className="text-primary">FAUSTO</span>
                </h3>
                <p className="text-xs text-muted-foreground tracking-widest">O FUTURO COMEÇA AQUI</p>
              </div>
            </motion.a>

            <p className="text-muted-foreground font-body leading-relaxed mb-6 max-w-md">
              Mais de 25 anos formando líderes do amanhã com inovação, tecnologia e excelência acadêmica.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">INSTITUCIONAL</h4>
            <ul className="space-y-3">
              {links.institucional.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-foreground mb-5">ENSINO</h4>
            <ul className="space-y-3">
              {links.ensino.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg text-foreground mb-5">ACESSO RÁPIDO</h4>
            <ul className="space-y-3">
              {links.acesso.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors font-body group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-body text-center md:text-left">
            © {currentYear} Escola Cynira Sttouco Fausto. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm font-body flex items-center gap-2">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> para a educação
          </p>
        </div>
      </div>

      {/* Marquee - Simplified for Mobile */}
      <div className="border-t border-border bg-muted/50 overflow-hidden py-3 md:py-4">
        <div className="animate-marquee flex gap-8 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-display text-2xl md:text-4xl text-muted-foreground/20 tracking-wider">
              CYNIRA STTOUCO FAUSTO • O FUTURO COMEÇA AQUI •
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
