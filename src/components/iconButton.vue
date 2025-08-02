<script setup lang="ts">
import ResetButton from '@/components/ResetButton.vue';
import SpriteIcon from '@/components/SpriteIcon.vue';

interface Props {
  sprite?: string;
  icon: string;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  sprite: 'main',
  width: '16',
  height: '16',
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
