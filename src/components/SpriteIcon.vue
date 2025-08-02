<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  sprite?: string;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
});

const rootPath = import.meta.env.BASE_URL;

const href = computed(() => `${rootPath}sprites/${props.sprite}.svg#icon-${props.icon}`);
</script>

<template>
  <svg class="sprite-icon" aria-hidden="true" focusable="false">
    <use :xlink:href="href" :href="href"></use>
  </svg>
</template>

<style scoped></style>
