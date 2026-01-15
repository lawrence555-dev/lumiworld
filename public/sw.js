const CACHE_NAME = 'lumiworld-v1';
const ASSETS = [
    '/',
    '/manifest.json',
    '/globals.css',
    '/favicon.ico',
];

self.addEventListener('install', (event: any) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event: any) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
