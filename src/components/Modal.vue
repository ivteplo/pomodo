// Copyright (c) 2021 Ivan Zadvornov

<template>
  <teleport to="#app-modals">
    <transition name="fade">
      <div v-if="isOpen" class="modal-wrapper column" v-bind="$attrs">
        <div class="modal column">
          <header class="row">
            <slot name="header"><span></span></slot>
            <div class="controls">
              <button type="button" role="navigation" @click="close()">
                Close
              </button>
            </div>
          </header>
          <main>
            <slot name="body"></slot>
          </main>
        </div>
        <div class="modal-blur-background" @click="close()"></div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close")
    },
  },
  emits: ["close"],
  props: ["isOpen"],
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
}

.modal {
  background-color: var(--modal-background);

  box-sizing: border-box;
  padding: 1rem;

  box-shadow: 0 0 1rem var(--modal-shadow);
  border-radius: var(--default-button-border-radius);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  max-width: 500px;
  max-height: 90vh;
  width: 100%;
}
@media (min-width: 900px) {
  .modal-wrapper {
    align-items: center;
    justify-content: center;
  }

  .modal {
    border-radius: var(--default-button-border-radius);
  }
}

.modal header {
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 1rem;
}

.modal header > .controls > button {
  color: var(--foreground);
}

.modal header > .controls > button:focus,
.modal header > .controls > button:hover {
  color: var(--primary-100);
}

.modal main {
  flex-grow: 1;
  overflow-y: auto;
}

.modal-blur-background {
  background-color: var(--modal-blur-background);
  backdrop-filter: blur(1rem);
  position: absolute;
  top: -5rem;
  left: -5rem;
  right: -5rem;
  bottom: -5rem;
  z-index: -1;
}
</style>
