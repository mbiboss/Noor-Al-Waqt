const CACHE_NAME = "noor-al-waqt-v6";

const ASSET_PATHS = [
  "",
  "index.html",
  "style.css",
  "script.js",
  "display.html",
  "display.css",
  "display.js",
  "manifest.json",
  "logo.png",
  "Bangla_font.ttf"
];

const ASSETS = ASSET_PATHS.map((path) => new URL(path, self.registration.scope).href);

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch (Cache First Strategy)
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    }).catch(() => {
      if (event.request.mode === "navigate") {
        return caches.match(new URL("index.html", self.registration.scope).href);
      }
    })
  );
});