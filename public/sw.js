// 在 public/sw.js 文件中
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
    // event.waitUntil(
    //   caches.open('my-cache').then((cache) => {
    //     return cache.addAll([
    //       '/',
    //       '/index.html',
    //       '/styles.css',
    //       '/script.js',
    //     ]);
    //   })
    // );
  });
  
  self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    // event.respondWith(
    //   caches.match(event.request).then((response) => {
    //     // 如果有缓存，返回缓存内容；否则从网络请求
    //     return response || fetch(event.request);
    //   })
    // );
  });
  
  