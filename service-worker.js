const CACHE_NAME = "firstpwaa";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/explore.html",
  "/pages/about.html",
  "/pages/suggestion.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/jquery-2.2.1.min.js",
  "/js/init.js",
  "/favicon.ico",
  "/icon/144x144.png",
  "/icon/192x192.png",
  "/icon/apple-icon-144x144.png",
  "/icon/favicon-16x16.png",
  "/icon/favicon-32x32.png",
  "/icon/icon.png",
  "/icon/ms-icon-144x144.png",
  "/manifest.json",
  "/font/F.woff2",
  "img/explore1.jpg",
  "img/explore2.jpeg",
  "img/explore3.jpeg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
  
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
