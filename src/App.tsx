import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GrainCanvas from "./components/GrainCanvas";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

/** Scrolls to a #hash target after navigating between routes. */
function HashScroll() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) {
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }, [hash, pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <GrainCanvas />
      <Navbar />
      <HashScroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </>
  );
}
