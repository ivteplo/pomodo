// Copyright (c) 2021 Ivan Teplov

self.addEventListener("message", (event) => {
  switch (event.data) {
    case "startTimer":
      startTimer()
      break
    case "stopTimer":
      stopTimer()
      break
    default:
      console.error("Unknown message: " + message)
  }
})

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

// Function that sends the 'tick' message to the user
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
