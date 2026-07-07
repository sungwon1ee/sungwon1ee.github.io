import { useState } from "react";
import "./CoverImage.css";

type Props = {
  src?: string;
  alt: string;
  /** Fallback gradient accent when the image is missing. */
  accent?: string;
  /** Short label drawn on the placeholder (usually the title). */
  label?: string;
  className?: string;
};

/**
 * Renders a photo, or a clean gradient placeholder when the file is
 * absent/failing — so the layout stays intact before real photos are added.
 */
export default function CoverImage({
  src,
  alt,
  accent = "#0a84ff",
  label,
  className,
}: Props) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        className={`cover cover--placeholder ${className ?? ""}`}
        style={
          {
            "--cover-accent": accent,
          } as React.CSSProperties
        }
        role="img"
        aria-label={alt}
      >
        {label && <span className="cover__label">{label}</span>}
      </div>
    );
  }

  return (
    <img
      className={`cover ${className ?? ""}`}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
