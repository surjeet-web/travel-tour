const CACHE_VERSION = 'v2.0.0';
const CACHE_NAME = `tourex-${CACHE_VERSION}`;
const STATIC_CACHE = `tourex-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `tourex-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `tourex-images-${CACHE_VERSION}`;
const API_CACHE = `tourex-api-${CACHE_VERSION}`;
const FONT_CACHE = `tourex-fonts-${CACHE_VERSION}`;

// Critical assets to cache immediately for instant loading
const CRITICAL_ASSETS = [
  '/',
  '/travel-packages',
  '/car-rental-home',
  '/car-listing',
  '/admin/login',
  '/manifest.json',
  '/favicon.png'
];

// Static assets that rarely change
const STATIC_ASSETS = [
  '/assets/css/bootstrap.min.css',
  '/assets/css/fontawesome-all.min.css',
  '/assets/css/animate.css',
  '/assets/css/nice-select.css',
  '/assets/css/meanmenu.css',
  '/assets/css/swiper-bundle.min.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/swiper-bundle.min.js',
  '/assets/js/wow.min.js',
  '/assets/js/main.js'
];

// Fonts for offline availability
const FONT_ASSETS = [
  '/assets/fonts/fa-solid-900.woff2',
  '/assets/fonts/fa-regular-400.woff2',
  '/assets/fonts/fa-brands-400.woff2',
  '/assets/fonts/fa-light-300.woff2'
];

// Install event - aggressive caching for instant loading
self.addEventListener('install', (event) => {
  console.log('🚀 Advanced Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical pages
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 Caching critical pages...');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📦 Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Cache fonts
      caches.open(FONT_CACHE).then((cache) => {
        console.log('📦 Caching fonts...');
        return cache.addAll(FONT_ASSETS);
      }),
      
      // Pre-cache app shell components
      fetch('/').then(response => {
        if (response.ok) {
          return caches.open(STATIC_CACHE).then(cache => {
            return cache.put('/', response);
          });
        }
      })
    ]).catch((error) => {
      console.error('❌ Failed to cache assets during install:', error);
    })
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('✅ Advanced Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes(CACHE_VERSION)) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Claim all clients immediately
      self.clients.claim(),
      
      // Notify clients of successful activation
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'SW_ACTIVATED',
            version: CACHE_VERSION
          });
        });
      })
    ])
  );
});

// Advanced fetch strategy with multiple cache layers
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and non-HTTP protocols
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }
  
  // Skip Chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Critical pages - Cache First with Network Update
    if (isCriticalPage(request)) {
      return await cacheFirstWithNetworkUpdate(request, STATIC_CACHE);
    }
    
    // Strategy 2: Static assets - Cache First
    if (isStaticAsset(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 3: Images - Cache First with Size Management
    if (isImage(request)) {
      return await cacheFirstWithSizeLimit(request, IMAGE_CACHE, 100);
    }
    
    // Strategy 4: Fonts - Cache First
    if (isFont(request)) {
      return await cacheFirst(request, FONT_CACHE);
    }
    
    // Strategy 5: API calls - Network First with Cache Fallback
    if (isApiCall(request)) {
      return await networkFirstWithCache(request, API_CACHE);
    }
    
    // Strategy 6: HTML pages - Stale While Revalidate
    if (isHtmlPage(request)) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }
    
    // Default: Network First
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('❌ Fetch error:', error);
    return await handleOffline(request);
  }
}

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

async function cacheFirstWithNetworkUpdate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  // Update cache in background
  const networkUpdate = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    // Network failed, ignore
  });
  
  return cachedResponse || await networkUpdate;
}

async function networkFirstWithCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const networkUpdate = fetch(request).then(async (response) => {
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    // Network failed, use cached version
  });
  
  return cachedResponse || await networkUpdate;
}

async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return await caches.match(request) || handleOffline(request);
  }
}

async function cacheFirstWithSizeLimit(request, cacheName, maxItems) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    
    // Manage cache size
    const keys = await cache.keys();
    if (keys.length >= maxItems) {
      // Remove oldest entries
      const entriesToRemove = keys.slice(0, keys.length - maxItems + 1);
      await Promise.all(entriesToRemove.map(key => cache.delete(key)));
    }
    
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
}

