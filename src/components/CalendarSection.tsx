import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Star,
  PartyPopper,
  BookOpen,
  Users,
  Trophy,
  Sparkles
} from "lucide-react";

interface CalendarEvent {
  date: number;
  month: number;
  title: string;
  type: "feriado" | "evento" | "prova" | "recesso";
  icon: typeof Star;
}

const CalendarSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const months = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];

  const events: CalendarEvent[] = [
    { date: 1, month: 0, title: "Ano Novo", type: "feriado", icon: PartyPopper },
    { date: 20, month: 0, title: "São Sebastião", type: "feriado", icon: Star },
    { date: 25, month: 1, title: "Carnaval", type: "feriado", icon: PartyPopper },
    { date: 26, month: 1, title: "Carnaval", type: "feriado", icon: PartyPopper },
    { date: 29, month: 2, title: "Paixão de Cristo", type: "feriado", icon: Star },
    { date: 21, month: 3, title: "Tiradentes", type: "feriado", icon: Star },
    { date: 1, month: 4, title: "Dia do Trabalho", type: "feriado", icon: Star },
    { date: 19, month: 5, title: "Corpus Christi", type: "feriado", icon: Star },
    { date: 7, month: 8, title: "Independência", type: "feriado", icon: Trophy },
    { date: 12, month: 9, title: "N. Sra. Aparecida", type: "feriado", icon: Star },
    { date: 2, month: 10, title: "Finados", type: "feriado", icon: Star },
    { date: 15, month: 10, title: "Proclamação da República", type: "feriado", icon: Trophy },
    { date: 20, month: 10, title: "Consciência Negra", type: "feriado", icon: Star },
    { date: 25, month: 11, title: "Natal", type: "feriado", icon: PartyPopper },
    // Eventos escolares
    { date: 3, month: 1, title: "Início das Aulas", type: "evento", icon: BookOpen },
    { date: 15, month: 2, title: "Feira de Ciências", type: "evento", icon: Sparkles },
    { date: 10, month: 5, title: "Festa Junina", type: "evento", icon: PartyPopper },
    { date: 1, month: 6, title: "Início Recesso", type: "recesso", icon: Star },
    { date: 31, month: 6, title: "Fim Recesso", type: "recesso", icon: Star },
    { date: 20, month: 8, title: "Olimpíada de Matemática", type: "evento", icon: Trophy },
    { date: 12, month: 9, title: "Dia das Crianças", type: "evento", icon: PartyPopper },
    { date: 25, month: 10, title: "Formatura", type: "evento", icon: Users },
    { date: 20, month: 11, title: "Início Férias", type: "recesso", icon: Star },
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.date === day && e.month === currentMonth);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "feriado": return "bg-destructive/20 text-destructive border-destructive/30";
      case "evento": return "bg-primary/20 text-primary border-primary/30";
      case "prova": return "bg-warm/20 text-warm border-warm/30";
      case "recesso": return "bg-accent/20 text-accent border-accent/30";
      default: return "bg-muted";
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const upcomingEvents = events
    .filter(e => e.month >= currentMonth)
    .sort((a, b) => a.month === b.month ? a.date - b.date : a.month - b.month)
    .slice(0, 5);

  return (
    <section id="calendario" ref={ref} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6"
          >
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent tracking-wider">PLANEJE-SE</span>
          </motion.span>

          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
            CALENDÁRIO
            <br />
            <span className="text-gradient">ESCOLAR 2025</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Feriados, eventos e datas importantes para pais e alunos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="p-6 md:p-8 rounded-2xl card-glass">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(prev => prev > 0 ? prev - 1 : 11)}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </motion.button>

                <h3 className="font-display text-xl sm:text-3xl md:text-4xl text-foreground text-center leading-tight break-words">
                  {months[currentMonth]} <span className="text-primary">{currentYear}</span>
                </h3>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(prev => prev < 11 ? prev + 1 : 0)}
                  className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </motion.button>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-4">
                {["D", "S", "T", "Q", "Q", "S", "S"].map((day, i) => (
                  <div key={i} className="text-center text-[10px] md:text-xs text-muted-foreground font-medium py-2">
                    <span className="md:hidden">{day}</span>
                    <span className="hidden md:inline">{["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"][i]}</span>
                  </div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {emptyDays.map(i => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {days.map(day => {
                  const dayEvents = getEventsForDay(day);
                  const hasEvent = dayEvents.length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => hasEvent && setSelectedEvent(dayEvents[0])}
                      className={`aspect-square rounded-lg md:rounded-xl flex flex-col items-center justify-center relative transition-all active:scale-95 ${
                        hasEvent 
                          ? `${getEventColor(dayEvents[0].type)} border cursor-pointer` 
                          : 'bg-muted/30'
                      }`}
                    >
                      <span className={`font-display text-sm md:text-lg ${hasEvent ? '' : 'text-foreground'}`}>
                        {day}
                      </span>
                      {hasEvent && (
                        <div className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <span className="text-xs text-muted-foreground">Feriado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Evento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">Recesso</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="p-6 rounded-2xl card-glass h-full">
              <h4 className="font-display text-2xl text-foreground mb-6">PRÓXIMOS EVENTOS</h4>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={`${event.date}-${event.month}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className={`p-4 rounded-xl ${getEventColor(event.type)} border cursor-pointer transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0">
                        <event.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{event.title}</p>
                        <p className="text-xs opacity-70">
                          {event.date} de {months[event.month].toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 w-full mt-6 py-3 border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all"
              >
                VER CALENDÁRIO COMPLETO
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Event Detail Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md p-8 rounded-2xl card-glass border border-border"
              >
                <div className={`w-16 h-16 rounded-xl ${getEventColor(selectedEvent.type)} flex items-center justify-center mb-6`}>
                  <selectedEvent.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-foreground mb-2">{selectedEvent.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {selectedEvent.date} de {months[selectedEvent.month]} de {currentYear}
                </p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold btn-neon"
                >
                  FECHAR
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CalendarSection;
