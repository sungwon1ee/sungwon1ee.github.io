import Section from "../components/Section";
import GlassCard from "../components/GlassCard";
import { useLocale } from "../i18n/LocaleContext";
import { awards, education, experience, skills, type TimelineItem } from "../data/cv";
import "./CV.css";

function Timeline({ items }: { items: TimelineItem[] }) {
  const { t } = useLocale();
  return (
    <ol className="timeline">
      {items.map((it, i) => (
        <li key={i} className="timeline__item">
          <span className="timeline__period">{it.period}</span>
          <div className="timeline__body">
            <h4 className="timeline__title">{t(it.title)}</h4>
            <span className="timeline__org">{t(it.org)}</span>
            {it.detail && <p className="timeline__detail">{t(it.detail)}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function CV() {
  const { t, tk } = useLocale();

  return (
    <Section id="cv" eyebrow={tk("cv_eyebrow")} title={tk("cv_title")}>
      <div className="cv__grid">
        <GlassCard className="cv__block">
          <h3 className="cv__blocktitle">{tk("cv_experience")}</h3>
          <Timeline items={experience} />
        </GlassCard>

        <GlassCard className="cv__block">
          <h3 className="cv__blocktitle">{tk("cv_education")}</h3>
          <Timeline items={education} />
        </GlassCard>

        <GlassCard className="cv__block cv__block--wide">
          <h3 className="cv__blocktitle">{tk("cv_skills")}</h3>
          <div className="cv__skills">
            {skills.map((group) => (
              <div key={group.label.en} className="skillgroup">
                <span className="skillgroup__label">{t(group.label)}</span>
                <div className="skillgroup__items">
                  {group.items.map((s) => {
                    const label = typeof s === "string" ? s : t(s);
                    return (
                      <span key={label} className="chip">
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="cv__block cv__block--wide cv__block--compact">
          <h4 className="cv__blocktitle cv__blocktitle--sub">{tk("cv_awards")}</h4>
          <ul className="awardlist">
            {awards.map((a, i) => (
              <li key={i} className="awardlist__item">
                <span className="awardlist__period">{a.period}</span>
                <span className="awardlist__title">{t(a.title)}</span>
                <span className="awardlist__org">{t(a.org)}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </Section>
  );
}
