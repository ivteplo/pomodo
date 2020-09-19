//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

const cacheName = "pomodo-v1"
const cachesAllowed = []
const thingsToCache = ["index.html", "index.css", "pomodoro.js", "yoo.mp3"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(thingsToCache)
    })
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (cachesAllowed.indexOf(key) === -1) {
            return caches.delete(key)
          }
        })
      )
    )
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response !== undefined) {
        return response
      }

      return fetch(event.request).then((response) => {
        let responseClone = response.clone()

        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseClone)
        })

        return response
      })
    })
  )
})
