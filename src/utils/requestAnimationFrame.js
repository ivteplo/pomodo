// Copyright (c) 2021 Ivan Zadvornov

export const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  ((callback) => setInterval(callback, 1000 / 30))

export default requestAnimationFrame
