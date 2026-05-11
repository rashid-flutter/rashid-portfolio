import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { scheduleScrollToSection } from "./utils/sectionScroll";

const Footer = () => (
  <footer>
    <center>
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
      <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
        © {new Date().getFullYear()}{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          RASHID™
        </a>
        . All Rights Reserved.
      </span>
    </center>
  </footer>
);

const routeSections = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/contact": "Contact",
};

const LandingPage = ({ showWelcome, setShowWelcome, sectionId, scrollSignal }) => {
  const shouldShowWelcome = showWelcome && sectionId === "Home";

  useEffect(() => {
    if (shouldShowWelcome) return;
    if (scrollSignal === "scroll-spy") return;

    return scheduleScrollToSection(sectionId, {
      firstBehavior: sectionId === "Home" ? "auto" : "smooth",
    });
  }, [sectionId, shouldShowWelcome, scrollSignal]);

  useEffect(() => {
    if (shouldShowWelcome) return;

    AOS.init({
      once: false,
      duration: 850,
      easing: "ease-out-cubic",
      offset: 80,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    const refreshTimer = window.setTimeout(() => {
      AOS.refreshHard();
    }, 350);

    return () => window.clearTimeout(refreshTimer);
  }, [shouldShowWelcome]);

  return (
    <>
      <AnimatePresence mode="wait">
        {shouldShowWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!shouldShowWelcome && (
        <motion.div
          className="relative min-h-[100svh]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navbar />
          <AnimatedBackground />
          <main className="relative z-10">
            <Home />
            <About />
            <Portofolio />
            <ContactPage />
            <Footer />
          </main>
        </motion.div>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const location = useLocation();
  const sectionId = location.state?.scrollTo || routeSections[location.pathname] || "Home";
  const scrollSignal = location.state?.fromScrollSpy
    ? "scroll-spy"
    : `${location.key}-${location.state?.scrollTick || ""}`;

  useEffect(() => {
    // Automatically hide Welcome Screen after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} sectionId={sectionId} scrollSignal={scrollSignal} />}
      />
      <Route
        path="/about"
        element={<LandingPage showWelcome={false} setShowWelcome={setShowWelcome} sectionId={sectionId} scrollSignal={scrollSignal} />}
      />
      <Route
        path="/projects"
        element={<LandingPage showWelcome={false} setShowWelcome={setShowWelcome} sectionId={sectionId} scrollSignal={scrollSignal} />}
      />
      <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
      <Route
        path="/contact"
        element={<LandingPage showWelcome={false} setShowWelcome={setShowWelcome} sectionId={sectionId} scrollSignal={scrollSignal} />}
      />
      <Route path="/project/:id" element={<ProjectPageLayout />} />
    </Routes>
  );
}

export default App;
