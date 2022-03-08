// Copyright (c) 2021-2022 Ivan Teplov

<script>
import * as vector from "../utils/vector"

export default {
  props: {
    max: Number,
    value: Number,
  },
  computed: {
    pathD() {
      // TODO: describe how it works
      const radius = 45
      const center = [50, 50]
      const normal = [radius, -radius]
      const start = vector.add(center, [0, -radius])

      const angle = (this.value / this.max) * 2 * Math.PI

      const angleLessThan180Deg = Math.min(angle, Math.PI)
      const end = vector.add(center, [
        normal[0] * Math.sin(angleLessThan180Deg),
        normal[1] * Math.cos(angleLessThan180Deg),
      ])

      const end1 = vector.add(center, [
        normal[0] * Math.sin(angle),
        normal[1] * Math.cos(angle),
      ])

      return [
        "M",
        ...start,
        "A",
        radius,
        radius,
        0,
        0,
        1,
        ...end,
        "M",
        ...end,
        "A",
        radius,
        radius,
        0,
        0,
        1,
        ...end1,
      ].join(" ")
    },
  },
}
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      :d="this.pathD"
      fill="transparent"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
    />
  </svg>
</template>

<style scoped>
svg {
  aspect-ratio: 1;
}
</style>
