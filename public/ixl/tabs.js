const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const tabsContainer = document.getElementById("tabs");
const iframeContainer = document.getElementById("iframe-container");
const favicon = document.querySelector("link[rel~='icon']");

let tabs = [];
let activeTab = null;

function createTab(url = "/ixl/home.html") {
  const tab = {
    id: Date.now().toString(),
    iframe: document.createElement("iframe"),
    title: "New Tab",
    favicon: "https://ssl.gstatic.com/chrome/newtab/favicon-32.png",
    url: url,
  };

  tab.iframe.style.display = "none";
  tab.iframe.src = url;

  // Load event to update title, favicon and address bar
  tab.iframe.onload = () => {
    try {
      const doc = tab.iframe.contentDocument || tab.iframe.contentWindow.document;
      tab.title = doc.title || "New Tab";
      tab.favicon = getFavicon(doc) || tab.favicon;
      tab.url = tab.iframe.contentWindow.location.href;

      // If it's the active tab, reflect updates
      if (tab === activeTab) {
        document.title = tab.title;
        favicon.href = tab.favicon;
        address.value = tab.url;
      }
    } catch (e) {
      // Cross-origin access — just use URL
      tab.title = "New Tab";
      tab.url = tab.iframe.src;
      if (tab === activeTab) {
        document.title = tab.title;
        favicon.href = "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";
        address.value = tab.url;
      }
    }
  };

  iframeContainer.appendChild(tab.iframe);
  tabs.push(tab);
  setActiveTab(tab);
  renderTabs();
}

function getFavicon(doc) {
  const link = doc.querySelector("link[rel~='icon']");
  return link ? link.href : null;
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

  // Try to update title, favicon, and search bar
  try {
    const doc = activeTab.iframe.contentDocument || activeTab.iframe.contentWindow.document;
    activeTab.title = doc.title || "New Tab";
    activeTab.favicon = getFavicon(doc) || activeTab.favicon;
    activeTab.url = activeTab.iframe.contentWindow.location.href;

    document.title = activeTab.title;
    favicon.href = activeTab.favicon;
    address.value = activeTab.url;
  } catch (e) {
    document.title = "New Tab";
    favicon.href = "https://ssl.gstatic.com/chrome/newtab/favicon-32.png";
    address.value = activeTab.iframe.src;
  }

  renderTabs();
}

// Hook form submission to load URL
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!activeTab) return;

  const input = address.value.trim();
  if (!input) return;

  const isURL = input.includes(".") || input.startsWith("http");
  const url = isURL ? (input.startsWith("http") ? input : "https://" + input)
                    : `https://www.google.com/search?q=${encodeURIComponent(input)}`;

  activeTab.iframe.src = url;
  activeTab.url = url;
});
