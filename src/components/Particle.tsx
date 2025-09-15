import React from "react";
import Particles from "react-tsparticles";

function Particle(): React.JSX.Element {
  const particlesInit = async (engine: any) => {
    console.log(engine);
  };

  const particlesLoaded = async (container: any) => {
    console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        particles: {
          number: {
            value: 120,
            density: {
              enable: true,
              area: 1500,
            },
          },
          color: {
            value: ["#ffffff", "#c770f0", "#be50f4", "#a0a0a0", "#ffd700"],
          },
          shape: {
            type: "star",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.8,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: { min: 1, max: 4 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            bubble: {
              distance: 300,
              size: 8,
              duration: 2,
              opacity: 0.8,
            },
            push: {
              particles_nb: 6,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;