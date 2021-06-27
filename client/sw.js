self.addEventListener("install", () => {});

const appShellReqs = [
  "/",
  "/dist/main.js",
  "/dist/main.css",
  "https://fonts.googleapis.com/css2?family=Hind:wght@400;500&display=swap",
];

const dataReqs = ["/properties"];

/**
 * Called whenever any resource is fetched.
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { pathname } = new URL(request.url);

  if (appShellReqs.includes(pathname)) {
    return event.respondWith(
      (async () => {
        const cache = await caches.open("v1");
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch (err) {
          console.error("pff", err);
          return cache.match(request);
        }
      })()
    );
  }

  if (dataReqs.includes(pathname)) {
    return event.respondWith(
      (async () => {
        const cache = await caches.open("data/v1");
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch (err) {
          console.error("pff", err);
          return cache.match(request);
        }
      })()
    );
  }

  return;
});
