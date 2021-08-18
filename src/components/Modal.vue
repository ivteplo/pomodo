// Copyright (c) 2021 Ivan Zadvornov

<template>
  <teleport to="#app-modals">
    <div class="modal-wrapper column">
      <div class="modal column">
        <header class="row">
          <slot name="header"><h2>This is a modal</h2></slot>
          <div class="controls">
            <button type="button" role="navigation" @click="emit('close')">
              Close
            </button>
          </div>
        </header>
        <main>
          <slot name="body"></slot>
        </main>
      </div>
      <div class="modal-blur-background" @click="emit('close')"></div>
    </div>
  </teleport>
</template>

<script>
export default {
  methods: {
    emit(eventType) {
      this.$emit(eventType)
    },
  },
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  justify-content: flex-end;
  /* FIXME: not being able to scroll 
     when focusing an input from mobile */
}

.modal {
  background-color: var(--modal-background);

  box-sizing: border-box;
  padding: 1rem;

  box-shadow: 0 0 1rem var(--modal-shadow);
  border-radius: var(--default-button-border-radius);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;

  animation: appear 0.25s forwards ease-out;
  /* FIXME: no animation when closing the modal */
}

@keyframes appear {
  from {
    opacity: 0;
    visibility: hidden;
  }

  to {
    opacity: 1;
    visibility: visible;
  }
}

.modal > header {
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 1rem;
}

.modal > header > .controls > button {
  color: var(--foreground);
}

.modal > header > .controls > button:focus,
.modal > header > .controls > button:hover {
  color: var(--primary-100);
}

.modal > main {
  flex-grow: 1;
}

.modal-blur-background {
  background-color: var(--modal-blur-background);
  backdrop-filter: blur(1rem);
  position: fixed;
  top: -5rem;
  left: -5rem;
  right: -5rem;
  bottom: -5rem;
  z-index: -1;
  animation: appear 0.25s forwards ease-out;
}
</style>
