import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, User, Calendar } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "INÍCIO", href: "#inicio" },
    { name: "SOBRE", href: "#sobre" },
    { name: "DIFERENCIAIS", href: "#diferenciais" },
    { name: "CALENDÁRIO", href: "#calendario" },
    { name: "CONTATO", href: "#contato" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#inicio"
            className="group flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center glow-primary">
                <span className="font-display text-2xl text-primary-foreground">C</span>
              </div>
              <motion.div
                className="absolute -inset-1 rounded-lg bg-primary/20 blur-md -z-10"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-xl tracking-wider text-foreground">
                CYNIRA STTOUCO <span className="text-primary">FAUSTO</span>
              </h1>
              <p className="text-xs text-muted-foreground font-body tracking-widest">O FUTURO COMEÇA AQUI</p>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary group-hover:w-full group-hover:left-0 transition-all duration-300"
                  whileHover={{ boxShadow: "0 0 10px hsl(var(--primary))" }}
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.a
              href="#alunos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:border-primary hover:text-primary transition-all"
            >
              <User className="w-4 h-4" />
              ÁREA DO ALUNO
            </motion.a>
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm btn-neon"
            >
              <Sparkles className="w-4 h-4" />
              MATRICULE-SE
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 px-4 text-foreground font-medium hover:text-primary hover:bg-muted/50 rounded-lg transition-all"
                  >
                    {item.name}
                  </motion.a>
                ))}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <a
                    href="#alunos"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 text-foreground border border-border rounded-lg font-medium"
                  >
                    <User className="w-4 h-4" />
                    ÁREA DO ALUNO
                  </a>
                  <a
                    href="#contato"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold btn-neon"
                  >
                    <Sparkles className="w-4 h-4" />
                    MATRICULE-SE
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
