import { useLocale } from "../i18n/LocaleContext";
import { profile } from "../data/profile";
import CoverImage from "../components/CoverImage";
import "./Hero.css";

export default function Hero() {
  const { t, tk } = useLocale();

  return (
    <header id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__intro reveal">
          <div className="hero__avatar">
            <CoverImage
              src={profile.avatar}
              alt={t(profile.name)}
              accent="#5e5ce6"
              label={t(profile.name).slice(0, 1)}
            />
          </div>
          <h1 className="hero__name">{t(profile.name)}</h1>
          <p className="hero__headline">{t(profile.headline)}</p>
        </div>

        {/* Pillars — the "how": Robotics · RL · Graphics */}
        <p className="hero__pillars reveal" style={{ animationDelay: "120ms" }}>
          {profile.pillars.map((p, i) => (
            <span key={p.label}>
              <span className="hero__pillar">{p.label}</span>
              {i < profile.pillars.length - 1 && " · "}
            </span>
          ))}
        </p>

        <p className="hero__desc reveal" style={{ animationDelay: "240ms" }}>
          {t(profile.intro)}
        </p>

        <div className="hero__cta reveal" style={{ animationDelay: "300ms" }}>
          <a href="#projects" className="btn btn--primary">
            {tk("hero_cta_projects")}
          </a>
          <a href="#contact" className="btn btn--ghost">
            {tk("hero_cta_contact")}
          </a>
        </div>
      </div>
    </header>
  );
}
