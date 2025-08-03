<script setup lang="ts">
import SpriteIcon from '@/components/SpriteIcon.vue';

interface Props {
  sprite?: string;
  icon: string;
  width?: number;
  height?: number;
  href?: string;
  target?: '_blank' | '_self';
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
  width: 16,
  height: 16,
  href: '#',
  target: '_blank',
});
</script>

<template>
  <a :href="props.href" :target="props.target" class="icon-button">
    <SpriteIcon
      :sprite="props.sprite"
      :icon="props.icon"
      :width="props.width"
      :height="props.height"
    />
  </a>
</template>

<style scoped></style>
