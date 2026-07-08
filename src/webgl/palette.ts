export type Vec3 = [number, number, number];

export type GrainPalette = {
  bg: Vec3;
  blobA: Vec3;
  blobB: Vec3;
  blobC: Vec3;
};

function hexToVec3(hex: string): Vec3 {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export const PALETTE_LIGHT: GrainPalette = {
  bg: hexToVec3("#f4f5f7"),
  blobA: hexToVec3("#3d8fd6"),
  blobB: hexToVec3("#edd6a0"),
  blobC: hexToVec3("#8fb8e6"),
};

export const PALETTE_DARK: GrainPalette = {
  bg: hexToVec3("#0a0a0c"),
  blobA: hexToVec3("#2f6fb0"),
  blobB: hexToVec3("#5f4f68"),
  blobC: hexToVec3("#3d5586"),
};

export function paletteFor(theme: string | null): GrainPalette {
  return theme === "dark" ? PALETTE_DARK : PALETTE_LIGHT;
}
