import type { JSX } from "react";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import AboutSection from "./components/sections/AboutSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import TerminalSection from "./components/sections/TerminalSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import CertificationsSection, {
  AchievementsSection,
} from "./components/sections/CertificationsSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";

export function App(): JSX.Element {
  return (
    <div className="min-h-dvh">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-base"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <TerminalSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
