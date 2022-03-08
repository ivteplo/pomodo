// Copyright (c) 2022 Ivan Teplov

// Map value from one range to another
export const map = (value, oldFrom, oldTo, newFrom, newTo) =>
  ((value - oldFrom) / (oldTo - oldFrom)) * (newTo - newFrom) + newFrom
