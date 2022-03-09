// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import Timer from "./components/Timer.vue"
</script>

<template>
  <div class="App fill column">
    <Header />
    <Timer />
    <Footer />
  </div>
</template>

<style scoped>
.App {
  align-items: center;
  justify-content: space-between;
  gap: 3rem;
  padding: 1rem;
}
</style>
