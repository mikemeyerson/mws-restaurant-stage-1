const version = 1;
const currentCacheName = `restaurants-cache-v${version}`;

self.addEventListener('install', event => {
  const assets = [
    'js/main.js',
    'js/dbhelper.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'css/styles.css'
  ];

  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(currentCacheName).then(cache =>
      cache.match(event.request).then(cacheResponse => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(event.request).then(fetchResponse => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      })
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => cacheNames
        .filter(name => name !== currentCacheName)
        .map(name => caches.delete(name))
      )
    )
  );
});