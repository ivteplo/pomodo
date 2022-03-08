// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import Header from "./components/Header.vue"
import Timer from "./components/Timer.vue"
import yooSoundPath from "./assets/sounds/yoo.mp3?url"
</script>

<script>
import timerWorkerURL from "./workers/timerWorker.js?url"

export default {
  expose: ["startTimer", "stopTimer"],
  beforeMount() {
    this.timerWorker = new Worker(timerWorkerURL)

    this.timerWorker.addEventListener("message", (event) => {
      switch (event.data?.action) {
        case "tick":
          return this.onTick(event.data.deltaTime)
        default:
          console.error("Unexpected message from timer worker", event.data)
      }
    })
  },
  beforeUnmount() {
    this.timerWorker.postMessage("stopTimer")
  },
  methods: {
    startTimer() {
      this.$refs.timer.duration = 5
      this.$refs.timer.start()
      this.timerHasStarted = true
      this.timerWorker.postMessage("startTimer")
    },
    stopTimer(stoppedManually = false) {
      if (!stoppedManually) this.$refs.yooSound.play()

      this.$refs.timer.stop()
      this.timerHasStarted = false
      this.timerWorker.postMessage("stopTimer")
    },
    onTick(deltaTime) {
      this.$refs.timer.onTick(deltaTime)
    },
  },
  data() {
    return {
      timerHasStarted: false,
      timerWorker: null,
    }
  },
}
</script>

<template>
  <div class="App fill column">
    <audio :src="yooSoundPath" ref="yooSound" />

    <Header />
    <Timer ref="timer" @timerEnd="this.stopTimer" />

    <button
      type="button"
      class="primary"
      @click="this.startTimer"
      v-if="!this.timerHasStarted"
    >
      Start
    </button>

    <button
      type="button"
      class="gray"
      @click="() => this.stopTimer(true)"
      v-if="this.timerHasStarted"
    >
      Cancel
    </button>
  </div>
</template>

<style scoped>
.App {
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1rem;
}
</style>
