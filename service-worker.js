const CACHE_NAME = 'noor-al-waqt-v' + Date.now();
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/display.html',
  '/display.css',
  '/display.js',
  '/manifest.json',
  '/logo.png',
  '/Bangla_font.ttf',
  'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+Bengali:wght@300;400;500;700&family=Orbitron:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Force fetch from network during install to get latest
      return Promise.all(
        ASSETS.map(url => {
          return fetch(new Request(url, { cache: 'reload' }))
            .then(response => {
              if (response.ok) return cache.put(url, response);
              throw new Error(`Failed to fetch ${url}`);
            });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Network-first strategy for main assets to ensure latest version
  if (ASSETS.some(asset => event.request.url.includes(asset))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first for other requests
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.method === 'GET' && fetchResponse.status === 200) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Prayer time is now',
    icon: '/logo.png',
    badge: '/logo.png'
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Noor Al-Waqt', options));
});