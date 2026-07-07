import { useEffect, useRef, useState } from "react";
import { initGrainProgram } from "../webgl/createGrainProgram";
import { paletteFor, type GrainPalette } from "../webgl/palette";
import GrainFallback from "./GrainFallback";
import "./GrainCanvas.css";

const GRAIN_STRENGTH = 0.05;
const GRAIN_SCALE = 2.5;
const LERP_SPEED = 0.05;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * WebGL-rendered ambient background: drifting color blobs + flickering
 * film grain, matching the reference look. Falls back to a CSS-only
 * version if WebGL is unavailable.
 */
export default function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cnv: HTMLCanvasElement = canvas;
    const prog = initGrainProgram(cnv);
    if (!prog) {
      setSupported(false);
      return;
    }
    const { gl, uniforms } = prog;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let current: GrainPalette = paletteFor(
      document.documentElement.getAttribute("data-theme")
    );
    let target: GrainPalette = current;

    const observer = new MutationObserver(() => {
      target = paletteFor(document.documentElement.getAttribute("data-theme"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (cnv.width !== w || cnv.height !== h) {
        cnv.width = w;
        cnv.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    window.addEventListener("resize", resize);
    resize();

    let raf = 0;
    let destroyed = false;
    const start = performance.now();

    function frame(now: number) {
      if (destroyed) return;
      // Wrapped in JS (double precision) so u_time never grows large enough
      // to hit float32 precision loss in the shader's trig-based noise.
      const t = reduceMotion ? 0 : ((now - start) / 1000) % 100000;

      current = {
        bg: [
          lerp(current.bg[0], target.bg[0], LERP_SPEED),
          lerp(current.bg[1], target.bg[1], LERP_SPEED),
          lerp(current.bg[2], target.bg[2], LERP_SPEED),
        ],
        blobA: [
          lerp(current.blobA[0], target.blobA[0], LERP_SPEED),
          lerp(current.blobA[1], target.blobA[1], LERP_SPEED),
          lerp(current.blobA[2], target.blobA[2], LERP_SPEED),
        ],
        blobB: [
          lerp(current.blobB[0], target.blobB[0], LERP_SPEED),
          lerp(current.blobB[1], target.blobB[1], LERP_SPEED),
          lerp(current.blobB[2], target.blobB[2], LERP_SPEED),
        ],
        blobC: [
          lerp(current.blobC[0], target.blobC[0], LERP_SPEED),
          lerp(current.blobC[1], target.blobC[1], LERP_SPEED),
          lerp(current.blobC[2], target.blobC[2], LERP_SPEED),
        ],
      };

      gl.uniform1f(uniforms.u_time, t);
      gl.uniform2f(uniforms.u_resolution, cnv.width, cnv.height);
      gl.uniform3fv(uniforms.u_bg, current.bg);
      gl.uniform3fv(uniforms.u_blobA, current.blobA);
      gl.uniform3fv(uniforms.u_blobB, current.blobB);
      gl.uniform3fv(uniforms.u_blobC, current.blobC);
      gl.uniform1f(uniforms.u_grain, GRAIN_STRENGTH);
      gl.uniform1f(uniforms.u_grainScale, GRAIN_SCALE);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  if (!supported) return <GrainFallback />;

  return <canvas ref={canvasRef} className="grain-canvas" aria-hidden="true" />;
}
