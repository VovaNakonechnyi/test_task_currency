<template>
  <input
    :type="type"
    class="form-item my-1"
    :maxlength="maxLength"
    :value="modelValue"
    @input="$emit('update:modelValue', handleInputChange($event)), method()"
  />
</template>

<script lang="ts" setup>
import { handleInputChange } from "@/composables/useCurrency";
interface Props {
  type: string;
  maxLength: number;
  modelValue: unknown;
  method: () => void;
}

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  type: "",
  maxLength: 3,
  modelValue: undefined,
  method: () => 1,
});
// eslint-disable-next-line no-undef
defineEmits<{
  (e: "update:modelValue"): void;
}>();
</script>

<style lang="scss" scoped></style>
