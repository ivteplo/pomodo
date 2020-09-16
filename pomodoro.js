//
// Copyright (c) 2020 Ivan Teplov
// Licensed under the Apache license 2.0
//

var $state = document.querySelector("#state")
var $time = document.querySelector("#time")
var $pauseStartButton = document.querySelector("#pause-start")
var $resetButton = document.querySelector("#reset")
var $skipButton = document.querySelector("#skip")

var time = {
	minutes: 25,
	seconds: 0
}

var state = "Working"
var paused = true
var interval = null

$pauseStartButton.addEventListener("click", () => {
	paused = !paused
	
	if (!paused) {
		$pauseStartButton.innerHTML = "Pause"
		startInterval()
	} else {
		$pauseStartButton.innerHTML = "Start"
		clearInterval(interval)
	}
})

$resetButton.addEventListener("click", () => {
	changeState()
	changeState()
})

$skipButton.addEventListener("click", () => {
	changeState()
})

function startInterval() {
	interval = setInterval(() => {
		time.seconds -= 1
		
		if (time.seconds < 0) {
			time.minutes -= 1
			time.seconds = 59
		}
		
		if (time.minutes < 0) {
			changeState()
		} else {
			$time.innerHTML = getTimeString()
		}
	}, 1000)
}

function changeState() {
	switch (state) {
		case "Working":
			state = "Break"
			time = { minutes: 5, seconds: 0 }
			break
		default:
			state = "Working"
			time = { minutes: 25, seconds: 0 }
			break
	}
	
	$state.innerHTML = state
	$time.innerHTML = getTimeString()
}

function getTimeString() {
	let { minutes, seconds } = time
	minutes = minutes.toString()
	seconds = seconds.toString()
	
	if (minutes.length === 1) {
		minutes = "0" + minutes
	}
	
	if (seconds.length === 1) {
		seconds = "0" + seconds
	}
	
	return `${minutes}:${seconds}`
}
