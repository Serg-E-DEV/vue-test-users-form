<script setup lang="ts">
import ResetButton from '@/shared/ui/ResetButton.vue';
import SpriteIcon from '@/shared/ui/SpriteIcon.vue';

interface Props {
  sprite?: string;
  icon: string;
  width?: number;
  height?: number;
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
  width: 24,
  height: 24,
});
</script>

<template>
  <ResetButton class="icon-button">
    <SpriteIcon
      :sprite="props.sprite"
      :icon="props.icon"
      :width="props.width"
      :height="props.height"
    />
  </ResetButton>
</template>

<style scoped></style>
