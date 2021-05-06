/**
 * Called once SW is installed. It only happens once for each
 * version.
 */
self.addEventListener("install", (event) => {
  console.log("[SW] Installed.", event);

  const fetchAndCacheOfflinePage = async () => {
    // Get a ref. to the cache
    const cache = await caches.open("offline-fallback-page");

    // {cache: 'reload'} means this will be served not from the cache
    // but from the network (as if we were updating the cache).
    await cache.add(new Request("/offline/offline.html", { cache: "reload" }));
  };

  event.waitUntil(fetchAndCacheOfflinePage());

  // Apply new SW version immediately rather than wait until
  // the old version is not controlling anyone.
  self.skipWaiting();
});

/**
 * Called once SW is ready to handle events like fetch.
 * It only happens once for each version.
 */
self.addEventListener("activate", (event) => {
  console.log("[SW] Activated.", event);
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;

  const fetchOrFallback = async () => {
    // Let browser handle the request.
    try {
      return await fetch(event.request);
    } catch (err) {
      // But if it fails it's probably 'cause it's offline, so
      // fetch offline page from cache.
      console.log("[SW] Fetch failed. Fetching offline page from cache.", err);

      const cache = await caches.open("offline-fallback-page");
      return await cache.match("/offline/offline.html");
    }
  };

  event.respondWith(fetchOrFallback());
});
