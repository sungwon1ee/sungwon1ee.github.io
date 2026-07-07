import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { useLocale } from "../i18n/LocaleContext";
import "./Projects.css";

export default function Projects() {
  const { tk } = useLocale();

  return (
    <Section id="projects" eyebrow={tk("projects_eyebrow")} title={tk("projects_title")}>
      <div className="pgrid">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}
