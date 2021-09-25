// Copyright (c) 2021 Ivan Teplov

import rootURL from "./rootURL"
import joinPaths from "./joinPaths"

const serviceWorkerURL = joinPaths(rootURL, "/serviceWorker.js")

export async function installServiceWorker({ onUpdateAvailable }) {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.register(
      serviceWorkerURL
    )

    console.log(
      "Service worker registered successfully! Scope: " + registration.scope
    )

    registration.addEventListener("updatefound", () => {
      const installingWorker = registration.installing

      if (installingWorker == null) {
        return
      }

      installingWorker.addEventListener("statechange", () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // The previous service worker will still serve
            // the older content until all client tabs are closed
            onUpdateAvailable()
            console.log("New content is available")
          } else {
            console.log("Content is cached for offline use")
          }
        }
      })
    })

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload()
    })
  }
}

export default installServiceWorker
