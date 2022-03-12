// Copyright (c) 2021-2022 Ivan Teplov

let isRunning = false
let lastUpdate

function startTimer() {
  if (isRunning) return

  isRunning = true
  lastUpdate = Date.now()
  tick()
}

function tick() {
  const now = Date.now()
  const deltaTime = now - lastUpdate
  lastUpdate = now

  self.postMessage({
    action: "tick",
    deltaTime,
  })

  if (isRunning) {
    requestAnimationFrame(tick)
  }
}

function stopTimer() {
  isRunning = false
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
