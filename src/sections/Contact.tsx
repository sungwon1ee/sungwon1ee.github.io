import GlassCard from "../components/GlassCard";
import SocialIcon from "../components/SocialIcon";
import { useLocale } from "../i18n/LocaleContext";
import { profile } from "../data/profile";
import "./Contact.css";

export default function Contact() {
  const { t, tk } = useLocale();

  return (
    <section id="contact" className="section">
      <div className="container">
        <GlassCard strong className="contact">
          <span className="eyebrow">{tk("nav_contact")}</span>
          <div className="contact__actions">
            <a href={`mailto:${profile.email}`} className="btn btn--primary">
              {profile.email}
            </a>
            <div className="contact__icons">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__social"
                  aria-label={s.label}
                  title={s.label}
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>
          <span className="contact__loc">{t(profile.location)}</span>
        </GlassCard>
      </div>
    </section>
  );
}
