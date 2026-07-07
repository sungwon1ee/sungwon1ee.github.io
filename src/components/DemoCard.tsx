import { useState } from "react";
import type { Localized } from "../i18n/types";
import { useLocale } from "../i18n/LocaleContext";
import "./DemoCard.css";

type Props = {
  image: string;
  video: string;
  caption?: Localized;
  accent?: string;
};

/**
 * Poster image that swaps for a playable clip on click.
 * Keeps large .mov files out of the initial page load.
 */
export default function DemoCard({ image, video, caption, accent }: Props) {
  const [playing, setPlaying] = useState(false);
  const { t } = useLocale();
  const label = caption ? t(caption) : undefined;

  return (
    <div
      className="demo-card glass"
      style={{ "--demo-accent": accent ?? "var(--accent)" } as React.CSSProperties}
    >
      {playing ? (
        <video
          className="demo-card__video"
          src={video}
          poster={image}
          controls
          autoPlay
          playsInline
          loop
        />
      ) : (
        <button
          type="button"
          className="demo-card__poster"
          onClick={() => setPlaying(true)}
          aria-label={label ? `${label} — play` : "Play video"}
        >
          <img src={image} alt={label ?? ""} loading="lazy" />
          <span className="demo-card__play" aria-hidden="true">
            ▶
          </span>
        </button>
      )}
      {label && <span className="demo-card__caption">{label}</span>}
    </div>
  );
}
