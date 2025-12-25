const CACHE_NAME = 'tourex-v1.0.0';
const STATIC_CACHE = 'tourex-static-v1.0.0';
const DYNAMIC_CACHE = 'tourex-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/assets/css/bootstrap.min.css',
  '/assets/css/fontawesome-all.min.css',
  '/assets/css/animate.css',
  '/assets/css/nice-select.css',
  '/assets/css/meanmenu.css',
  '/assets/css/swiper-bundle.min.css',
  '/assets/css/main.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/swiper-bundle.min.js',
  '/assets/js/wow.min.js',
  '/assets/js/main.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
  
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          // For HTML pages, check for updates in background
          if (request.headers.get('accept')?.includes('text/html')) {
            fetch(request)
              .then((response) => {
                if (response.ok) {
                  caches.open(DYNAMIC_CACHE)
                    .then((cache) => cache.put(request, response.clone()));
                }
              })
              .catch(() => {
                // Network failed, use cached version
              });
          }
          return cachedResponse;
        }
        
        // Not in cache, fetch from network
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (!response.ok) {
              return response;
            }
            
            const responseClone = response.clone();
            
            // Cache strategy based on request type
            if (request.headers.get('accept')?.includes('text/html')) {
              // Cache HTML pages in dynamic cache
              caches.open(DYNAMIC_CACHE)
                .then((cache) => cache.put(request, responseClone));
            } else if (
              request.url.includes('/assets/') ||
              request.url.includes('.css') ||
              request.url.includes('.js') ||
              request.url.includes('.woff') ||
              request.url.includes('.woff2')
            ) {
              // Cache static assets in static cache
              caches.open(STATIC_CACHE)
                .then((cache) => cache.put(request, responseClone));
            } else if (
              request.url.includes('.jpg') ||
              request.url.includes('.jpeg') ||
              request.url.includes('.png') ||
              request.url.includes('.webp') ||
              request.url.includes('.svg')
            ) {
              // Cache images in dynamic cache with size limit
              caches.open(DYNAMIC_CACHE)
                .then(async (cache) => {
                  // Limit cache size for images
                  const keys = await cache.keys();
                  const imageKeys = keys.filter(key => 
                    key.url.includes('.jpg') || 
                    key.url.includes('.jpeg') || 
                    key.url.includes('.png') || 
                    key.url.includes('.webp') || 
                    key.url.includes('.svg')
                  );
                  
                  // Remove oldest images if cache is too large
                  if (imageKeys.length > 50) {
                    await cache.delete(imageKeys[0]);
                  }
                  
                  cache.put(request, responseClone);
                });
            }
            
            return response;
          })
          .catch(() => {
            // Network failed, return offline page for HTML requests
            if (request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/offline.html') || 
                     new Response('Offline - Please check your connection', {
                       status: 503,
                       statusText: 'Service Unavailable'
                     });
            }
            
            // For other requests, return a generic error
            return new Response('Network error', {
              status: 408,
              statusText: 'Request Timeout'
            });
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    // Handle offline actions when connection is restored
  }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon.png',
      badge: '/favicon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_MEASURE') {
    console.log('Performance measure:', event.data.data);
  }
});

console.log('Service Worker: Loaded and ready!');