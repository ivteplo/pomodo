//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

document.addEventListener("DOMContentLoaded", function () {
  const pauseStartButton = document.querySelector("#pause-start")
  const resetButton = document.querySelector("#reset")
  const pomodoro = document.querySelector("#pomodoro")
  const skipButton = document.querySelector("#skip")
  const yooAudio = document.querySelector("#yoo-audio")
  const state = document.querySelector("#state")
  const time = document.querySelector("#time")

  var notificationsList = []
  var hideNotificationDuration = 7000

  var workingTime = 1500

  // time left (in seconds)
  var timeLeft = workingTime

  var isWorking = true
  var isPaused = true
  var interval = -1

  var cookies = parseCookies()
  var isUserNew = "new" in cookies ? cookies.new === "true" : true
  var areNotificationsAllowed = "notificationson" in cookies ? cookies.notificationson : null

  if (isUserNew) {
    showMessageBox("info", "Welcome", "Thanks for using PomoDo!")
    showMessageBox("info", "Changing the pomodoro duration", "Click at the tomato to change the pomodoro duration")

    setCookie(cookies, "new", false)
  }

  // Adding event listener for clicking at pomodoro (it changes working time duration)
  pomodoro.addEventListener("click", function () {
    setWorkingTimeTo(workingTime === 1500 ? 3000 : 1500)
  })

  // Adding event listener for clicking at pause/start button
  pauseStartButton.addEventListener("click", function () {
    if (areNotificationsAllowed === null) {
      setTimeout(async function () {
        areNotificationsAllowed =
          (await Notification.requestPermission()) === "granted"
        setCookie(cookies, "notificationson", areNotificationsAllowed)
      }, 1000)
    }

    if (!isWorking) {
      setTimeLeft(workingTime)
      setIsWorking(true)
    } else {
      setIsPaused(!isPaused)
    }

    if (!isPaused && isWorking && timeLeft === workingTime) {
      showMessageBox("success", "Working time", "Good luck!")
    }
  })

  // Adding event listener for clicking at reset button
  resetButton.addEventListener("click", function () {
    setIsPaused(true)
    setTimeLeft(workingTime)
  })

  // Adding event listener for clicking at skip button
  skipButton.addEventListener("click", function () {
    setIsWorking(!isWorking)
    setIsPaused(true)

    if (isWorking) {
      setTimeLeft(workingTime)
    }
  })

  // Function to set working state and update the state shown
  function setIsWorking(boolean) {
    isWorking = boolean

    if (!isWorking) {
      yooAudio.play()
      resetButton.setAttribute("disabled", true)
      showMessageBox("success", "Yoo!", "It's time for a break")

      if (areNotificationsAllowed) {
        setTimeout(() => {
          new Notification("Yoo!", {
            body: "It's time for a break",
            icon: "icon72.png",
          })
        }, 100)
      }

      setTimeLeft(-1)
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

  // Function to configure working time duration
  function setWorkingTimeTo(number) {
    if (!isWorking || (timeLeft === workingTime && isPaused)) {
      workingTime = number
      setTimeLeft(workingTime)
    }

    showMessageBox("info", "Updated working time", "You have changed the pomodoro duration")
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
    interval = setInterval(function () {
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
      time.innerHTML = minutes + ":" + seconds
    } else {
      time.innerHTML = "&nbsp;"
    }
  }

  // Function to convert number to two-digit-long string
  function toTwoDigitString(number) {
    var string = number.toString()
    return string.length === 2 ? string : "0" + string
  }

  // Function to show message box
  function showMessageBox(type, title, message) {
    var infoBox = document.createElement("div")

    if ("classList" in infoBox) {
      infoBox.classList.add("message-box")
      infoBox.classList.add(type)
    } else {
      infoBox.className = 'message-box ' + type
    }

    infoBox.innerHTML = '<div class="message-box-title"><strong>' + title + '</strong></div>' +
      '<div class="message-box-message">' + message + '</div>'

    document.querySelector("#app #message-boxes-list").appendChild(infoBox)

    const getRemoveNodeFunc = function(infoBox) {
      return function () {
        for (let [index, [ node, timeout ]] of Object.entries(notificationsList)) {
          if (node === infoBox) {
            notificationsList.splice(index, 1)
            break
          }
        }

        infoBox.style.animation = "message-box-closing-animation var(--default-transition-duration) var(--default-transition-easing) both"

        setTimeout(function() {
          infoBox.parentNode.removeChild(infoBox)
        }, 201)
      }
    }

    notificationsList.push([ infoBox, null ])

    notificationsList.forEach(([ node, timeout ], index) => {
      clearTimeout(timeout)
      setTimeout(getRemoveNodeFunc(node), (index + 1) * hideNotificationDuration)
    })
  }

  // Function to parse cookies
  function parseCookies() {
    if ("cookie" in document) {
      let array = document.cookie.split(";").map(function (item) {
        return item.split("=").map(function (item) {
          return item.trim()
        })
      }).filter(function (item) {
        return item[0] && item[1]
      })

      let cookies = {}

      for (let [key, value] of array) {
        cookies[key] = value
      }

      return cookies
    }

    return {}
  }

  // Function to set cookie
  function setCookie(cookie, key, value) {
    cookie[key] = value

    if ("cookie" in document) {
      let cookiesString = ""

      for (let key in cookie) {
        cookiesString += key + "=" + cookie[key]
      }

      document.cookie = cookiesString
    }
  }
})
