export const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

/**
 * Renders 3 soft color blobs over a base color, with organic ink-like
 * edges that slowly warp and drift, then perturbs the result with chunky,
 * flickering film grain.
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

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

/* Three octaves of drifting value noise — advected over time so the warp
   field itself flows, like currents inside spreading ink. */
float fbm(vec2 p, vec2 flow) {
  float v = 0.0;
  float amp = 0.6;
  vec2 q = p + flow;
  for (int i = 0; i < 3; i++) {
    v += amp * noise(q);
    q = q * 2.05 + flow * 0.6;
    amp *= 0.52;
  }
  return v;
}

float blob(vec2 uv, vec2 center, vec2 radius, float rot, float aspect, float t, float seed) {
  vec2 d = uv - center;
  d.x *= aspect;
  float c = cos(rot);
  float s = sin(rot);
  d = mat2(c, -s, s, c) * d;

  /* Organic edge: warp the sampling point with flowing noise before
     measuring distance, so the boundary billows and spreads unevenly
     instead of tracing a clean ellipse. */
  vec2 flow = vec2(t * 0.11, -t * 0.09);
  float warp = fbm(uv * 2.1 + seed, flow) - 0.5;
  d += warp * 0.42;

  d /= radius;
  return smoothstep(1.0, 0.0, length(d));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float aspect = u_resolution.x / u_resolution.y;
  float t = u_time;

  /* Three separate anchor zones (top-right, left-middle, bottom-center) so
     the canvas reads as several distinct drifting masses instead of one
     dominant blob with two washes hiding underneath it. */
  vec2 centerA = vec2(0.78, 0.84) + vec2(sin(t * 0.28), cos(t * 0.24)) * 0.13;
  vec2 centerB = vec2(0.55, 0.12) + vec2(cos(t * 0.24), sin(t * 0.27)) * 0.13;
  vec2 centerC = vec2(0.15, 0.52) + vec2(sin(t * 0.21), cos(t * 0.22)) * 0.13;

  /* Blue (A) is the lead mass — bigger and more spread than B/C, with a
     wider pulse so it visibly billows in and out like spreading ink. */
  float radA = 0.48 + sin(t * 0.18) * 0.08;
  float radB = 0.24 + cos(t * 0.16) * 0.035;
  float radC = 0.32 + sin(t * 0.15) * 0.04;

  float a = blob(uv, centerA, vec2(radA, radA * 0.62), -0.35 + sin(t * 0.13) * 0.35, aspect, t, 3.1);
  float b = blob(uv, centerB, vec2(radB, radB * 0.85), sin(t * 0.11) * 0.4, aspect, t, 7.7);
  float c = blob(uv, centerC, vec2(radC, radC * 0.8), 0.25 + cos(t * 0.12) * 0.3, aspect, t, 13.3);

  vec3 color = u_bg;
  color = mix(color, u_blobC, c * 0.70);
  color = mix(color, u_blobB, b * 0.48);
  color = mix(color, u_blobA, a * 0.78);

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
