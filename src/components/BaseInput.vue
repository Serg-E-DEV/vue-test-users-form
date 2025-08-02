<script setup lang="ts">
const model = defineModel<string>({ required: true, default: '' });
interface Props {
  type?: string;
  placeholder?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: 'Введите значение',
});
</script>

<template>
  <input v-model="model" :type="props.type" :placeholder="props.placeholder" class="base-input" />
</template>

<style scoped></style>
