import { motion } from "framer-motion";
import { GraduationCap, Facebook, Instagram, Youtube, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    institucional: [
      { name: "Sobre a Escola", href: "#sobre" },
      { name: "Proposta Pedagógica", href: "#" },
      { name: "Infraestrutura", href: "#diferenciais" },
      { name: "Equipe", href: "#" },
    ],
    servicos: [
      { name: "Educação Infantil", href: "#" },
      { name: "Ensino Fundamental", href: "#" },
      { name: "Ensino Médio", href: "#" },
      { name: "Período Integral", href: "#" },
    ],
    atendimento: [
      { name: "Fale Conosco", href: "#contato" },
      { name: "Trabalhe Conosco", href: "#" },
      { name: "Portal do Aluno", href: "#" },
      { name: "Portal do Responsável", href: "#" },
    ],
  };

  const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <motion.a
              href="#inicio"
              className="flex items-center gap-3 mb-6 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center border border-primary-foreground/20">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  Sinira Stoucco Fausto
                </h3>
                <p className="text-sm text-primary-foreground/70">
                  Educação que transforma
                </p>
              </div>
            </motion.a>

            <p className="text-primary-foreground/80 leading-relaxed mb-6 max-w-md">
              Há mais de 25 anos formando cidadãos conscientes e preparados para
              o futuro através de uma educação de qualidade.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Institucional</h4>
            <ul className="space-y-3">
              {links.institucional.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Ensino</h4>
            <ul className="space-y-3">
              {links.servicos.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Atendimento</h4>
            <ul className="space-y-3">
              {links.atendimento.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm text-center md:text-left">
            © {currentYear} Escola Sinira Stoucco Fausto. Todos os direitos reservados.
          </p>
          <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-accent fill-accent" /> para a educação
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
