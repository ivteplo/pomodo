// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import TimerDisplay from "./TimerDisplay.vue"
import yooSoundPath from "../assets/sounds/yoo.mp3?url"
</script>

<script>
import timerWorkerURL from "../workers/timerWorker.js?url"
import * as timer from "../storage/timerStorage"

export default {
  expose: ["startTimer", "stopTimer"],

  data() {
    return {
      timerHasStarted: false,
      timerWorker: null,
      elapsedFromLastSave: 0,
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
  async mounted() {
    const state = await timer.getState()

    if (!state.isRunning) return

    // Calculate the current time on the timer
    const timeLeft = state.timeLeft - (Date.now() - state.timeStamp) / 1000

    // Save initial timer duration
    const { timerDuration } = this.$refs.timer

    // Set timerDuration to equal to timeLeft,
    // since when calling this.$refs.timer.start(),
    // the value of this.$refs.timer.timeLeft is set
    // to this.$refs.timer.timerDuration
    this.$refs.timer.timerDuration = timeLeft

    // Start the timer
    this.startTimer()

    // Reset timerDuration property after the timer
    // has started
    setTimeout(() => {
      this.$refs.timer.timerDuration = timerDuration
    }, 0)
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
      this.elapsedFromLastSave += deltaTime
      this.$refs.timer.onTick(deltaTime)
      this.saveState()
    },
    saveState(force = false) {
      // If save is not forced and
      // last save was less than 2 seconds ago,
      // then don't save
      if (!force && this.elapsedFromLastSave < 2000) return

      const state = {
        isRunning: this.timerHasStarted,
        timeLeft: this.$refs.timer.timeLeft,
      }

      timer.saveState(state).catch(console.error)

      this.elapsedFromLastSave = 0
    },
  },
  watch: {
    timerHasStarted(started) {
      if (started) {
        this.$refs.timer.start()
        this.timerWorker.postMessage("startTimer")
      } else {
        this.$refs.timer.stop()
        this.timerWorker.postMessage("stopTimer")
      }

      this.saveState(true)
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
