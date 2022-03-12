// Copyright (c) 2021-2022 Ivan Teplov

import { createApp } from "vue"
import App from "./App.vue"
import "./theme.css"
import joinPaths from "./utils/joinPaths"

createApp(App).mount("#app")

function registerServiceWorker() {
  if (!navigator.serviceWorker) return

  console.log("navigator.serviceWorker is available")

  const root = import.meta.env.BASE_URL

  const serviceWorkerURL = joinPaths(root, "serviceWorker.js")
  const scope = root

  console.log(
    `Registering service worker ${serviceWorkerURL} for ${scope} scope`
  )

  navigator.serviceWorker
    .register(serviceWorkerURL, { scope })
    .then((registration) => {
      console.log(
        "[Service worker] Registered with the scope " + registration.scope
      )
    })
    .catch(console.error)
}

if (import.meta.env.PROD) {
  registerServiceWorker()
}