// Helper functions to identify request types
function isCriticalPage(request) {
  const url = new URL(request.url);
  return CRITICAL_ASSETS.some(asset => url.pathname === asset) ||
         request.headers.get('accept')?.includes('text/html');
}

function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/assets/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.json');
}

function isImage(request) {
  const url = new URL(request.url);
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname);
}

function isFont(request) {
  const url = new URL(request.url);
  return /\.(woff|woff2|ttf|otf|eot)$/i.test(url.pathname);
}

function isApiCall(request) {
  const url = new URL(request.url);
  return url.pathname.includes('/api/') ||
         url.hostname.includes('supabase') ||
         url.hostname.includes('api.');
}

function isHtmlPage(request) {
  return request.headers.get('accept')?.includes('text/html');
}

// Offline handling
async function handleOffline(request) {
  if (request.headers.get('accept')?.includes('text/html')) {
    // Return cached page or offline page
    const cachedPage = await caches.match(request) || 
                      await caches.match('/') ||
                      new Response(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <title>Offline - Tourex</title>
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <style>
                            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: linear-gradient(135deg, #00BFA5, #00ACC1); color: white; }
                            .offline-container { max-width: 400px; margin: 0 auto; }
                            .offline-icon { font-size: 64px; margin-bottom: 20px; }
                            h1 { margin-bottom: 20px; }
                            p { margin-bottom: 30px; opacity: 0.9; }
                            button { background: white; color: #00BFA5; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; }
                            button:hover { background: #f0f0f0; }
                          </style>
                        </head>
                        <body>
                          <div class="offline-container">
                            <div class="offline-icon">✈️</div>
                            <h1>You're Offline</h1>
                            <p>Don't worry! You can still browse cached pages and your experience will sync when you're back online.</p>
                            <button onclick="window.location.reload()">Try Again</button>
                          </div>
                        </body>
                        </html>
                      `, {
                        headers: { 'Content-Type': 'text/html' }
                      });
    return cachedPage;
  }
  
  // For other requests, return a simple error
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle any offline actions that need to be synced
  console.log('📡 Syncing offline actions...');
  
  // Example: Sync form submissions, bookings, etc.
  const offlineActions = await getOfflineActions();
  for (const action of offlineActions) {
    try {
      await syncAction(action);
      await removeOfflineAction(action.id);
    } catch (error) {
      console.error('Failed to sync action:', error);
    }
  }
}

// Placeholder functions for offline action management
async function getOfflineActions() {
  // Retrieve offline actions from IndexedDB
  return [];
}

async function syncAction(action) {
  // Sync individual action with server
  console.log('Syncing action:', action);
}

async function removeOfflineAction(actionId) {
  // Remove synced action from IndexedDB
  console.log('Removed offline action:', actionId);
}

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New update available!',
    icon: '/favicon.png',
    badge: '/favicon.png',
    image: data.image,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.id || 1,
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/favicon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.png'
      }
    ],
    requireInteraction: true,
    silent: false
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Tourex', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_VERSION });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
      
    case 'PERFORMANCE_MEASURE':
      console.log('📊 Performance measure:', data);
      break;
      
    default:
      console.log('📨 Unknown message type:', type);
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  console.log('🗑️ All caches cleared');
}

// Periodic cache cleanup
setInterval(async () => {
  try {
    // Clean up old dynamic cache entries
    const cache = await caches.open(DYNAMIC_CACHE);
    const keys = await cache.keys();
    
    if (keys.length > 200) {
      const entriesToRemove = keys.slice(0, 50);
      await Promise.all(entriesToRemove.map(key => cache.delete(key)));
      console.log('🧹 Cleaned up old cache entries');
    }
  } catch (error) {
    console.error('Cache cleanup error:', error);
  }
}, 30 * 60 * 1000); // Every 30 minutes

console.log('🚀 Advanced Service Worker loaded and ready!');
console.log('📦 Cache version:', CACHE_VERSION);
console.log('⚡ Instant loading enabled');
console.log('📱 PWA features active');