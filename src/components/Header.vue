// Copyright (c) 2021-2022 Ivan Teplov

<script setup>
import WideLogo from "../assets/logo/pomodo-wide-logo.svg"
</script>

<script>
export default {
  name: "Header",
}
</script>

<template>
  <header class="column">
    <h1>Pomodo</h1>
    <WideLogo class="logo" aria-hidden="true" title="Pomodo" />
  </header>
</template>

<style scoped>
header {
  gap: 0.5rem;
}

h1 {
  font-weight: 400;
  display: none;
}

.logo {
  height: 3rem;
}
</style>
