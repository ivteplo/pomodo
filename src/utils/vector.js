// Copyright (c) 2022 Ivan Teplov

export const add = (first, second) => first.map((x, index) => x + second[index])
export const substract = (first, second) =>
  first.map((x, index) => x - second[index])
