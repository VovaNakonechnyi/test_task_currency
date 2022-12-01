<template>
  <label>{{ label }}:</label>
  <div class="box">
    <select @change="$emit('update:modelValue', handleInputChange($event))">
      <option
        v-for="item in items"
        :key="item.id"
        :selected="item.selected === modelValue"
        :value="item.value"
      >
        {{ item.title }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { handleInputChange } from "@/composables/useCurrency";
import { ICurrency } from "@/interfaces/currency";

interface Props {
  items: ICurrency[];
  modelValue: string;
  label: string;
}

// eslint-disable-next-line no-undef
defineEmits<{
  (e: "update:modelValue"): void;
}>();

// eslint-disable-next-line no-undef
withDefaults(defineProps<Props>(), {
  items: () => [
    {
      id: 0,
      value: "",
      title: "",
    },
  ],
  modelValue: "",
  label: "",
});
</script>

<style scoped lang="scss">
.box {
  select {
    background-color: $primary-blue-color;
    color: white;
    padding: remSize(12px);
    width: remSize(250px);
    border: none;
    font-size: remSize(18px);
    border-radius: remSize(17px);
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.391);
    transition-duration: 00.25s;
    outline: none;
    cursor: pointer;
    option {
      padding: remSize(30px);
    }
    &:hover {
      transition-duration: 00.25s;
      background-color: $secondary-blue-color;
    }
  }
  &:hover {
    &::before {
      color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
