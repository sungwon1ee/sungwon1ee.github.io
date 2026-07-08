import { useLocale } from "../i18n/LocaleContext";
import { profile } from "../data/profile";
import "./Hero.css";

export default function Hero() {
  const { t, tk } = useLocale();

  return (
    <header id="top" className="hero">
      <div className="container hero__grid">
        <div className="hero__main reveal">
          <h1 className="hero__name">{t(profile.name)}</h1>
          <p className="hero__headline">{t(profile.headline)}</p>

          <div className="hero__desc">
            <p>{t(profile.goal)}.</p>
            <p>{t(profile.intro)}</p>
          </div>
        </div>

        {/* Pillars — explicitly framed as the "how" behind the goal above */}
        <div className="hero__pillars-block reveal" style={{ animationDelay: "140ms" }}>
          <span className="eyebrow">{tk("hero_pillars_eyebrow")}</span>
          <ul className="hero__pillars">
            {profile.pillars.map((p, i) => (
              <li key={p.label} className="hero__pillar">
                <span className="hero__pillar-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="hero__pillar-label">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__cta reveal" style={{ animationDelay: "260ms" }}>
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
