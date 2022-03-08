// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
  import Header from "./components/Header.vue"
  import Timer from "./components/Timer.vue"
  import TimerInput from "./components/TimerInput.vue"
</script>

<template>
  <div class="App fill column">
    <Header />
    <!-- <Timer :minutes="25" :seconds="0" /> -->
    <TimerInput />
  </div>
</template>

<script>
export default {
  setup() {

  },
}
</script>

<style scoped>
.App {
  justify-content: center;
  align-items: center;
}
</style>
