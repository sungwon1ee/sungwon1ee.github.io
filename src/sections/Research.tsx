import Section from "../components/Section";
import GlassCard from "../components/GlassCard";
import { useLocale } from "../i18n/LocaleContext";
import { research } from "../data/research";
import "./Research.css";

export default function Research() {
  const { t, tk } = useLocale();

  return (
    <Section id="research" eyebrow={tk("research_eyebrow")} title={tk("research_title")}>
      <div className="rlist">
        {research.map((item) => {
          const inner = (
            <>
              <div className="ritem__head">
                <h3 className="ritem__title">{t(item.title)}</h3>
                <span className="ritem__period">{item.period}</span>
              </div>
              <p className="ritem__summary">{t(item.summary)}</p>
              <div className="ritem__tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          );

          return item.link ? (
            <GlassCard
              key={item.id}
              as="a"
              href={item.link}
              target="_blank"
              rel="noreferrer"
              interactive
              className="ritem"
            >
              {inner}
            </GlassCard>
          ) : (
            <GlassCard key={item.id} className="ritem">
              {inner}
            </GlassCard>
          );
        })}
      </div>
    </Section>
  );
}
