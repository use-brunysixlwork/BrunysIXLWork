"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const iframeContainer = document.getElementById("iframe-container");
const tabBar = document.getElementById("tab-bar");
const newTabBtn = document.getElementById("new-tab");
const favicon = document.getElementById("dynamic-favicon");

let tabs = [];
let activeTab = null;

newTabBtn.addEventListener("click", () => createTab());

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!activeTab) return;

  const input = address.value.trim();
  const isUrl = input.startsWith("http://") || input.startsWith("https://");
  const finalUrl = isUrl ? input : `https://www.duckduckgo.com/?q=%s${encodeURIComponent(input)}`;
  const encoded = __uv$config.prefix + __uv$config.encodeUrl(finalUrl);

  await registerSW();
  activeTab.iframe.src = encoded;

  // Basic fallback
  document.title = "Loading...";
  favicon.href = "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";

  setTimeout(() => {
    detectSiteDetails(activeTab.iframe);
  }, 2500);
});

function createTab(url = "") {
  const iframe = document.createElement("iframe");
  iframe.className = "tab-frame";
  iframe.style.display = "none";
  iframeContainer.appendChild(iframe);

  const tabId = Math.random().toString(36).substr(2, 9);

  const tab = {
    id: tabId,
    title: "New Tab",
    iframe,
  };

  const tabElem = document.createElement("div");
  tabElem.className = "tab";
  tabElem.innerHTML = `<span>${tab.title}</span><button>&times;</button>`;
  tabBar.insertBefore(tabElem, newTabBtn);

  tabElem.querySelector("span").addEventListener("click", () => switchTab(tab));
  tabElem.querySelector("button").addEventListener("click", () => closeTab(tab, tabElem));

  tab.elem = tabElem;
  tabs.push(tab);

  switchTab(tab);

  if (url) {
    const encoded = __uv$config.prefix + __uv$config.encodeUrl(url);
    iframe.src = encoded;
    setTimeout(() => detectSiteDetails(iframe), 2500);
  }
}

function switchTab(tab) {
  tabs.forEach(t => {
    t.iframe.style.display = "none";
    t.elem.classList.remove("active");
  });

  tab.iframe.style.display = "block";
  tab.elem.classList.add("active");
  activeTab = tab;

  address.value = ""; // You could optionally show UV-decoded URL here
}

function closeTab(tab, elem) {
  const index = tabs.findIndex(t => t.id === tab.id);
  if (index > -1) {
    iframeContainer.removeChild(tab.iframe);
    tabBar.removeChild(elem);
    tabs.splice(index, 1);

    if (activeTab === tab) {
      if (tabs.length) switchTab(tabs[Math.max(0, index - 1)]);
      else activeTab = null;
    }
  }
}

function detectSiteDetails(iframe) {
  try {
    const uvHost = location.origin + __uv$config.prefix;
    const realUrl = iframe.src.replace(uvHost, "");

    fetch(realUrl)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const pageTitle = doc.querySelector("title")?.textContent || "New Tab";
        const iconHref = doc.querySelector("link[rel~='icon']")?.href || "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";

        document.title = pageTitle;
        favicon.href = iconHref;

        if (activeTab) {
          activeTab.title = pageTitle;
          activeTab.elem.querySelector("span").textContent = pageTitle.slice(0, 20);
        }
      });
  } catch (err) {
    console.warn("Detector failed:", err);
  }
}

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/ixl/register-sw.js", {
        scope: __uv$config.prefix
      });
    } catch (e) {
      console.error("Service worker registration failed:", e);
    }
  }
}

// Open the first tab by default
createTab();
