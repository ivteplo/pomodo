// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import TimerDisplay from "./TimerDisplay.vue"
import Alert from "./Alert.vue"
import yooSoundPath from "../assets/sounds/yoo.mp3?url"
</script>

<script>
import TimerWorker from "../workers/timerWorker.js?worker"
import * as timer from "../storage/timerStorage"

let timerWorker

export default {
  name: "Timer",
  expose: ["startTimer", "stopTimer"],

  data() {
    return {
      timerHasStarted: false,
      timerWorker: null,
      elapsedFromLastSave: 0,
      showYooModal: false,
    }
  },

  beforeMount() {
    timerWorker = new TimerWorker()

    timerWorker.addEventListener("message", (event) => {
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

    if (!state?.isRunning) return

    // Calculate the current time on the timer
    const timeLeft = state.timeLeft - (Date.now() - state.timeStamp) / 1000

    // Save initial timer duration
    const { timerDuration } = this.$refs.timerDisplay

    // Set timerDuration to equal to timeLeft,
    // since when calling this.$refs.timerDisplay.start(),
    // the value of this.$refs.timerDisplay.timeLeft is set
    // to this.$refs.timerDisplay.timerDuration
    this.$refs.timerDisplay.timerDuration = timeLeft

    // Start the timer
    this.startTimer()

    // Reset timerDuration property after the timer
    // has started
    setTimeout(() => {
      this.$refs.timerDisplay.timerDuration = timerDuration
    }, 0)
  },
  beforeUnmount() {
    timerWorker.postMessage("stopTimer")
  },

  methods: {
    startTimer() {
      this.timerHasStarted = true
    },
    stopTimer(stoppedManually = false) {
      if (!stoppedManually) {
        this.$refs.yooSound.play()
        this.showYooModal = true
      }

      this.timerHasStarted = false
    },
    onTick(deltaTime) {
      this.elapsedFromLastSave += deltaTime
      this.$refs.timerDisplay.onTick(deltaTime)
      this.saveState()
    },
    saveState(force = false) {
      // If save is not forced and
      // last save was less than 2 seconds ago,
      // then don't save
      if (!force && this.elapsedFromLastSave < 2000) return

      const state = {
        isRunning: this.timerHasStarted,
        timeLeft: this.$refs.timerDisplay.timeLeft,
      }

      timer.saveState(state).catch(console.error)

      this.elapsedFromLastSave = 0
    },
    hideYooModal() {
      this.showYooModal = false
    },
  },
  watch: {
    timerHasStarted(started) {
      if (started) {
        this.$refs.timerDisplay.start()
        timerWorker.postMessage("startTimer")
      } else {
        this.$refs.timerDisplay.stop()
        timerWorker.postMessage("stopTimer")
      }

      this.saveState(true)
    },
  },
}
</script>

<template>
  <section class="Timer column">
    <audio :src="yooSoundPath" ref="yooSound" />

    <TimerDisplay ref="timerDisplay" @timerEnd="stopTimer" />

    <button
      type="button"
      class="primary"
      @click="startTimer"
      v-if="!timerHasStarted"
    >
      Start
    </button>

    <button
      type="button"
      class="gray"
      @click="() => stopTimer(true)"
      v-if="timerHasStarted"
    >
      Cancel
    </button>

    <Alert :isOpen="showYooModal" @hide="hideYooModal">
      <template v-slot:body>
        <h2>Yoo!</h2>
        <p>You've finished your pomodoro! Now it's time to relax for a bit.</p>
      </template>
      <template v-slot:actions>
        <button type="button" class="gray" @click="hideYooModal">OK</button>
      </template>
    </Alert>
  </section>
</template>

<style scoped>
.Timer {
  gap: 2rem;
  align-items: center;
}
</style>
