const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const tabsContainer = document.getElementById("tabs");
const iframeContainer = document.getElementById("iframe-container");
const favicon = document.getElementById("favicon");

let tabs = [];
let activeTab = null;

function createTab(url = "/ixl/home.html") {
  const tab = {
    id: Date.now().toString(),
    iframe: document.createElement("iframe"),
    title: "New Tab",
    favicon: null,
    url: url,
  };

  tab.iframe.style.display = "none";
  iframeContainer.appendChild(tab.iframe);
  tabs.push(tab);
  setActiveTab(tab);

  // Ensure full path for home page
  if (!url.startsWith("http")) {
    tab.iframe.src = url;
  } else {
    loadUrl(url);
  }

  renderTabs();
}

function renderTabs() {
  tabsContainer.innerHTML = "";

  tabs.forEach((tab) => {
    const el = document.createElement("div");
    el.className = "tab" + (tab === activeTab ? " active" : "");
    el.textContent = tab.title;

    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.className = "tab-close";
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeTab(tab);
    };

    el.appendChild(closeBtn);
    el.onclick = () => setActiveTab(tab);
    tabsContainer.appendChild(el);
  });

  const newTabBtn = document.createElement("div");
  newTabBtn.className = "new-tab-btn";
  newTabBtn.textContent = "+";
  newTabBtn.onclick = () => createTab();
  tabsContainer.appendChild(newTabBtn);
}

function setActiveTab(tab) {
  if (activeTab) activeTab.iframe.style.display = "none";
  activeTab = tab;
  activeTab.iframe.style.display = "block";

  document.title = tab.title;
  favicon.href = tab.favicon || "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";
  address.value = tab.url || "";
  renderTabs();

  startDetectionLoop(tab);
}

function closeTab(tab) {
  const index = tabs.indexOf(tab);
  if (index !== -1) {
    iframeContainer.removeChild(tab.iframe);
    tabs.splice(index, 1);

    if (tab === activeTab) {
      const newTab = tabs[index] || tabs[index - 1];
      if (newTab) {
        setActiveTab(newTab);
      } else {
        createTab();
      }
    } else {
      renderTabs();
    }
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!activeTab) return;

  const input = address.value.trim();
  const isUrl = input.startsWith("http://") || input.startsWith("https://");
  const searchEngine = document.getElementById("uv-search-engine").value;
  const finalUrl = isUrl ? input : searchEngine.replace("%s", encodeURIComponent(input));
  const encoded = __uv$config.prefix + __uv$config.encodeUrl(finalUrl);

  await registerSW();

  activeTab.iframe.src = encoded;
  activeTab.url = finalUrl;
  activeTab.title = "Loading...";
  activeTab.favicon = "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";

  setActiveTab(activeTab);
});

// 🔁 Constantly check tab content every 2 seconds
function startDetectionLoop(tab) {
  const detect = () => {
    if (tab !== activeTab) return;

    try {
      const doc = tab.iframe.contentDocument || tab.iframe.contentWindow.document;
      const title = doc.title;
      const iconLink = doc.querySelector("link[rel~='icon']");
      const currentUrl = tab.iframe.contentWindow.location.href;

      if (title && title !== tab.title) {
        tab.title = title;
      }

      if (iconLink && iconLink.href !== tab.favicon) {
        tab.favicon = iconLink.href;
      }

      if (currentUrl && currentUrl !== tab.url) {
        tab.url = currentUrl;
      }

      // Keep UI in sync
      if (tab === activeTab) {
        document.title = tab.title;
        favicon.href = tab.favicon || "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";
        address.value = tab.url || "";
        renderTabs();
      }
    } catch (e) {
      // Likely a cross-origin iframe
    }
  };

  detect(); // Run once immediately
  clearInterval(tab._detector);
  tab._detector = setInterval(detect, 2000); // Run every 2s
}

window.addEventListener("load", () => {
  createTab(); // Load home page
});
