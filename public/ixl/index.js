"use strict";

const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

let tabs = [];
let activeTab = null;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
  localStorage.setItem("url", encodeURIComponent(encodedUrl));
  loadUrlInIframe(encodedUrl);
});

function loadUrlInIframe(url) {
  const iframe = document.getElementById("uv-iframe");
  iframe.src = __uv$config.prefix + __uv$config.encodeUrl(url);
}

function openTab(url) {
  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.style.display = "none";
  iframe.onload = function () {
    updateTabTitle(tabs[tabs.length - 1]);
    fetchFavicon(url).then(function (iconUrl) {
      updateTabTitle(activeTab);
      if (iconUrl) {
        activeTab.tab.querySelector(".tab-icon").src =
          "https://www.google.com/s2/favicons?sz=64&domain=" + decode(decodeURIComponent(iconUrl.split("/@/")[1])).replace(/^https?:\/\//, "");
        updateUrlInput(activeTab);
      } else {
        activeTab.tab.querySelector(".tab-icon").src = "https://www.google.com/s2/favicons?sz=64&domain=e";
        updateUrlInput(activeTab);
      }
    });
  };

  document.querySelector(".browser-window").appendChild(iframe);

  const tab = document.createElement("div");
  tab.classList.add("tab");
  const tabIcon = document.createElement("img");
  tabIcon.classList.add("tab-icon");
  tabIcon.src = "https://www.google.com/s2/favicons?sz=64&domain=e";
  const tabTitle = document.createElement("span");
  tabTitle.classList.add("tab-title");
  tabTitle.textContent = "Blank Page";
  const tabClose = document.createElement("span");
  tabClose.classList.add("tab-close");
  tabClose.textContent = "×";
  tab.appendChild(tabIcon);
  tab.appendChild(tabTitle);
  tab.appendChild(tabClose);
  tab.addEventListener("click", function (event) {
    if (event.target.classList.contains("tab-close")) {
      closeTab(tab);
    } else {
      switchTab(tab);
    }
  });

  document.querySelector(".tab-bar").appendChild(tab);

  tabs.push({
    tab: tab,
    iframe: iframe,
  });
  switchTab(tab);
}

function switchTab(tab) {
  if (activeTab) {
    activeTab.tab.classList.remove("active");
    activeTab.iframe.style.display = "none";
  }

  activeTab = tabs.find((t) => t.tab === tab);
  activeTab.tab.classList.add("active");
  activeTab.iframe.style.display = "block";
  updateUrlInput(activeTab);
}

function closeTab(tab) {
  var index = tabs.findIndex((t) => t.tab === tab);
  if (index !== -1) {
    var tabObj = tabs[index];

    tab.classList.add("closing");
    tab.style.animation = "closeTab 0.1s ease forwards";

    tab.addEventListener("animationend", function () {
      tabObj.iframe.parentNode.removeChild(tabObj.iframe);
      tab.parentNode.removeChild(tab);
      tabs.splice(index, 1);
      if (tab.classList.contains("active")) {
        if (tabs.length > 0) {
          switchTab(tabs[Math.max(index - 1, 0)].tab);
        } else {
          activeTab = null;
        }
      }
      tab.classList.remove("closing");
    });
  }
}

function updateTabTitle(tabObj) {
  const tabTitle = tabObj.iframe.contentWindow.document.title;
  tabObj.tab.querySelector(".tab-title").textContent = tabTitle;
}

function updateUrlInput(tabObj) {
  const urlInput = document.querySelector(".url-input");
  if (tabs.length === 0) {
    urlInput.value = "";
    urlInput.setAttribute("readonly", true);
  } else if (tabObj) {
    let url = tabObj.iframe.src.split("/@/")[1];
    const decodedPath = decode(decodeURIComponent(url)).replace(/^https?:\/\//, "");
    urlInput.value = decodedPath !== "uldgfkngd" ? decodedPath : "";
    urlInput.removeAttribute("readonly");
  }
}

function fetchFavicon(url) {
  return new Promise(function (resolve) {
    const faviconUrl = "https://www.google.com/s2/favicons?sz=64&domain=" + url;
    const img = new Image();
    img.onload = function () {
      resolve(faviconUrl);
    };
    img.onerror = function () {
      resolve(null);
    };
    img.src = faviconUrl;
  });
}
