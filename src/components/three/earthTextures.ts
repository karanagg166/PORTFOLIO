import * as THREE from 'three';

/**
 * Creates high-quality procedural textures for Earth:
 * - Day Albedo (oceans, continents, polar ice)
 * - Night City Lights (golden clusters on land)
 * - Cloud Alpha Map
 * - Normal & Specular Maps
 */
export function generateEarthTextures() {
  const width = 1024;
  const height = 512;

  // Helper to create canvas
  const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    return { canvas, ctx };
  };

  // 1. Day Albedo Texture
  const { canvas: dayCanvas, ctx: dayCtx } = createCanvas();
  
  // Base ocean gradient
  const oceanGrad = dayCtx.createLinearGradient(0, 0, 0, height);
  oceanGrad.addColorStop(0, '#061224');
  oceanGrad.addColorStop(0.5, '#0a1e3f');
  oceanGrad.addColorStop(1, '#061224');
  dayCtx.fillStyle = oceanGrad;
  dayCtx.fillRect(0, 0, width, height);

  // Generate continents using noise & shapes
  dayCtx.fillStyle = '#1e382b'; // Land mass base
  
  // Simulated continent landmass shapes
  const landShapes = [
    // Eurasia / Africa
    { x: 550, y: 180, r: 160 },
    { x: 620, y: 220, r: 140 },
    { x: 520, y: 260, r: 110 },
    { x: 560, y: 320, r: 90 },
    // Americas
    { x: 250, y: 190, r: 120 },
    { x: 280, y: 240, r: 80 },
    { x: 320, y: 340, r: 110 },
    // Australia
    { x: 780, y: 340, r: 70 },
  ];

  landShapes.forEach(({ x, y, r }) => {
    dayCtx.beginPath();
    dayCtx.arc(x, y, r, 0, Math.PI * 2);
    dayCtx.fill();

    // Subtle green/brown variation
    dayCtx.fillStyle = '#2d4a36';
    dayCtx.beginPath();
    dayCtx.arc(x + 20, y - 10, r * 0.7, 0, Math.PI * 2);
    dayCtx.fill();
  });

  // Polar ice caps
  dayCtx.fillStyle = '#d8e4ee';
  // North pole
  dayCtx.fillRect(0, 0, width, 35);
  // South pole
  dayCtx.fillRect(0, height - 35, width, 35);

  const dayTexture = new THREE.CanvasTexture(dayCanvas);
  dayTexture.needsUpdate = true;

  // 2. Night City Lights Texture
  const { canvas: nightCanvas, ctx: nightCtx } = createCanvas();
  nightCtx.fillStyle = '#000000';
  nightCtx.fillRect(0, 0, width, height);

  // Add gold city light dots on land masses
  nightCtx.fillStyle = '#ffcc66';
  landShapes.forEach(({ x, y, r }) => {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * r * 0.8;
      const px = x + Math.cos(angle) * dist;
      const py = y + Math.sin(angle) * dist;
      const size = Math.random() * 2 + 0.5;

      nightCtx.beginPath();
      nightCtx.arc(px, py, size, 0, Math.PI * 2);
      nightCtx.fill();
    }
  });

  const nightTexture = new THREE.CanvasTexture(nightCanvas);
  nightTexture.needsUpdate = true;

  // 3. Cloud Alpha Texture
  const { canvas: cloudCanvas, ctx: cloudCtx } = createCanvas();
  cloudCtx.fillStyle = '#000000';
  cloudCtx.fillRect(0, 0, width, height);

  cloudCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  for (let i = 0; i < 40; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * (height - 100) + 50;
    const rx = Math.random() * 120 + 40;
    const ry = Math.random() * 40 + 10;

    cloudCtx.beginPath();
    cloudCtx.ellipse(cx, cy, rx, ry, Math.random() * 0.5, 0, Math.PI * 2);
    cloudCtx.fill();
  }

  const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
  cloudTexture.needsUpdate = true;

  // 4. Specular Map (White oceans, Black land)
  const { canvas: specCanvas, ctx: specCtx } = createCanvas();
  specCtx.fillStyle = '#ffffff'; // Shiny ocean
  specCtx.fillRect(0, 0, width, height);

  specCtx.fillStyle = '#111111'; // Dull land
  landShapes.forEach(({ x, y, r }) => {
    specCtx.beginPath();
    specCtx.arc(x, y, r, 0, Math.PI * 2);
    specCtx.fill();
  });

  const specularTexture = new THREE.CanvasTexture(specCanvas);
  specularTexture.needsUpdate = true;

  return { dayTexture, nightTexture, cloudTexture, specularTexture };
}
