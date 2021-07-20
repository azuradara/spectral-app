const particleConfig = {
  fps_limit: 60,
  particles: {
    collisions: {
      enable: false,
    },
    number: {
      value: 200,
      density: {
        enable: true,
      },
    },
    line_linked: {
      enable: true,
      distance: 65,
      opacity: 0.1,
    },
    move: {
      speed: 0.3,
    },
    opacity: {
      random: true,
      anim: {
        enable: true,
        opacity_min: 0.05,
        speed: 1,
        sync: false,
      },
      value: 0.4,
    },
    size: {
      value: 2,
    },
  },
  retina_detect: false,
};

export default particleConfig;
