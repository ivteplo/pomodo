// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import Header from "./components/Header.vue"
import Timer from "./components/Timer.vue"
</script>

<script>
export default {
  methods: {
    startTimer() {
      this.$refs.timer.start()
      this.timerHasStarted = true
    },
    stopTimer() {
      this.$refs.timer.stop()
      this.timerHasStarted = false
    },
  },
  data() {
    return {
      timerHasStarted: false,
    }
  },
}
</script>

<template>
  <div class="App fill column">
    <Header />
    <Timer ref="timer" />

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
      @click="this.stopTimer"
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
