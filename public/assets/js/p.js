const PARTICLES_ID = "particles-js";
const PARTICLES_STORAGE_KEY = "particlesEnabled";
const THEME_STORAGE_KEY = "selected-theme";
const PARTICLE_COLORS = {
  default: "#ffffff",
  "theme-light": "#0d0d0d",
  "theme-blue": "#7FDBFF",
  "theme-hacker": "#00ff44",
  "theme-amethyst": "#7a4988",
  "theme-amethyst": "#4b0150",
  "theme-sapphire": "#0a3d62",
  "theme-emerald": "#065c48",
  "theme-ruby": "#991b30",
  "theme-topaz": "#b29100",
  "theme-opal": "#2c5f63",
  "theme-midnight": "#ffffff", 
  "theme-storm": "#d0d0d0", 
  "theme-evergreen": "#d4e1d1", 
  "theme-nebula": "#f5f5f5", 
  "theme-volcanic": "#e4c9b3", 
  "theme-autumn": "#f7f0e1",
  "theme-jimmy": "#FFD700",
  "theme-jimmy": "#300410"
};

const loadParticles = (color = "#ffffff") => {
  if (!document.getElementById(PARTICLES_ID)) {
    const div = document.createElement("div");
    div.id = PARTICLES_ID;
    document.body.appendChild(div);
    Object.assign(div.style, {
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: "-1",
      top: "0",
      left: "0"
    });
  }

  particlesJS(PARTICLES_ID, {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: color },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 2, random: true },
      line_linked: {
        enable: false,
        distance: 150,
        color: color,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 100 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
};

const removeParticles = () => {
  const container = document.getElementById(PARTICLES_ID);
  if (container) container.remove();
};

const isParticlesEnabled = () =>
  localStorage.getItem(PARTICLES_STORAGE_KEY) !== "false";

const updateTheme = (theme) => {
  document.body.classList.remove("theme-light", "theme-blue");
  if (theme && theme !== "default") {
    document.body.classList.add(theme);
  }
};

const saveTheme = (theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateTheme(theme);
  removeParticles();
  if (isParticlesEnabled()) {
    const color = PARTICLE_COLORS[theme] || "#ffffff";
    loadParticles(color);
  }
};

const updateParticlesButton = () => {
  const btn = document.getElementById("toggle-particles");
  if (btn) {
    btn.textContent = isParticlesEnabled()
      ? "Disable Particles"
      : "Enable Particles";
  }
};

const toggleParticles = () => {
  const enabled = isParticlesEnabled();
  localStorage.setItem(PARTICLES_STORAGE_KEY, enabled ? "false" : "true");
  removeParticles();
  if (!enabled) {
    const theme = localStorage.getItem(THEME_STORAGE_KEY) || "default";
    const color = PARTICLE_COLORS[theme] || "#ffffff";
    loadParticles(color);
  }
  updateParticlesButton();
};

document.addEventListener("DOMContentLoaded", () => {
  
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "default";
  updateTheme(savedTheme);

  
  if (isParticlesEnabled()) {
    const color = PARTICLE_COLORS[savedTheme] || "#ffffff";
    loadParticles(color);
  }
  updateParticlesButton();


  const themeSelector = document.getElementById("theme-selector");
  if (themeSelector) {
    themeSelector.value = savedTheme;
    themeSelector.addEventListener("change", (e) => {
      saveTheme(e.target.value);
    });
  }


  const toggleBtn = document.getElementById("toggle-particles");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleParticles);
  }
});