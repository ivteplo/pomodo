// Copyright (c) 2021-2022 Ivan Teplov

<script>
import twoDigitNumber from "../utils/twoDigitNumber"

export default {
  props: {
    minutes: Number,
    seconds: Number
  },
  computed: {
    timeDigits() {
      return [
        ...twoDigitNumber(this.minutes),
        ":",
        ...twoDigitNumber(this.seconds)
      ]
    }
  }
}
</script>

<template>
  <div class="Timer">
    <span v-for="[index, value] of Object.entries(this.timeDigits)" v-bind:key="index">
      {{ value }}
    </span>
  </div>
</template>

<style scoped>

</style>
