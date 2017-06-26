var cacheStorageKey = 'PWA-demo'
var cacheList = [
  '/',
  'demo.html',
  'icon.png'
]

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(cacheStorageKey)
  .then(function (cache) {
    cache.addAll(cacheList)
  }).then(function () {
    self.skipWaiting()
  }))
})

self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request)
  .then(function (response) {
    if (response !== null) {
      return response
    }
    return fetch(e.request.url)
  }))
})

self.addEventListener('activate', function (e) {
  e.waitUntil(Promise.all(caches.keys()
  .then(function (cacheNames) {
    return cacheNames.map(function (name) {
      if (name !== cacheStorageKey) {
        return caches.delete(name)
      }
    })
  }).then(function () {
    return self.clients.claim()
  })))
})