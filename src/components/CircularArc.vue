// Copyright (c) 2021-2022 Ivan Teplov

<script>
import * as vector from "../utils/vector"
import { map } from "../utils/map"

let removeWindowEventListeners = () => {}

export default {
  name: "CircularArc",
  expose: ["isBeingChanged"],
  emits: ["change"],
  props: {
    min: Number,
    max: Number,
    step: Number,
    value: {
      type: Number,
    },

    inputLabel: String,
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
  beforeUnmount() {
    removeWindowEventListeners()
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

      const onChange = (e) => this.onChange(e)
      const onEnd = () => this.endChange()

      window.addEventListener("mousemove", onChange)
      window.addEventListener("touchmove", onChange)

      window.addEventListener("mouseup", onEnd)
      window.addEventListener("touchend", onEnd)

      removeWindowEventListeners = () => {
        window.removeEventListener("mousemove", onEnd)
        window.removeEventListener("touchmove", onEnd)

        window.removeEventListener("mouseup", onEnd)
        window.removeEventListener("touchend", onEnd)
      }
    },
    endChange() {
      this.isBeingChanged = false
      this._value = this.value
      removeWindowEventListeners()
      removeWindowEventListeners = () => {}
    },
    onChange(event) {
      if (!this.isBeingChanged) return

      const clickInfo = event.touches ? event.touches[0] : event

      const element = this.$refs.svg
      const clickPosition = [clickInfo.pageX, clickInfo.pageY]

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
      newValue = Math.max(this.min, newValue)

      if (newValue === this._value) return

      if (Math.abs(newValue - this._value) <= this.max / 2) {
        this._value = newValue
        this.$emit("change", { value: newValue })
      }
    },
    onInputChange(event) {
      const value = Math.round(
        Math.max(0, Math.min(this.max, event.target.value))
      )

      event.target.value = value
      this._value = value

      this.$emit("change", { value })
    },
  },
  watch: {
    // When the value is changed from the parent,
    // then the local state variable too
    "$props.value"() {
      this._value = this.value
    },
  },
}
</script>

<template>
  <div class="CircularArc">
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      ref="svg"
    >
      <circle class="background" cx="50" cy="50" r="45" />
      <path
        :d="pathD"
        fill="transparent"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
      />
      <circle
        v-if="showCircleOnEnd"
        :cx="end[0]"
        :cy="end[1]"
        r="5"
        @mousedown="startChange"
        @touchstart.prevent="startChange"
      />
    </svg>

    <div class="ScreenReaderOnly" v-if="showCircleOnEnd">
      <label for="input">{{ this.inputLabel }}</label>
      <input
        id="input"
        class="ScreenReaderOnly"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="value"
        @change="onInputChange"
      />
    </div>
  </div>
</template>

<style scoped>
svg {
  aspect-ratio: 1;
  border-radius: 50%;
}

svg path {
  fill: transparent;
  stroke: var(--secondary);
}

svg circle {
  fill: var(--primary);
}

svg circle.background {
  fill: var(--secondary-background);
}
</style>
