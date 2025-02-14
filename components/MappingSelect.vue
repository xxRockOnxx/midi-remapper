<template>
  <label class="form-control max-w-md w-full">
    <div class="label">
      <div class="label-text">{{ label }} library</div>
    </div>

    <select
      v-model="value"
      class="select select-bordered"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </label>
</template>

<script lang="ts" setup>
import { getLibraryName } from '~/utils';

const props = defineProps({
  exclude: {
    type: String as PropType<string | null>,
    default: null
  },

  type: {
    type: String as PropType<string>,
    required: true
  }
})

const value = defineModel<string>()

const options = [
  {
    name: getLibraryName('gm'),
    value: 'gm'
  },
  {
    name: getLibraryName('mm-ggd'),
    value: 'mm-ggd'
  },
  {
    name: getLibraryName('okw-ar-ggd'),
    value: 'okw-ar-ggd'
  },
]

const label = computed(() => {
  switch (props.type) {
    case 'source':
      return 'Source'
    case 'target':
      return 'Target'
    default:
      return 'Unknown'
  }
})
</script>
