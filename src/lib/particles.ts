export const getStarsConfig = (particleCount = 500): any => ({
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ffffff", "#06b6d4", "#7c3aed"] },
    links: { enable: false },
    move: {
      enable: true,
      direction: "none",
      outModes: { default: "out" },
      random: true,
      speed: 0.2,
      straight: false,
    },
    number: { density: { enable: true, area: 800 }, value: particleCount },
    opacity: {
      animation: { enable: true, speed: 1, sync: false },
      value: { min: 0.1, max: 0.8 },
    },
    shape: { type: "circle" },
    size: { value: { min: 0.5, max: 2 } },
  },
  detectRetina: true,
});
