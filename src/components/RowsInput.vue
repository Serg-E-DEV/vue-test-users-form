<script setup lang="ts">
import { ModelRef, onMounted, onUpdated, ref } from 'vue';
import { normalizeLabelsInput } from '@/modules/utils';

const model = defineModel({ required: true, default: '' }) as ModelRef<string>;

interface Props {
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Введите значение',
  disabled: false,
});

const textareaEl = ref<HTMLTextAreaElement>();

function adjustHeight() {
  if (!textareaEl.value) {
    return;
  }
  textareaEl.value.style.height = 'auto';
  textareaEl.value.style.height = textareaEl.value.scrollHeight + 'px';
}

onMounted(() => {
  adjustHeight();
});

onUpdated(() => {
  adjustHeight();
});
</script>

<template>
  <textarea
    ref="textareaEl"
    v-model="model"
    :placeholder="props.placeholder"
    class="base-input rows-input"
    rows="1"
    maxlength="70"
    @blur="model = normalizeLabelsInput(model)"
  />
</template>

<style scoped></style>
