import type { ReactNode } from "react";
import "./Section.css";

type Props = {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

/** Section wrapper with a scroll anchor and a consistent header. */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section id={id} className="section">
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <header className="section__head">
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            {title && <h2 className="section__title">{title}</h2>}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
