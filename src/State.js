// Copyright (c) 2021 Ivan Zadvornov

const defaultState = {
  mode: "focus",
  streaksForLongBreak: 4,
  streak: {
    time: Date.now(),
    length: 0,
  },
  durations: {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  },
}

const modes = ["focus", "shortBreak", "longBreak"]

const isValidMode = (mode) => modes.indexOf(mode) !== -1

const getStateFromLocalStorage = () => {
  const state = localStorage.getItem("state")

  if (!state) {
    return { ...defaultState }
  }

  try {
    return JSON.parse(state)
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { ...defaultState }
    }

    throw error
  }
}

const validateState = (state) => {
  if (typeof state.durations !== "object") {
    state.durations = { ...defaultState.durations }
  } else {
    // Validate timer durations
    for (let [key, value] of Object.entries(state.durations)) {
      value = Math.round(value)

      // If the mode is unknown, then delete the key
      if (!isValidMode(key)) {
        delete state.durations[key]
      }
      // If value is not a number or is in an invalid range, then reset it
      else if (
        !(typeof value === "number" && value >= 1 * 60 && value <= 120 * 60)
      ) {
        state.durations[key] = defaultState.durations[key]
      }
      // Else just make the number an integer
      else {
        state.durations[key] = value
      }
    }

    // Check if there is duration specified for each of the modes
    for (let mode of modes) {
      if (!(mode in state.durations)) {
        state.durations[mode] = defaultState.durations[mode]
      }
    }
  }

  if (!isValidMode(state.mode)) {
    state.mode = "focus"
    state.timeLeft = state.durations.focus
  }

  if (
    !(
      // streak is an object
      (
        typeof state.streak === "object" &&
        // streak time is a number (that represents timestamp)
        typeof state.streak.time === "number" &&
        // length of streak is a number
        typeof state.streak.length === "number" &&
        // the streak was less than 8 hours ago
        Date.now() - state.streak.time <= 8 * 60 * 60 * 1000
      )
    )
  ) {
    state.streak = { ...defaultState.streak }
  }

  if (typeof state.streaksForLongBreak !== "number") {
    state.streaksForLongBreak = defaultState.streaksForLongBreak
  } else {
    state.streaksForLongBreak = Math.max(
      2,
      Math.min(8, state.streaksForLongBreak)
    )
  }

  if (!(typeof state.timeLeft === "number" && state.timeLeft >= 0)) {
    state.timeLeft = state.durations[state.mode]
  }

  return state
}

export const saveState = (state) => {
  state = validateState({ ...state })

  // Save the state
  localStorage.setItem("state", JSON.stringify(state))
}

export const loadState = () => {
  const stateObject = getStateFromLocalStorage()
  const state = validateState({ ...defaultState, ...stateObject })
  saveState(state)
  return state
}
