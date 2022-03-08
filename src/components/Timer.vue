// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import CircularArc from "./CircularArc.vue"
</script>

<script>
import twoDigitNumber from "../utils/twoDigitNumber"

export default {
  expose: ["duration", "start", "stop", "onTick"],
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
      duration: this.initialDuration,
      hasStarted: false,
    }
  },
  computed: {
    durationString() {
      const minutes = Math.floor(this.duration / 60)
      const seconds = Math.floor(this.duration % 60)

      return [...twoDigitNumber(minutes), ":", ...twoDigitNumber(seconds)].join(
        ""
      )
    },
  },
  methods: {
    onTick(deltaTime) {
      // deltaTime is in ms
      this.duration = Math.max(0, this.duration - deltaTime / 1000)

      if (this.duration === 0) {
        this.hasStarted = false
        this.$emit("timerEnd")
      }
    },
    start() {
      this.hasStarted = true
    },
    stop() {
      this.hasStarted = false
      this.duration = this.initialDuration
    },
  },
}
</script>

<template>
  <div class="Timer">
    <CircularArc
      class="CircularArc"
      :min="this.min"
      :max="this.max"
      :step="this.step"
      :value="+this.duration / 60"
      :showCircleOnEnd="!this.hasStarted"
      :inputLabel="'Timer duration in minutes'"
      @change="
        ({ value }) => {
          this.duration = Math.round(value / this.step) * this.step * 60
        }
      "
    />
    <p class="TimerValue" title="Timer duration in minutes">
      {{ this.durationString }}
    </p>
  </div>
</template>

<style scoped>
.Timer {
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
</style>
