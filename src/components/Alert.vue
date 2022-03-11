// Copyright (c) 2021-2022 Ivan Teplov

<script>
export default {
  name: "Alert",
  emits: ["hide"],
  props: {
    isOpen: Boolean,
    role: {
      type: String,
      default: "alert",
    },
  },
  methods: {
    hide() {
      this.$emit("hide")
    },
  },
}
</script>

<template>
  <transition name="fade">
    <div class="Alert" v-if="isOpen">
      <div class="AlertOverlay" @click="hide" />
      <div class="AlertContents column" :role="role">
        <div class="AlertContentsInformation column">
          <slot name="body" />
        </div>
        <div class="AlertActionButtons column">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.Alert {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 999;
}

.AlertOverlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: #0008;
}

.AlertContents {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  margin: auto;
  justify-content: space-between;
  min-width: 18rem;
  max-height: 90vh;
  max-width: 90vw;
  padding: 1rem;
  border-radius: 1rem;
  background: var(--background);
  gap: 1rem;
}

.AlertContentsInformation {
  gap: 0.25rem;
}

.AlertActionButtons {
  gap: 0.5rem;
}
</style>
