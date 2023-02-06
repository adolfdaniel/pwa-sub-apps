self.addEventListener('install', (event) => {
  // cache counter script for offline use
  event.waitUntil(
    caches.open('v1').then((cache) => {
      cache.add('/sw.js');
      cache.add('/app.js');
      cache.add('/index.html');
      cache.add('/manifest.webmanifest');
      cache.add('/favicon.ico');
      cache.add('/style.css');
      cache.add('/icons/192x192.png');
      cache.add('/icons/512x512.png');
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(`Oh, no! Where's the internet?`);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.onmessage = (event) => {
  console.log('SW received message: ', event.data);
  switch (event.data.action) {
    case 'addSubApp':
      console.log('SW addSubApp');
      break;
    default:
      console.log('SW default');
  }
};