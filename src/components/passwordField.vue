<script setup lang="ts">
import IconButton from '@/components/IconButton.vue';
import BaseInput from '@/components/BaseInput.vue';

import { computed, ref } from 'vue';

const model = defineModel<string>({ required: true, default: '' });

interface Props {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Введите пароль',
  disabled: false,
  required: false,
});

const isVisible = ref(false);
const inputType = computed(() => (isVisible.value ? 'text' : 'password'));
</script>

<template>
  <div class="password-field">
    <BaseInput
      v-model="model"
      :type="inputType"
      class="password-field__input"
      :placeholder="placeholder"
      name="password"
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
