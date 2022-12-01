<template>
  <button
    class="btn"
    :class="{ 'btn-disabled': disabled }"
    :disabled="disabled"
    @click="method"
  >
    <slot name="text"></slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  disabled: boolean;
  method: () => void;
}

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  disabled: false,
  method: () => 1,
});
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  height: remSize(35px);
  margin: remSize(12px) 0 0;
  padding: 0 remSize(25px);
  text-align: center;
  color: $white-color;
  background-color: $secondary-blue-color;
  border-radius: remSize(6px);
  border-width: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 100%;
  line-height: 1.15;
  transform: translateZ(0);
  transition: all 0.2s, box-shadow 0.08s ease-in;

  &:disabled {
    cursor: default;
  }
  &:focus {
    box-shadow: rgba(50, 50, 93, 0.1) 0 0 0 1px inset,
      rgba(50, 50, 93, 0.2) 0 6px 15px 0, rgba(0, 0, 0, 0.1) 0 2px 2px 0,
      rgba(50, 151, 211, 0.3) 0 0 0 4px;
  }
}
.btn-disabled {
  background: $neutral-dark-grey-color;
  color: $white-color;
}
</style>
