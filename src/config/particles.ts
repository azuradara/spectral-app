const particleConfig = {
  fps_limit: 60,
  particles: {
    collisions: {
      enable: false,
    },
    number: {
      value: 200,
      density: {
        enable: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 30,
      opacity: 0.3,
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
  polygon: {
    enable: true,
    scale: 0.5,
    type: 'inline',
    move: {
      radius: 10,
    },
    url: 'https://gist.githubusercontent.com/azuradara/a7b6a125959b71c91730ed359de3c2ac/raw/f2245a4f75ee6a82b08de86f6f7c34380d3d3158/moon.svg',
    inline: {
      arrangement: 'equidistant',
    },
    draw: {
      enable: true,
      stroke: {
        color: 'rgba(255, 255, 255, .2)',
      },
    },
  },
  retina_detect: false,
};

export default particleConfig;
