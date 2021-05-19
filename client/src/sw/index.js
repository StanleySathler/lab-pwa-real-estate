/**
 * Service Worker.
 */
window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const sw = await navigator.serviceWorker.register("../sw.js");
      console.log("Service worker registered! 😎", sw);
    } catch (err) {
      console.log("😥 Service worker registration failed: ", err);
    }
  }
});
