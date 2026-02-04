<script setup lang="ts">
import IconButton from '@/shared/ui/IconButton.vue';
import BaseInput from '@/shared/ui/BaseInput.vue';

import { computed, ref } from 'vue';

interface Props {
  name?: string;
  placeholder?: string;
  maxlength?: number;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
}

withDefaults(defineProps<Props>(), {
  name: 'password',
  placeholder: 'Введите пароль',
  maxlength: 100,
  disabled: false,
  required: false,
  error: false,
});

const emit = defineEmits(['blur']);

const model = defineModel<string | null>({ required: true, default: '' });

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
      :maxlength="maxlength"
      :name="name"
      :required="required"
      :error="error"
      @blur="(e) => emit('blur', e)"
    />
    <IconButton
      :class="['password-field__button', { 'password-field__button_inactive': !isVisible }]"
      icon="eye-slash"
      @click="isVisible = !isVisible"
    />
  </div>
</template>

<style scoped></style>
