<script setup>
import Timer from "./components/Timer.vue"

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
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

  <Timer :time="timeLeftString" :isPaused="isPaused" @click="toggle()" />

  <button type="button" class="settings-button">Settings</button>
</template>

<script>
const twoDigitNumber = (number) =>
  number > 9 ? number.toString() : "0" + number

const streakForLongBreak = 4

const defaultDurations = {
  // focus: 25 * 60,
  // shortBreak: 5 * 60,
  // longBreak: 15 * 60,
  focus: 2,
  shortBreak: 2,
  longBreak: 3,
}

var sendNotification = (title, description) => {
  new Notification(title, {
    body: description,
    icon: "/favicon.ico",
    sound: "default",
  })
}

export default {
  data() {
    return {
      timeLeft: defaultDurations.focus,
      isPaused: true,
      mode: "focus",
      // Count of pomodoros the user has done so far
      streak: 0,
    }
  },
  computed: {
    timeLeftString() {
      var hours = Math.floor(this.timeLeft / 60 / 60)
      var minutes = Math.floor((this.timeLeft / 60) % 60)
      var seconds = Math.floor(this.timeLeft % 60)

      return [hours ? hours : null, minutes, seconds]
        .filter((value) => value !== null)
        .map(twoDigitNumber)
        .join(":")
    },
  },
  methods: {
    switchTo(mode) {
      this.mode = mode
      this.isPaused = true
      this.timeLeft = defaultDurations[mode]
    },
    buttonClass(name) {
      return name === this.mode ? "selected" : ""
    },
    toggle() {
      this.isPaused = !this.isPaused

      if (!this.isPaused) {
        this.startTimer()
      }
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
          let delta = Date.now() - prevTime
          this.timeLeft = this.timeLeft - delta / 1000
          prevTime += delta

          if (this.timeLeft <= 0) {
            if (this.mode === "focus") {
              this.streak += 1

              if (this.streak >= streakForLongBreak) {
                this.switchTo("longBreak")
                this.streak = 0
              } else {
                this.switchTo("shortBreak")
              }

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

          requestAnimationFrame(timer)
        }
      }

      timer()
    },
  },

  async mounted() {
    if (Notification.permission === "default") {
      await Notification.requestPermission()
    }

    if (Notification.permission !== "granted") {
      sendNotification = (title, description) => {}
    }
  },
}
</script>

<style>
#app {
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  flex-grow: 1;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  padding: 2rem;
}

header {
  align-items: center;
  margin-bottom: 4rem;
}

header h1 {
  margin-bottom: 1rem;
  text-transform: lowercase;
  font-weight: 500;
}

.status-buttons {
  --gap: 5px;
  background-color: var(--secondary-background);
  padding: var(--gap);
  border-radius: var(--default-button-border-radius);
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

.settings-button {
  margin-top: 3rem;
}
</style>
