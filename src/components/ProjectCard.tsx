import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import { useLocale } from "../i18n/LocaleContext";
import type { UIKey } from "../i18n/ui";
import CoverImage from "./CoverImage";
import "./ProjectCard.css";

const KIND_KEY: Record<Project["kind"], UIKey> = {
  app: "kind_app",
  channel: "kind_channel",
  web: "kind_web",
  research: "kind_research",
};

export default function ProjectCard({ project }: { project: Project }) {
  const { t, tk } = useLocale();

  return (
    <Link
      to={`/projects/${project.id}`}
      className="pcard glass glass--interactive"
      aria-label={project.title}
    >
      <div className="pcard__media">
        {project.coverVideo ? (
          <video
            className="cover"
            src={project.coverVideo}
            poster={project.cover}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <CoverImage
            src={project.cover}
            alt={project.title}
            accent={project.accent}
            label={project.title}
          />
        )}
        <span className="pcard__kind chip">{tk(KIND_KEY[project.kind])}</span>
      </div>

      <div className="pcard__body">
        <div className="pcard__titlerow">
          <h3 className="pcard__title">{project.title}</h3>
          {project.status && (
            <span className="pcard__status">{t(project.status)}</span>
          )}
        </div>
        <p className="pcard__tagline">{t(project.tagline)}</p>
        <div className="pcard__tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
