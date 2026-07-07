import { FRAG_SRC, VERT_SRC } from "./shaders";

export type GrainProgram = {
  gl: WebGLRenderingContext;
  uniforms: {
    u_resolution: WebGLUniformLocation;
    u_time: WebGLUniformLocation;
    u_bg: WebGLUniformLocation;
    u_blobA: WebGLUniformLocation;
    u_blobB: WebGLUniformLocation;
    u_blobC: WebGLUniformLocation;
    u_grain: WebGLUniformLocation;
    u_grainScale: WebGLUniformLocation;
  };
};

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

/** Compiles the grain shader program on the given canvas. Returns null if WebGL is unavailable. */
export function initGrainProgram(canvas: HTMLCanvasElement): GrainProgram | null {
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  }) as WebGLRenderingContext | null;
  if (!gl) return null;

  let program: WebGLProgram;
  try {
    const vert = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    const prog = gl.createProgram();
    if (!prog) throw new Error("Failed to create program");
    program = prog;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed");
    }
  } catch (err) {
    console.error(err);
    return null;
  }

  gl.useProgram(program);

  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const loc = (name: string): WebGLUniformLocation => {
    const l = gl.getUniformLocation(program, name);
    if (!l) throw new Error(`Missing uniform ${name}`);
    return l;
  };

  return {
    gl,
    uniforms: {
      u_resolution: loc("u_resolution"),
      u_time: loc("u_time"),
      u_bg: loc("u_bg"),
      u_blobA: loc("u_blobA"),
      u_blobB: loc("u_blobB"),
      u_blobC: loc("u_blobC"),
      u_grain: loc("u_grain"),
      u_grainScale: loc("u_grainScale"),
    },
  };
}
