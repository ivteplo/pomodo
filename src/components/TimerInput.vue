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
    }
  },
}
</script>

<template>
  <div class="TimerInput">
    <CircularArc :max="this.max" :value="+this.value" />
    <section>
      <p>Value: {{ this.value }}</p>
      <input
        type="range"
        min="10"
        max="120"
        step="5"
        :value="this.value"
        @input="(event) => (this.value = event.currentTarget.value)"
      />
    </section>
  </div>
</template>

<style scoped>
svg {
  aspect-ratio: 1;
  min-width: 15rem;
  color: var(--primary);
}
</style>
