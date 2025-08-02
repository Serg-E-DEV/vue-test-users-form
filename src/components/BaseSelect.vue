<script setup lang="ts">
const model = defineModel<string>({ required: true });

type Option = string | { selectValue: string; selectLabel: string };

withDefaults(
  defineProps<{
    options: Option[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>

<template>
  <select
    v-model="model"
    class="base-input base-select accounts-section__row-item"
    :disabled="disabled"
  >
    <option
      v-for="(option, i) in options"
      :key="i"
      :value="typeof option === 'string' ? option : option.selectValue"
    >
      {{ typeof option === 'string' ? option : option.selectLabel }}
    </option>
  </select>
</template>

<style scoped></style>
