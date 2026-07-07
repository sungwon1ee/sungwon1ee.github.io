export const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Renders 3 soft drifting color blobs over a base color, then perturbs the
 * result with chunky, flickering film grain. Mirrors the reference look:
 * a mostly-light wash with a saturated blue swoosh, a faint warm smudge,
 * and a softer blue pool, all under visible grain.
 */
export const FRAG_SRC = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_bg;
uniform vec3 u_blobA;
uniform vec3 u_blobB;
uniform vec3 u_blobC;
uniform float u_grain;
uniform float u_grainScale;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float blob(vec2 uv, vec2 center, vec2 radius, float rot, float aspect) {
  vec2 d = uv - center;
  d.x *= aspect;
  float c = cos(rot);
  float s = sin(rot);
  d = mat2(c, -s, s, c) * d;
  d /= radius;
  return smoothstep(1.0, 0.0, length(d));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  vec2 centerA = vec2(0.74, 0.78) + vec2(sin(t * 0.05), cos(t * 0.045)) * 0.035;
  vec2 centerB = vec2(0.30, 0.56) + vec2(cos(t * 0.045), sin(t * 0.05)) * 0.035;
  vec2 centerC = vec2(0.16, 0.22) + vec2(sin(t * 0.04), cos(t * 0.038)) * 0.03;

  float a = blob(uv, centerA, vec2(0.50, 0.30), -0.35 + sin(t * 0.03) * 0.08, aspect);
  float b = blob(uv, centerB, vec2(0.17, 0.15), 0.0, aspect);
  float c = blob(uv, centerC, vec2(0.24, 0.19), 0.25, aspect);

  vec3 color = u_bg;
  color = mix(color, u_blobC, c * 0.50);
  color = mix(color, u_blobB, b * 0.30);
  color = mix(color, u_blobA, a * 0.80);

  /* Keep both the frame counter and the pixel coordinate wrapped to small
     ranges before hashing. sin()'s precision degrades once its argument
     gets into the hundreds of thousands, which happens surprisingly fast
     once large screen coordinates and a growing time offset are summed —
     that's what caused the grain to fade out and periodically "come back"
     as gt cycled through better/worse precision zones. Wrapping both
     operands to small tiles keeps the hash argument reliably small on any
     screen size, for any session length. The repetition this introduces
     (every 64 frames / every 512px) is imperceptible in pure noise. */
  float gt = mod(floor(t * 10.0), 64.0);
  vec2 gp = mod(floor(gl_FragCoord.xy / u_grainScale), 512.0);
  float n = hash(gp + gt * 17.2341);
  color += (n - 0.5) * u_grain;

  gl_FragColor = vec4(color, 1.0);
}
`;
