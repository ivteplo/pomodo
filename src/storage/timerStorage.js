// Copyright (c) 2022 Ivan Teplov

import localForage from "localforage"

export const saveState = ({ isRunning, timeLeft }) =>
  localForage.setItem("timer", {
    isRunning,
    timeLeft,
    timeStamp: Date.now()
  })

export const getState = () => localForage.getItem("timer")
