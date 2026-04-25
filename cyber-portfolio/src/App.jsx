import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
{/* Layout */ }
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTopButton from "./components/layout/ScrollToTopButton";
import PageTransition from "./components/layout/PageTransition";
{/* Assistant */ }
import PortfolioAssistant from "./components/assistant/PortfolioAssistant";
{/* Cyber */ }
import MatrixBackground from "./components/cyber/MatrixBackground";
import CyberCursorGlow from "./components/cyber/CyberCursorGlow";
import CyberLogs from "./components/cyber/CyberLogs";
import HackerEasterEgg from "./components/cyber/HackerEasterEgg";
import CyberLoader from "./components/cyber/CyberLoader";
import CommandPalette from "./components/cyber/CommandPalette";
import FakeExploitModal from "./components/cyber/FakeExploitModal";
{/* Pages */ }
import Home from "./pages/Home";
import CV from "./pages/CV";
import Projects from "./pages/Projects";
import PurpleTeamLab from "./pages/PurpleTeamLab";
import SIEMLive from "./pages/SIEMLive";
import CVDownload from "./pages/CVDownload";
import Changelog from "./pages/Changelog";
import MiniLabIT from "./pages/MiniLabIT";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      {loading && <CyberLoader onFinish={() => setLoading(false)} />}
      <CyberCursorGlow />
      <MatrixBackground />
      <CyberLogs />
      <HackerEasterEgg />

      <div className="min-h-screen overflow-x-hidden bg-obsidian-950 text-ui-text transition-colors duration-300">
        <Navbar />
        <CommandPalette />
        <FakeExploitModal />

        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/cv"
                element={
                  <PageTransition>
                    <CV />
                  </PageTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <Projects />
                  </PageTransition>
                }
              />
              <Route
                path="/projects/purple-team-lab"
                element={
                  <PageTransition>
                    <PurpleTeamLab />
                  </PageTransition>
                }
              />
              <Route
                path="/siem-live"
                element={
                  <PageTransition>
                    <SIEMLive />
                  </PageTransition>
                }
              />
              <Route
                path="/download-cv"
                element={
                  <PageTransition>
                    <CVDownload />
                  </PageTransition>
                }
              />
              <Route
                path="/changelog"
                element={
                  <PageTransition>
                    <Changelog />
                  </PageTransition>
                }
              />
              <Route
                path="/minilabit"
                element={
                  <PageTransition>
                    <MiniLabIT />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <ScrollToTopButton />
        <PortfolioAssistant />
      </div>
    </>
  );
}