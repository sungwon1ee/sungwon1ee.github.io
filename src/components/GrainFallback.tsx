import "./GrainFallback.css";

/**
 * Full-viewport ambient backdrop: slowly drifting color blobs + a static
 * film-grain texture on top, so the color wash reads as alive without
 * looking like a flat gradient.
 */
export default function GrainFallback() {
  return (
    <div className="grainbg" aria-hidden="true">
      <div className="grainbg__blob grainbg__blob--a" />
      <div className="grainbg__blob grainbg__blob--b" />
      <div className="grainbg__blob grainbg__blob--c" />
      <div className="grainbg__noise" />
    </div>
  );
}
