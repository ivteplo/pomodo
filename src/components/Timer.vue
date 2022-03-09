// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import TimerDisplay from "./TimerDisplay.vue"
import yooSoundPath from "../assets/sounds/yoo.mp3?url"
</script>

<script>
import timerWorkerURL from "../workers/timerWorker.js?url"

export default {
  expose: ["startTimer", "stopTimer"],

  data() {
    return {
      timerHasStarted: false,
      timerWorker: null,
    }
  },

  beforeMount() {
    this.timerWorker = new Worker(timerWorkerURL)

    this.timerWorker.addEventListener("message", (event) => {
      switch (event.data?.action) {
        case "tick":
          return this.onTick(event.data.deltaTime)
        default:
          console.error("Unknown timer worker message", event.data)
      }
    })
  },
  beforeUnmount() {
    this.timerWorker.postMessage("stopTimer")
  },

  methods: {
    startTimer() {
      this.timerHasStarted = true
    },
    stopTimer(stoppedManually = false) {
      if (!stoppedManually) this.$refs.yooSound.play()

      this.timerHasStarted = false
    },
    onTick(deltaTime) {
      this.$refs.timer.onTick(deltaTime)
    },
  },
  watch: {
    timerHasStarted: {
      handler(started) {
        if (started) {
          this.$refs.timer?.start()
          this.timerWorker?.postMessage("startTimer")
        } else {
          this.$refs.timer?.stop()
          this.timerWorker?.postMessage("stopTimer")
        }
      },
      immediate: true,
    },
  },
}
</script>

<template>
  <section class="Timer column">
    <audio :src="yooSoundPath" ref="yooSound" />

    <TimerDisplay ref="timer" @timerEnd="this.stopTimer" />

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
  </section>
</template>

<style scoped>
.Timer {
  gap: 2rem;
  align-items: center;
}
</style>
