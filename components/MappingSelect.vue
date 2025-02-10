<template>
  <label class="form-control max-w-md w-full">
    <div class="label">
      <div class="label-text">{{ label }} mapping</div>
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
    name: 'General MIDI',
    value: 'gm'
  },
  {
    name: 'GGD Modern and Massive - GGD',
    value: 'mm-ggd'
  },
  {
    name: 'GGD One Kit Wonder: Aggressive Rock - GGD',
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
