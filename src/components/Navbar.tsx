import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import { useTheme } from "../hooks/useTheme";
import { profile } from "../data/profile";
import "./Navbar.css";

const SECTIONS = [
  { id: "projects", key: "nav_projects" as const },
  { id: "cv", key: "nav_cv" as const },
  { id: "research", key: "nav_research" as const },
  { id: "contact", key: "nav_contact" as const },
];

export default function Navbar() {
  const { locale, setLocale, tk, t } = useLocale();
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page use hash anchors; elsewhere link back to the section.
  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <div className={`navwrap ${scrolled ? "navwrap--scrolled" : ""}`}>
      <nav className="nav glass glass--strong" aria-label="Primary">
        <Link to="/" className="nav__brand">
          {t(profile.name)}
        </Link>

        <div className="nav__links">
          {SECTIONS.map((s) => (
            <a key={s.id} href={href(s.id)} className="nav__link">
              {tk(s.key)}
            </a>
          ))}
        </div>

        <div className="nav__controls">
          <div className="seg" role="group" aria-label="Language">
            <button
              className={`seg__btn ${locale === "en" ? "is-active" : ""}`}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              className={`seg__btn ${locale === "ko" ? "is-active" : ""}`}
              onClick={() => setLocale("ko")}
              aria-pressed={locale === "ko"}
            >
              KO
            </button>
          </div>

          <button
            className="iconbtn"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
            title={theme === "dark" ? "Light" : "Dark"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </g>
    </svg>
  );
}
