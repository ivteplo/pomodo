// Copyright (c) 2021-2022 Ivan Teplov

import joinPaths from "./joinPaths"

export const setupNotifications = async () => {
  if (Notification.permission === "default") {
    await Notification.requestPermission()
  }
}

export const sendNotification = (title, description) => {
  if (Notification.permission === "granted") {
    new Notification(title, {
      body: description,
      icon: joinPaths(import.meta.env.BASE_URL, "icons/ios/256.png"),
      sound: "default",
    })
  }
}
