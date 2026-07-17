<template>
  <span
    class="inline-flex items-baseline gap-1.5 whitespace-nowrap rounded-sm px-2 pb-1 pt-1.5 font-mono text-sm font-medium leading-none"
    :class="sharp
      ? 'border border-line border-b-2 border-b-black bg-keyblack text-bone'
      : 'border border-line border-b-2 border-b-[#CBD5E4] bg-bone text-keyblack'"
  >
    {{ midiToNote(note) }}
    <span class="text-[11px] opacity-50">{{ note }}</span>
  </span>
</template>

<script lang="ts" setup>
import { midiToNote } from '~/utils';

const props = defineProps({
  note: {
    type: Number,
    required: true
  }
})

// Sharps render as black keys, naturals as white keys.
const sharp = computed(() => [1, 3, 6, 8, 10].includes(props.note % 12))
</script>
