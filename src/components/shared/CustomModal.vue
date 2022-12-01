<template>
  <div class="modal-backdrop">
    <div class="modal" role="dialog">
      <header class="modal-header">
        <slot name="header"> </slot>
        <button type="button" class="btn-close" @click="$emit('close')">
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body"> This is the default body! </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line no-undef
defineEmits<{
  (e: "close"): void;
}>();
</script>

<style lang="scss" scoped>
.modal-backdrop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal {
  width: 500px;
  height: 500px;
  background: $white-color;
  box-shadow: 2px 2px 20px 1px;
  border-radius: remSize(20px);
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: remSize(10px);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  padding: remSize(15px);
  position: relative;
  border-bottom: 1px solid $primary-white-color;
  color: $secondary-blue-color;
  font-weight: 500;
  font-size: remSize(19px);
}
.modal-footer {
  display: flex;
  flex-direction: column;
  padding: remSize(15px);
  border-top: 1px solid $primary-white-color;
}
.modal-body {
  position: relative;
  padding: 20px 10px;
}
.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: remSize(20px);
  padding: remSize(10px);
  cursor: pointer;
  font-weight: bold;
  color: $black-color;
  background: transparent;
}
</style>
