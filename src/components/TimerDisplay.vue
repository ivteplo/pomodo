// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import CircularArc from "./CircularArc.vue"
</script>

<script>
import twoDigitNumber from "../utils/twoDigitNumber"

export default {
  expose: ["timerDuration", "timeLeft", "start", "stop", "onTick"],
  emits: ["timerEnd"],
  props: {
    min: {
      type: Number,
      default: 10,
    },
    max: {
      type: Number,
      default: 120,
    },
    step: {
      type: Number,
      default: 5,
    },
    // duration in seconds
    initialDuration: {
      type: Number,
      default: 25 * 60,
    },
  },
  data() {
    return {
      // duration in seconds
      timerDuration: this.initialDuration,
      timeLeft: null,
      hasStarted: false,
    }
  },
  methods: {
    timeString(time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)

      return [...twoDigitNumber(minutes), ":", ...twoDigitNumber(seconds)].join(
        ""
      )
    },
    onTick(deltaTime) {
      if (!this.hasStarted) return

      // deltaTime is in ms
      this.timeLeft = Math.max(0, this.timeLeft - deltaTime / 1000)

      if (this.timeLeft === 0) {
        this.stop()
        this.$emit("timerEnd")
      }
    },
    start() {
      if (this.hasStarted) return

      this.timeLeft = this.timerDuration
      this.hasStarted = true
    },
    stop() {
      if (!this.hasStarted) return

      this.hasStarted = false
      this.timeLeft = null
    },
    onTimerDurationChange({ value }) {
      this.timerDuration = Math.round(value / this.step) * this.step * 60
    },
  },
  computed: {
    shownTime() {
      return this.hasStarted ? this.timeLeft : this.timerDuration
    },
    timerValueTitle() {
      return this.hasStarted ? "Time left" : "Timer duration in minutes"
    },
  },
}
</script>

<template>
  <div class="TimerDisplay">
    <CircularArc
      class="CircularArc"
      :min="this.min"
      :max="this.max"
      :step="this.step"
      :value="+shownTime / 60"
      :showCircleOnEnd="!this.hasStarted"
      inputLabel="Timer duration in minutes"
      @change="this.onTimerDurationChange"
    />
    <p class="TimerValue row" :title="this.timerValueTitle">
      <span
        v-for="[index, value] of Object.entries(this.timeString(shownTime))"
        v-bind:key="index"
      >
        {{ value }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.TimerDisplay {
  position: relative;
  border-radius: 50%;
}

.CircularArc {
  min-width: 15rem;
}

.TimerValue {
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  font-weight: 500;
}

.TimerValue > span {
  width: 1ch;
  text-align: center;
}
</style>
