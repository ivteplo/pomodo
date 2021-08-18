// Copyright (c) 2021 Ivan Zadvornov

import { createApp } from "vue"
import App from "./App.vue"
import "./theme.css"
import { setupThemeColor } from "./utils/setupThemeColor"

createApp(App).mount("#app")
setupThemeColor()
