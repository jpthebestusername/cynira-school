import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import StudentArea from "@/components/StudentArea";
import CalendarSection from "@/components/CalendarSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <StudentArea />
        <CalendarSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
