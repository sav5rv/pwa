const URLBASE = 'https://sav5rv.github.io/pwa/';
const CACHE_NAME = 'voz-reconhecimento';
const assets = [
  URLBASE,
  URLBASE + 'index.html',
  URLBASE + 'manifest.json',
  URLBASE + 'js/instalar.js',
  URLBASE + 'js/app.js',
  URLBASE + 'img/icon.ico',
  URLBASE + 'img/icon.png  ',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(assets);
      })
    );
  });



self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})



self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
