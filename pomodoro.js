//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

document.addEventListener("DOMContentLoaded", function () {
  const pauseStartButton = document.querySelector("#pause-start")
  const resetButton = document.querySelector("#reset")
  const skipButton = document.querySelector("#skip")
  const yooAudio = document.querySelector("#yoo-audio")
  const state = document.querySelector("#state")
  const time = document.querySelector("#time")

  var workingTime = 1500

  // time left (in seconds)
  var timeLeft = workingTime

  var isWorking = true
  var isPaused = true
  var interval = -1

  var areNotificationsAllowed = false

  // Adding event listener for clicking at pause/start button
  pauseStartButton.addEventListener("click", () => {
    setTimeout(async () => {
      areNotificationsAllowed =
        (await Notification.requestPermission()) === "granted"
    }, 1000)

    if (!isWorking) {
      setIsWorking(true)
      setTimeLeft(workingTime)
    }

    setIsPaused(!isPaused)
  })

  // Adding event listener for clicking at reset button
  resetButton.addEventListener("click", () => {
    setIsPaused(true)
    setTimeLeft(workingTime)
  })

  // Adding event listener for clicking at skip button
  skipButton.addEventListener("click", () => {
    setIsWorking(!isWorking)
    setTimeLeft(isWorking ? workingTime : -1)
    setIsPaused(true)
  })

  // Function to set working state and update the state shown
  function setIsWorking(boolean) {
    isWorking = boolean

    if (!isWorking) {
      yooAudio.play()
      resetButton.setAttribute("disabled", true)

      if (areNotificationsAllowed) {
        new Notification("Yoo!", {
          body: "It's time for a break",
          icon: "icon72.png",
        })
      }
    } else {
      resetButton.removeAttribute("disabled")
    }

    displayCurrentState()
  }

  // Function to set time left and update the time shown
  function setTimeLeft(number) {
    timeLeft = number
    displayCurrentTime()
  }

  // Function to set paused state
  function setIsPaused(boolean) {
    isPaused = boolean

    if (isPaused) {
      pauseStartButton.removeAttribute("data-started")
      clearInterval(interval)
    } else {
      pauseStartButton.setAttribute("data-started", true)
      startInterval()
    }
  }

  // Function that starts countdown
  function startInterval() {
    interval = setInterval(() => {
      setTimeLeft(timeLeft - 1)

      if (timeLeft < 0) {
        setIsWorking(false)
        setIsPaused(true)
      }
    }, 1000)
  }

  // Function that updates state on the screen (Working/Yoo)
  function displayCurrentState() {
    state.innerHTML = isWorking ? "Working" : "Yoo!"
  }

  // Function that updates time on the screen
  function displayCurrentTime() {
    if (timeLeft >= 0) {
      const minutes = toTwoDigitString(Math.floor(timeLeft / 60))
      const seconds = toTwoDigitString(timeLeft % 60)
      time.innerHTML = `${minutes}:${seconds}`
    } else {
      time.innerHTML = "&nbsp;"
    }
  }

  // Function to convert number to two-digit-long string
  function toTwoDigitString(number) {
    var string = number.toString()
    return string.length === 2 ? string : "0" + string
  }
})
