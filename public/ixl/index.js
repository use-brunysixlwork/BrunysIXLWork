"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const iframe = document.getElementById("uv-iframe");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Reset error messages
  error.textContent = "";
  errorCode.textContent = "";

  const query = address.value.trim();

  if (!query) {
    error.textContent = "Please enter a search query or URL.";
    return;
  }

  try {
    // Register service worker for Ultraviolet (if necessary)
    await registerSW();

    // Construct the search URL for Google
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    // Use Ultraviolet to encode the URL and generate the correct proxy URL
    const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(searchUrl);

    // Store the URL and load it into the iframe
    iframe.src = encodedUrl;

  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    console.error(err);
  }
});

// Register the service worker for UV
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/ixl/register-sw.js");
      console.log("Service Worker registered:", registration);
    } catch (err) {
      console.error("Service Worker registration failed:", err);
      throw err;
    }
  }
}
