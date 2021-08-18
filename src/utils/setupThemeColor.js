// Copyright (c) 2021 Ivan Zadvornov

export const setupThemeColor = () => {
  const metaTag = document.createElement("meta")
  document.head.appendChild(metaTag)

  const onColorSchemeChange = () => {
    metaTag.setAttribute("name", "theme-color")
    metaTag.setAttribute(
      "content",
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background"
      )
    )
  }

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", onColorSchemeChange)

  onColorSchemeChange()
}
