import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProject } from "../data/projects";
import { useLocale } from "../i18n/LocaleContext";
import type { UIKey } from "../i18n/ui";
import CoverImage from "../components/CoverImage";
import DemoCard from "../components/DemoCard";
import GlassCard from "../components/GlassCard";
import "./ProjectDetail.css";

const KIND_KEY: Record<string, UIKey> = {
  app: "kind_app",
  channel: "kind_channel",
  web: "kind_web",
  research: "kind_research",
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { t, tk } = useLocale();
  const project = id ? getProject(id) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <main className="detail">
        <div className="container detail__missing">
          <p>{tk("detail_not_found")}</p>
          <Link to="/" className="btn btn--ghost">
            {tk("detail_back")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="detail"
      style={{ "--proj-accent": project.accent ?? "var(--accent)" } as React.CSSProperties}
    >
      <div className="container">
        <Link to="/#projects" className="detail__back">
          <span aria-hidden="true">←</span> {tk("detail_back")}
        </Link>

        <div className="detail__hero">
          <div className="detail__cover">
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
          </div>

          <div className="detail__intro">
            <span className="chip detail__kind">{tk(KIND_KEY[project.kind])}</span>
            <h1 className="detail__title">{project.title}</h1>
            <p className="detail__tagline">{t(project.tagline)}</p>
            <div className="detail__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="detail__grid">
          <section className="detail__overview">
            <h2 className="detail__h2">{tk("detail_overview")}</h2>
            <p className="detail__body">{t(project.description)}</p>
          </section>

          <GlassCard className="detail__meta">
            <MetaRow label={tk("detail_year")} value={project.year} />
            {project.status && (
              <MetaRow label={tk("detail_status")} value={t(project.status)} />
            )}
            {project.role && (
              <MetaRow label={tk("detail_role")} value={t(project.role)} />
            )}
            {project.links && project.links.length > 0 && (
              <div className="metarow">
                <span className="metarow__label">{tk("detail_links")}</span>
                <div className="metarow__links">
                  {project.links.map((l) => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {project.demos && project.demos.length > 0 && (
          <section className="detail__gallery">
            <h2 className="detail__h2">{tk("detail_demos")}</h2>
            <div className="detail__demos">
              {project.demos.map((demo) => (
                <DemoCard
                  key={demo.video}
                  image={demo.image}
                  video={demo.video}
                  caption={demo.caption}
                  accent={project.accent}
                />
              ))}
            </div>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="detail__gallery">
            <h2 className="detail__h2">{tk("detail_gallery")}</h2>
            <div className="detail__shots">
              {project.gallery.map((src, i) => (
                <div key={src} className="detail__shot glass">
                  <CoverImage
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    accent={project.accent}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="metarow">
      <span className="metarow__label">{label}</span>
      <span className="metarow__value">{value}</span>
    </div>
  );
}
