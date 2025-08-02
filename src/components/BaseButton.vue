<script setup lang="ts">
interface Props {
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  theme: '',
});
const themeModificator = props.theme && `base-button_theme_${props.theme}`;
</script>

<template>
  <button type="button" :class="['base-button', themeModificator]">
    <span class="base-button__inner">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
