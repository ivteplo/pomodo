// Copyright (c) 2021-2022 Ivan Teplov

let intervalID
let lastTick

function startTimer() {
  if (intervalID) return

  lastTick = Date.now()
  intervalID = setInterval(tick, 200)
}

function tick() {
  const deltaTime = Date.now() - lastTick
  lastTick = Date.now()

  self.postMessage({
    action: "tick",
    deltaTime,
  })
}

function stopTimer() {
  clearInterval(intervalID)
  intervalID = undefined
}

self.addEventListener("message", (event) => {
  switch (event.data) {
    case "startTimer":
      return startTimer()
    case "stopTimer":
      return stopTimer()
    default:
      console.error("[TimerWorker] Unexpected message", event.data)
  }
})
