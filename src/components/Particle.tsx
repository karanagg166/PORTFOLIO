import React from "react";
import Particles from "react-tsparticles";

function Particle(): React.JSX.Element {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              area: 2000,
            },
          },
          color: {
            value: [
              "#ffffff", // Bright white stars
              "#00d4ff", // Blue stars
              "#8b5cf6", // Purple stars
              "#ff6b6b", // Red giants
              "#ffd700", // Yellow stars
              "#ff8c00", // Orange stars
              "#a0a0a0", // Dim stars
              "#4a90e2", // Blue-white stars
              "#ff69b4", // Pink stars
              "#32cd32", // Green stars (rare)
              "#ff4757", // Mars-like planets
              "#3742fa", // Neptune-like planets
              "#2ed573", // Earth-like planets
              "#ffa502", // Jupiter-like planets
              "#5f27cd", // Purple planets
            ],
          },
          shape: {
            type: ["circle", "star", "triangle", "polygon"],
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 6,
            },
          },
          opacity: {
            value: { min: 0.1, max: 1 },
            random: true,
            anim: {
              enable: true,
              speed: 0.8,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 0.5, max: 10 },
            random: true,
            anim: {
              enable: true,
              speed: 1.5,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 250,
            color: "#00d4ff",
            opacity: 0.15,
            width: 0.8,
          },
          move: {
            enable: true,
            speed: { min: 0.1, max: 1.2 },
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.08,
              opacity: 1,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: ["bubble", "grab"],
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              size: 15,
              duration: 2.5,
              opacity: 0.8,
            },
            grab: {
              distance: 300,
              line_linked: {
                opacity: 0.6,
              },
            },
            push: {
              particles_nb: 10,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
      }}
    />
  );
}

export default Particle;