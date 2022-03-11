// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import Timer from "./components/Timer.vue"
import Alert from "./components/Alert.vue"
</script>

<script>
let newWorker

const skipWaiting = () => {
  if (!newWorker) return

  newWorker.postMessage({
    action: "skipWaiting",
  })
}

export default {
  data() {
    return {
      isUpdateAlertShown: false,
    }
  },
  mounted() {
    this.checkForUpdates()
  },
  methods: {
    hideUpdateAlert() {
      this.isUpdateAlertShown = false
    },
    async checkForUpdates() {
      if (!navigator.serviceWorker) return

      const registration = await navigator.serviceWorker.getRegistration()

      registration?.addEventListener("updatefound", () => {
        const installingWorker = registration.installing

        if (installingWorker == null) {
          return
        }

        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              newWorker = installingWorker

              // The previous service worker will still serve
              // the older content until all client tabs are closed
              this.isUpdateAlertShown = true
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
    },
  },
}
</script>

<template>
  <div class="App fill column">
    <Header />
    <Timer />
    <Footer />

    <Alert @hide="this.hideUpdateAlert" :isOpen="this.isUpdateAlertShown">
      <template v-slot:body>
        <h2>Update</h2>
        <p>
          There is an update available. It will be installed when all tabs for
          this page are closed.
        </p>
      </template>

      <template v-slot:actions>
        <button type="button" @click="this.skipWaiting">Reload</button>
        <button type="button" class="gray" @click="this.hideUpdateAlert">
          Cancel
        </button>
      </template>
    </Alert>
  </div>
</template>

<style scoped>
.App {
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 1rem;
}
</style>
