import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import CV from "../sections/CV";
import Research from "../sections/Research";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <CV />
      <Research />
      <Contact />
    </main>
  );
}
