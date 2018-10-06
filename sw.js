const version = 49;
const currentCacheName = `restaurants-cache-v${version}`;

self.addEventListener('install', (event) => {
  const assets = [
    // TODO: Figure out why SW fails pre-caching these
    // 'dist/index.js',
    // 'dist/details.js',
    'css/styles.css',
  ];

  event.waitUntil(
    caches.open(currentCacheName)
      .then(cache => cache.addAll(assets)),
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  const isAPI = requestUrl.hostname === location.hostname && requestUrl.port === '1337';

  if (isAPI) {
    event.respondWith(
      fetch(event.request),
    );
    return;
  }

  event.respondWith(
    caches.open(currentCacheName)
      .then(cache => cache.match(event.request).then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }

        return fetch(event.request).then((fetchResponse) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }))
      .catch((err) => {
        console.error('Failed on SW fetch');
        console.error(err);
        return Promise.reject(err);
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames
      .filter(name => name !== currentCacheName)
      .map(name => caches.delete(name)))),
  );
});
