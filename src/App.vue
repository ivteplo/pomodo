// Copyright (c) 2021 Ivan Zadvornov

<script setup>
import Timer from "./components/Timer.vue"
import Modal from "./components/Modal.vue"
</script>

<script>
import { loadState, saveState } from "./State"
import { reactive } from "@vue/reactivity"

const twoDigitNumber = (number) =>
  number > 9 ? number.toString() : "0" + number

var state = reactive(loadState())

var sendNotification = () => {}

export default {
  data() {
    return {
      isPaused: true,
      areSettingsOpen: false,
      durations: state.durations,
    }
  },
  computed: {
    timeLeftString() {
      var hours = Math.floor(state.timeLeft / 60 / 60)
      var minutes = Math.floor((state.timeLeft / 60) % 60)
      var seconds = Math.floor(state.timeLeft % 60)

      return [hours ? hours : null, minutes, seconds]
        .filter((value) => value !== null)
        .map(twoDigitNumber)
        .join(":")
    },
  },
  methods: {
    switchTo(mode) {
      this.isPaused = true
      state.mode = mode
      state.timeLeft = state.durations[mode]
      saveState(state)
    },
    buttonClass(name) {
      return name === state.mode ? "selected" : ""
    },
    toggle() {
      this.isPaused = !this.isPaused

      if (!this.isPaused) {
        this.startTimer()
      }
    },
    timerClicked() {
      this.toggle()
      this.setupNotifications()
    },
    startTimer() {
      const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        ((callback) => setInterval(callback, 1000 / 30))

      let prevTime = Date.now()

      const timer = () => {
        if (!this.isPaused) {
          // Calculate the delta
          let delta = Date.now() - prevTime
          // Update the amount of time left
          state.timeLeft = state.timeLeft - delta / 1000
          // Set prevTime to equal to Date.now()
          prevTime += delta

          // If time is over
          if (state.timeLeft <= 0) {
            // If we were focusing
            if (state.mode === "focus") {
              // Increase the streak length
              state.streak.length += 1
              // Specify the last time the streak has increased
              state.streak.time = Date.now()

              const shouldHaveLongBreak =
                state.streak.length % state.streaksForLongBreak === 0
              this.switchTo(shouldHaveLongBreak ? "longBreak" : "shortBreak")

              sendNotification(
                "Hey, the break is over",
                "It's time to focus on your tasks"
              )
            } else {
              this.switchTo("focus")
              sendNotification(
                "Hey, it's time for a break",
                "Relax and collect more energy to work productively during the next pomodoro"
              )
            }
          }

          // TODO: maybe save the state more rarely
          saveState(state)
          requestAnimationFrame(timer)
        }
      }

      timer()
    },
    setDuration(mode, duration) {
      state.durations[mode] = +duration * 60
      saveState(state)
    },
    async setupNotifications() {
      if (Notification.permission === "default") {
        await Notification.requestPermission()
      }

      if (Notification.permission === "granted") {
        sendNotification = (title, description) => {
          new Notification(title, {
            body: description,
            icon: "/favicon.ico",
            sound: "default",
          })
        }
      }
    },
  },
}
</script>

<template>
  <header class="column">
    <h1>Pomodo</h1>

    <div class="row status-buttons">
      <button
        type="button"
        :class="buttonClass('focus')"
        @click="switchTo('focus')"
      >
        Focus
      </button>
      <button
        type="button"
        :class="buttonClass('shortBreak')"
        @click="switchTo('shortBreak')"
      >
        Short Break
      </button>
      <button
        type="button"
        :class="buttonClass('longBreak')"
        @click="switchTo('longBreak')"
      >
        Long Break
      </button>
    </div>
  </header>

  <Timer :time="timeLeftString" :isPaused="isPaused" @click="timerClicked()" />

  <button type="button" class="settings-button" @click="areSettingsOpen = true">
    Settings
  </button>

  <transition name="fade">
    <Modal v-if="areSettingsOpen" @close="areSettingsOpen = false">
      <template v-slot:header>
        <h2>Settings</h2>
      </template>
      <template v-slot:body>
        <div class="column settings">
          <div class="column setting">
            <h3>Focus timer duration (in minutes)</h3>
            <input
              type="number"
              min="10"
              max="120"
              :value="durations.focus / 60"
              @change="setDuration('focus', $event.target.value)"
            />
          </div>
          <div class="column setting">
            <h3>Short break duration (in minutes)</h3>
            <input
              type="number"
              min="5"
              max="15"
              :value="durations.shortBreak / 60"
              @change="setDuration('shortBreak', $event.target.value)"
            />
          </div>
          <div class="column setting">
            <h3>Long break duration (in minutes)</h3>
            <input
              type="number"
              min="10"
              max="60"
              :value="durations.longBreak / 60"
              @change="setDuration('longBreak', $event.target.value)"
            />
          </div>
        </div>
      </template>
    </Modal>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

#app {
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  flex: 1;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  box-sizing: border-box;
}

#app > header {
  align-items: center;
}

#app > header h1 {
  margin-bottom: 1rem;
  text-transform: lowercase;
  font-weight: 500;
}

#app-modals:not(:empty) + #app {
  overflow: hidden;
}

.status-buttons {
  --gap: 5px;
  background-color: var(--secondary-background);
  padding: var(--gap);
  border-radius: calc(var(--default-button-border-radius) + 5px);
}

.status-buttons > button {
  padding: 0.5rem 1rem;
  color: var(--foreground);
  margin-right: var(--gap);
}

.status-buttons > button:last-child {
  margin-right: 0;
}

.status-buttons > button.selected {
  background-color: var(--primary-80);
  color: var(--background);
}

.status-buttons > button.selected:hover {
  color: var(--background);
  background-color: var(--primary-100);
}

.settings {
  flex: 1;
}

.settings .setting {
  margin-bottom: 1.5rem;
}

.settings .setting h3 {
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.settings .setting input {
  max-width: 400px;
  background-color: var(--secondary-background);
  color: var(--foreground);
  border-radius: var(--default-button-border-radius);
  height: 30px;
}
</style>
