
    const PARTICLES_ID = "particles-js";
    const PARTICLES_STORAGE_KEY = "particlesEnabled";


    const loadParticles = () => {
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
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 2, random: true },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
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
        loadParticles();
      }
      updateButton();
    };

    
    window.addEventListener("DOMContentLoaded", () => {
      if (isParticlesEnabled()) {
        loadParticles();
      }

      updateButton();

      const toggleButton = document.getElementById("toggle-particles");
      if (toggleButton) {
        toggleButton.addEventListener("click", toggleParticles);
      }
    });