self.addEventListener("install", () => {});

const appShellReqs = [
  "/",
  "/assets/app.css",
  "/ajax/libs/materialize/1.0.0/css/materialize.min.css",
];

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

  return;
});