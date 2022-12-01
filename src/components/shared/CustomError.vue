<template>
  <div class="error-message">
    <span class="error-text">{{ error }}</span>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  error: string;
}

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  error: "",
});
</script>

<style lang="scss" scoped>
.error-message {
  background-color: $secondary-orange-color;
  border-radius: remSize(10px);
  border: 1px solid #fcc2c379;
  padding: remSize(10px);
}
.error-text {
  color: $red-color;
  font-size: remSize(13px);
  font-weight: 600;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250, 250, 250, 0.3);
}
</style>
