// Copyright (c) 2021-2022 Ivan Teplov

const trimSlashes = (string) => {
  if (string.charAt(0) === "/") {
    string = string.substring(1)
  }

  if (string.charAt(string.length - 1) === "/") {
    string = string.slice(0, -1)
  }

  return string
}

export const joinPaths = (...paths) =>
  (paths[0]?.charAt(0) === "/" ? "/" : "") + paths.map(trimSlashes).join("/")

export default joinPaths
