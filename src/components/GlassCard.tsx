import type { ElementType, ReactNode } from "react";
import "./GlassCard.css";

type Props = {
  children: ReactNode;
  /** Render as a different element (e.g. "article", Link). */
  as?: ElementType;
  /** Stronger, more opaque surface (used for nav / floating chrome). */
  strong?: boolean;
  /** Adds hover lift — for interactive cards. */
  interactive?: boolean;
  className?: string;
  [key: string]: unknown;
};

/** The one reusable Apple-glass surface. Everything glassy uses this. */
export default function GlassCard({
  children,
  as: Tag = "div",
  strong = false,
  interactive = false,
  className = "",
  ...rest
}: Props) {
  const cls = [
    "glass",
    strong ? "glass--strong" : "",
    interactive ? "glass--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
