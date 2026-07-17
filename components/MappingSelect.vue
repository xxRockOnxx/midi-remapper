<template>
  <label class="block min-w-0">
    <span class="silkscreen">{{ label }}</span>

    <select
      v-model="value"
      class="select-hw mt-1.5"
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
  type: {
    type: String as PropType<'source' | 'target'>,
    required: true
  }
})

const value = defineModel<string>()

const options = ['gm', 'mm-ggd', 'okw-ar-ggd'].map((id) => ({
  name: getLibraryName(id),
  value: id,
}))

const label = computed(() => props.type === 'source' ? 'Source kit' : 'Target kit')
</script>
