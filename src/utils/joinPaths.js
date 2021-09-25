// Copyright (c) 2021 Ivan Teplov

function trimSlashes(string) {
  while (string && string[0] === "/") {
    string = string.substring(1)
  }

  while (string && string[string.length - 1] === "/") {
    string = string.slice(0, -1)
  }

  return string
}

export function joinPaths(...paths) {
  return paths.length === 0
    ? ""
    : "/" + trimSlashes(paths.map((path) => trimSlashes(path)).join("/"))
}

export default joinPaths
