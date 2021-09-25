// Copyright (c) 2021 Ivan Teplov

import rootURL from "./rootURL"
import joinPaths from "./joinPaths"

const timerWorkerURL = joinPaths(rootURL, "/timerWorker.js")

export function setupTimerWorker() {
  if (!("Worker" in window)) {
    return createTimerWorkerPolyfill()
  }

  return new Worker(timerWorkerURL)
}

export default setupTimerWorker

// TODO: find a way to write DRY code
// (now it's almost duplicating TimerWorker's code)
function createTimerWorkerPolyfill() {
  // Our timer
  let timer

  // Function that is called when the user
  // sends 'startTimer' message
  function startTimer() {
    if (typeof timer === "number") {
      return
    }

    timer = setInterval(tick, 1000)
    tick()
  }

  // Function that is called to send the 'tick' message to the user
  function tick() {
    postMessage("tick")
  }

  // Function that is called when the user
  // sends 'stopTimer' message
  function stopTimer() {
    if (typeof timer === "number") {
      clearInterval(timer)
    }

    timer = undefined
  }

  // It's like `self.addEventListener('message', ...)` in TimerWorker's code
  function onMessage(message) {
    switch (message) {
      case "startTimer":
        startTimer()
        break
      case "stopTimer":
        stopTimer()
        break
      default:
        console.error("Unknown message: " + message)
    }
  }

  // Event listeners registered by the user
  const listeners = {}

  // Our worker object
  const worker = {
    addEventListener(type, callback) {
      if (!(type in listeners)) {
        listeners[type] = []
      }

      listeners[type].push(callback)
    },
    postMessage(message) {
      onMessage(message)
    },
  }

  // Function to send a message to the user
  function postMessage(message) {
    listeners.message?.forEach((listener) => {
      listener({
        data: message,
      })
    })
  }

  return worker
}
