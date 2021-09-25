// Copyright (c) 2021 Ivan Teplov

const cacheName = "v1.1.1"
const cacheKeeplist = [cacheName]

const pathsToCache = ["index.html", "favicon.ico"]

// Function to cache main files
// TODO: find a way to cache CSS and JavaScript files right after installation
async function cacheBaseFiles() {
  // Open our cache
  const cache = await caches.open(cacheName)
  // Add files to cache
  await cache.addAll(pathsToCache)
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheBaseFiles())
})

async function deleteOldCaches() {
  // Get list of caches
  const keyList = await caches.keys()

  await Promise.all(
    // Iterate over caches
    keyList.map((key) => {
      // If cache should not be keeped
      if (cacheKeeplist.indexOf(key) === -1) {
        // Delete the cache
        return caches.delete(key)
      }
    })
  )
}

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches())
})

// Function called when the client makes a request
async function fetchRequest(request) {
  // Check if the requested file is cached
  let response = await caches.match(request)

  // If file isn't cached
  if (!response) {
    // Fetch the file
    response = await fetch(request)

    // Open our cache
    const cache = await caches.open(cacheName)
    // And save the response to the cache
    cache.put(request, response.clone())
  }

  // And finally, return our response
  return response
}

self.addEventListener("fetch", (event) => {
  event.respondWith(fetchRequest(event.request))
})
