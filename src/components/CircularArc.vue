// Copyright (c) 2021-2022 Ivan Teplov

<script>
import * as vector from "../utils/vector"
import { map } from "../utils/map"

export default {
  expose: ["isBeingChanged"],
  emits: ["change"],
  props: {
    max: Number,
    value: Number,
    showCircleOnEnd: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radius: 45,
      center: [50, 50],
      isBeingChanged: false,
      _value: this.value,
    }
  },
  computed: {
    normal() {
      return [this.radius, -this.radius]
    },
    start() {
      return vector.add(this.center, [0, -this.radius])
    },
    angle() {
      return (this._value / this.max) * 2 * Math.PI
    },
    end() {
      return vector.add(this.center, [
        this.normal[0] * Math.sin(this.angle),
        this.normal[1] * Math.cos(this.angle),
      ])
    },
    pathD() {
      // TODO: describe how it works
      const angleLessThan180Deg = Math.min(this.angle, Math.PI)
      const middle = vector.add(this.center, [
        this.normal[0] * Math.sin(angleLessThan180Deg),
        this.normal[1] * Math.cos(angleLessThan180Deg),
      ])

      return [
        "M",
        ...this.start,
        "A",
        this.radius,
        this.radius,
        0,
        0,
        1,
        ...middle,
        "M",
        ...middle,
        "A",
        this.radius,
        this.radius,
        0,
        0,
        1,
        ...this.end,
      ].join(" ")
    },
  },
  methods: {
    startChange() {
      this.isBeingChanged = true
    },
    endChange() {
      this.isBeingChanged = false
    },
    onChange(event) {
      if (!this.isBeingChanged) return

      const element = this.$refs.svg
      const clickPosition = [event.pageX, event.pageY]

      // Position and size of SVG
      const svgInfo = element.getBoundingClientRect()

      const center = [
        svgInfo.left + svgInfo.width / 2,
        svgInfo.top + svgInfo.height / 2,
      ]

      const delta = vector.substract(clickPosition, center)

      let angle = Math.atan2(-delta[1], -delta[0])

      // Make the angle be between 0 and 2PI
      if (angle > Math.PI / 2 && angle <= Math.PI) {
        angle -= Math.PI / 2
      } else {
        angle += 1.5 * Math.PI
      }

      let newValue = Math.round(map(angle, 0, 2 * Math.PI, 0, this.max))
      newValue = Math.max(0, newValue)

      if (newValue === this._value) return

      if (Math.abs(newValue - this._value) <= this.max / 2) {
        this._value = newValue
        this.$emit("change", { value: newValue })
      }
    },
  },
}
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    ref="svg"
    @mousemove="(event) => this.onChange(event)"
    @touchmove="(event) => this.onChange(event)"
    @mouseup="() => this.endChange()"
    @touchend="() => this.endChange()"
  >
    <path
      :d="this.pathD"
      fill="transparent"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="round"
    />
    <circle
      v-if="this.showCircleOnEnd"
      :cx="this.end[0]"
      :cy="this.end[1]"
      r="5"
      @mousedown="() => this.startChange()"
      @touchstart="() => this.startChange()"
    />
  </svg>
</template>

<style scoped>
svg {
  aspect-ratio: 1;
}

svg path {
  fill: transparent;
  stroke: var(--secondary);
}

svg circle {
  fill: var(--primary);
}
</style>
