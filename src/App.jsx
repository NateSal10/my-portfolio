import { useState, useEffect } from "react";
import { motion as Motion, useScroll, AnimatePresence } from "framer-motion";

import { NAV_ITEMS, PROJECTS } from "./data/portfolioData";
import { ROLES } from "./data/roles";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectPage from "./components/ProjectPage";
import BackToTop from "./components/ui/BackToTop";
import Marquee from "./components/ui/Marquee";

function Home({ scrollTo, activeSection, darkMode, toggleDark, mobileMenuOpen, setMobileMenuOpen, openProject }) {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen">
      <Motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-accent-500 z-[100]"
      />
      <BackToTop />
      <Nav
        activeSection={activeSection}
        scrollTo={scrollTo}
        darkMode={darkMode}
        toggleDark={toggleDark}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero scrollTo={scrollTo} />
      <Marquee items={ROLES} />
      <About />
      <Projects onOpen={openProject} />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [currentPage, setCurrentPage] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("dm");
    return stored !== null ? stored === "true" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDark = () =>
    setDarkMode(d => {
      localStorage.setItem("dm", String(!d));
      return !d;
    });

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => n.toLowerCase());
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const project = currentPage ? PROJECTS.find(p => p.id === currentPage) : null;

  return (
    <div className="font-sans">
      <div className="grain" />
      <AnimatePresence mode="wait">
        {project ? (
          <Motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ProjectPage
              project={project}
              onOpen={setCurrentPage}
              onBack={() => {
                setCurrentPage(null);
                setTimeout(() => scrollTo("projects"), 100);
              }}
            />
          </Motion.div>
        ) : (
          <Motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Home
              scrollTo={scrollTo}
              activeSection={activeSection}
              darkMode={darkMode}
              toggleDark={toggleDark}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              openProject={setCurrentPage}
            />
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
