import { useLocale } from "../i18n/LocaleContext";
import { profile } from "../data/profile";
import "./Footer.css";

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__name">
          © {year} {t(profile.name)}
        </span>
        <div className="footer__links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
        <span className="footer__note">Built with this site · always growing</span>
      </div>
    </footer>
  );
}
