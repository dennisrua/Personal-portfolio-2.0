const CACHE_NAME = 'dennis-rua-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/images/Dennis Rua Mazerah - CV.pdf',
  '/images/logo-orange.png',
  '/images/profile.png',
  '/images/work-1.png',
  '/images/work-2.png',
  '/images/work-3.png',

  // Icon paths
  '/images/icons/apple-touch-icon.png',
  '/images/icons/favicon-96x96.png',
  '/images/icons/favicon.ico',
  '/images/icons/favicon.svg',
  '/images/icons/site.webmanifest',
  '/images/icons/web-app-manifest-192x192.png',
  '/images/icons/web-app-manifest-512x512.png',

  // External libraries cached them for offline use
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://kit.fontawesome.com/4e31bed758.js',
];

// Install event: caches all specified assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serves cached assets when offline, or fetches from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      // No cache hit - fetch from network
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Activate event: cleans up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
