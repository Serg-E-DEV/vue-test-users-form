<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import BaseInput from '@/components/BaseInput.vue';

import { computed, ref } from 'vue';

interface Props {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  name: 'password',
  placeholder: 'Введите пароль',
  disabled: false,
  required: false,
});

const model = defineModel<string | null>({ required: true, default: '' });

const isVisible = ref(false);
const inputType = computed(() => (isVisible.value ? 'text' : 'password'));

const normalizedModel = computed({
  get: () => model.value ?? '',
  set: (val) => (model.value = val),
});
</script>

<template>
  <div class="password-field">
    <BaseInput
      v-model="normalizedModel"
      :type="inputType"
      class="password-field__input"
      :placeholder="placeholder"
      :name="name"
      :required="required"
    />
    <IconButton
      :class="['password-field__button', { 'password-field__button_inactive': !isVisible }]"
      icon="eye-slash"
      @click="isVisible = !isVisible"
    />
  </div>
</template>

<style scoped></style>
