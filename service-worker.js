// service-worker.js
// Registered only so the app satisfies the browser's "installable" criteria
// (so it can be added to the home screen / installed).
//
// It intentionally does NOT cache anything and provides NO offline fallback:
// every request goes straight to the network. If there is no internet
// connection, the request simply fails and the app will not load.
// This is deliberate — the app depends on live data from Firebase/Firestore,
// so a stale offline copy would be misleading rather than useful.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up any cache left over from an earlier version of this
  // service worker that did cache files, so old installs stop
  // serving stale content too.
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// No caching logic here on purpose — every request is left to go
// straight to the network, exactly as if there were no service worker.
self.addEventListener("fetch", () => {});
