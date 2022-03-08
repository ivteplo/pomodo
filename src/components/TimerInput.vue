// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import CircularArc from "./CircularArc.vue"
</script>

<script>
export default {
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
    defaultValue: {
      type: Number,
      default: 25,
    },
  },
  data() {
    return {
      value: this.defaultValue,
      isMouseDown: false,
    }
  },
  methods: {},
}
</script>

<template>
  <div class="TimerInput">
    <CircularArc
      class="CircularArc"
      :min="this.min"
      :max="this.max"
      :step="this.step"
      :value="+this.value"
      :showCircleOnEnd="true"
      :inputLabel="'Timer duration in minutes'"
      @change="
        ({ value }) => {
          this.value = Math.round(value / this.step) * this.step
        }
      "
    />
    <p>Value: {{ this.value }}</p>
  </div>
</template>

<style scoped>
.CircularArc {
  min-width: 15rem;
}
</style>
