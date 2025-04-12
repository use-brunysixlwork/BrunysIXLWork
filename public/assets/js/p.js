const PARTICLES_ID = "particles-js";
    const PARTICLES_STORAGE_KEY = "particlesEnabled";

    const PARTICLE_COLORS = {
      default: "#ffffff",
      "theme-light": "#0d0d0d",
      "theme-blue": "#7FDBFF",
      "theme-hacker": "#00ff44"
    };

    const loadParticles = (color = "#ffffff") => {
      if (!document.getElementById(PARTICLES_ID)) {
        const div = document.createElement("div");
        div.id = PARTICLES_ID;
        document.body.appendChild(div);
        div.style.position = "fixed";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.zIndex = "-1";
        div.style.top = "0";
        div.style.left = "0";
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
      const canvas = document.querySelector(`#${PARTICLES_ID} canvas`);
      if (canvas) canvas.remove();
    };

    const isParticlesEnabled = () =>
      localStorage.getItem(PARTICLES_STORAGE_KEY) !== "false";

    const updateButton = () => {
      const button = document.getElementById("toggle-particles");
      if (button) {
        button.textContent = isParticlesEnabled()
          ? "Disable Particles"
          : "Enable Particles";
      }
    };

    const toggleParticles = () => {
      const enabled = isParticlesEnabled();
      if (enabled) {
        localStorage.setItem(PARTICLES_STORAGE_KEY, "false");
        removeParticles();
      } else {
        localStorage.setItem(PARTICLES_STORAGE_KEY, "true");

        const currentTheme = localStorage.getItem("selected-theme") || "default";
        const color = PARTICLE_COLORS[currentTheme] || "#ffffff";

        loadParticles(color);
      }
      updateButton();
    };

    document.addEventListener("DOMContentLoaded", () => {
      const selector = document.getElementById("theme-selector");
      const savedTheme = localStorage.getItem("selected-theme");
      const currentTheme = savedTheme && savedTheme !== "default" ? savedTheme : "default";

      if (savedTheme && savedTheme !== "default") {
        document.body.classList.add(savedTheme);
        selector.value = savedTheme;
      }

      if (isParticlesEnabled()) {
        loadParticles(PARTICLE_COLORS[currentTheme] || "#ffffff");
      }

      updateButton();

      selector.addEventListener("change", () => {
        document.body.classList.remove("theme-light", "theme-blue");

        const selected = selector.value;

        if (selected === "default") {
          localStorage.removeItem("selected-theme");
        } else {
          document.body.classList.add(selected);
          localStorage.setItem("selected-theme", selected);
        }

        if (isParticlesEnabled()) {
          removeParticles();
          const color = PARTICLE_COLORS[selected] || "#ffffff";
          loadParticles(color);
        }
      });

      const toggleButton = document.getElementById("toggle-particles");
      if (toggleButton) {
        toggleButton.addEventListener("click", toggleParticles);
      }
    });