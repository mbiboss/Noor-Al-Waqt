const CACHE_NAME = 'noor-al-waqt-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+Bengali:wght@300;400;500;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Prayer time is now',
    icon: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=192&h=192&auto=format&fit=crop',
    badge: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=192&h=192&auto=format&fit=crop'
  };
  event.waitUntil(self.registration.showNotification(data.title || 'Noor Al-Waqt', options));
});