// Copyright (c) 2021 Ivan Zadvornov

<template>
  <button :class="'column Timer ' + (isPaused ? 'paused' : '')" role="status">
    <h2>
      <!-- TODO: add support for animating characters -->
      <span
        v-for="[index, char] of Object.entries(time.split(''))"
        v-bind:key="index + char"
        >{{ char }}</span
      >
    </h2>
    <p>{{ isPaused ? "Paused" : "Running" }}</p>
  </button>
</template>

<script setup>
defineProps({
  time: String,
  isPaused: Boolean,
})
</script>

<style scoped>
.Timer {
  --size: 250px;
  --border-width: 10px;
  --shadow-radius: 3rem;
  --shadow-color: var(--primary-80);
  --inner-shadow-radius: 1rem;
  --inner-shadow-color: var(--primary-100);

  align-items: center;
  justify-content: center;

  width: var(--size);
  height: var(--size);
  flex-shrink: 0;
  padding: 1rem;

  border-radius: 50%;

  color: var(--foreground);

  position: relative;

  box-sizing: border-box;
}

.Timer::before {
  content: "";
  position: absolute;
  z-index: -2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  animation: rotate infinite 2s linear;

  background-color: var(--secondary-background);
  background-image: linear-gradient(
    90deg,
    var(--background),
    var(--secondary-background)
  );

  border-radius: 50%;
  filter: brightness(1.5);
}

.Timer::after {
  content: "";

  background-color: var(--secondary-background);
  border-radius: 50%;

  position: absolute;
  z-index: -1;

  top: var(--border-width);
  left: var(--border-width);
  right: var(--border-width);
  bottom: var(--border-width);

  box-shadow: 0 0 var(--shadow-radius) var(--border-width) var(--shadow-color),
    inset 0 0 var(--inner-shadow-radius) var(--inner-shadow-color);

  transition: 0.3s box-shadow ease-out;
}

.Timer > h2 {
  font-size: 3rem;
  font-weight: 700;
  font-stretch: ultra-expanded;
  display: flex;
}

.Timer > h2 > span {
  display: block;
  width: 1ch;
}

.Timer > p {
  text-transform: lowercase;
  letter-spacing: 0.3ch;
  margin-bottom: -1rem;
}

.Timer.paused {
  --shadow-color: var(--secondary-background);
  --inner-shadow-color: var(--background);
}

.Timer.paused > h2 {
  animation: blink infinite 2s linear;
}

.Timer.paused::before {
  animation-play-state: paused;
}

@keyframes blink {
  50% {
    opacity: 0.5;
  }
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
