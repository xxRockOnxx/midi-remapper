<template>
  <div>
    <div
      style="background-image: linear-gradient(135deg, rgb(60, 140, 231) 10%, rgb(0, 234, 255) 100%);"
    >
      <div class="container mx-auto p-6 sm:p-8 lg:p-12 xl:p-20">
        <h1 class="text-xl text-white font-medium sm:text-2xl xl:text-4xl">
          Free Online MIDI Remapper
        </h1>

        <p class="text-white leading-relaxed lg:text-lg xl:mt-2 xl:text-xl">
          A free online tool to remap MIDI notes.<br>
          This can't be any more simple and easy to use.
        </p>

        <div class="mt-2 space-y-2 xl:mt-4">
          <a
            href="https://github.com/xxRockOnxx/midi-remapper"
            target="_blank"
            class="flex items-center text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              fill="currentColor"
              style="width: 1em; height: 1em;"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>

            <div class="ml-2 lg:text-lg">
              Github
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="p-6 container mx-auto sm:p-8 lg:px-12 xl:px-20">
      <div class="form-control max-w-md">
        <label
          for="file"
          class="label"
        >
          <span class="label-text">Pick a file</span>
        </label>

        <input
          id="file"
          type="file"
          class="file-input file-input-bordered w-full"
          accept=".mid"
          @change="onFileChange"
        >
      </div>

      <div class="mt-4 form-control max-w-md">
        <label
          class="label"
          for="channel"
        >
          <span class="label-text">Channel to remap</span>
        </label>

        <select
          id="channel"
          v-model="selectedChannel"
          class="select select-bordered"
        >
          <option :value="-1">
            All Channels
          </option>
          <option
            v-for="({ channel }) in sortedChannels"
            :key="channel"
            :value="channel"
          >
            {{ channel }}
          </option>
        </select>

        <div class="mt-2 text-sm text-gray-500">
          If you select "All Channels", all channels will be remapped.
        </div>
      </div>

      <MappingSelect
        v-model="sourceInstruments"
        class="mt-4"
        type="source"
      />

      <MappingSelect
        v-model="targetInstruments"
        class="mt-4"
        type="target"
      />

      <div class="mt-4">
        <div
          v-if="!appliedSource || !appliedTarget"
          class="text-sm text-gray-500"
        >
          No mapping applied
        </div>

        <div
          v-else
          class="text-sm text-gray-500"
        >
          Applied mapping:
          <span class="font-bold">{{ getLibraryName(appliedSource) }}</span>
          <span> -> </span>
          <span class="font-bold">{{ getLibraryName(appliedTarget) }}</span>
        </div>

        <button
          type="button"
          class="mt-4 btn btn-secondary"
          @click="applyPresetToMIDI"
        >
          Apply Mapping to MIDI
        </button>
      </div>

      <table class="mt-10 table table-lg">
        <thead>
          <tr>
            <th>Original Note</th>
            <th>Source Instrument</th>
            <th>Remapped Note</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="Object.keys(mapping).length === 0">
            <td
              colspan="3"
              class="p-2 text-center"
            >
              No notes available
            </td>
          </tr>

          <tr
            v-for="(remapped, original) in mapping"
            v-else
            :key="original"
            class="hover"
          >
            <td>{{ midiToNote(original) }} ({{ original }})</td>
            <td>
              {{ appliedSource ? getPresetInstrument(appliedSource, original) : '-' }}
            </td>
            <td>
              <select
                v-model="mapping[original]"
                class="select select-bordered w-full"
              >
                <option
                  v-for="number in 128"
                  :key="number - 1"
                  :value="number - 1"
                >
                  {{ midiToNote(number - 1) }} ({{ number - 1 }})
                </option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-10 text-center">
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="!midi"
          @click="download"
        >
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateMappingFromMIDI, getLibraryName, getName, midiToNote, remapMIDI, transformMapping } from '@/utils';
import { Midi } from '@tonejs/midi';
import { GENERAL_MIDI, MM_GGD, OKW_AR_GGD, type Instruments } from './mapping';

const filename = ref('')
const midi = ref<null | Midi>(null)
const selectedChannel = ref(-1)

const appliedSource = ref<string|null>(null)
const appliedTarget = ref<string|null>(null)
const sourceInstruments = ref('gm')
const targetInstruments = ref('mm-ggd')

const sortedChannels = computed(() => {
  if (!midi.value) {
    return []
  }

  return midi.value.tracks.sort((a, b) => a.channel - b.channel)
})

const mapping = ref<Record<number, number>>({})

watch([midi, selectedChannel], () => {
  if (!midi.value) {
    mapping.value = {}
  } else {
    mapping.value = generateMappingFromMIDI(midi.value, selectedChannel.value)
  }
})

function onFileChange(evt: Event) {
  const file = (evt.target as HTMLInputElement).files![0]

  Midi.fromUrl(URL.createObjectURL(file))
    .then((parsed) => {
      filename.value = file.name
      midi.value = parsed
    })
    .catch((error) => {
      alert('Error parsing MIDI file')
      console.error(error)
    })
}

function getPresetInstruments(preset: string): Instruments|undefined {
  switch (preset) {
    case 'gm':
      return GENERAL_MIDI
    case 'mm-ggd':
      return MM_GGD
    case 'okw-ar-ggd':
      return OKW_AR_GGD
    default:
      return undefined
  }
}

function applyPresetToMIDI() {
  if (Object.keys(mapping.value).length === 0) {
    return
  }

  const source = getPresetInstruments(sourceInstruments.value)

  if (!source) {
    throw new Error('Invalid source mapping')
  }

  const target = getPresetInstruments(targetInstruments.value)

  if (!target) {
    throw new Error('Invalid target mapping')
  }

  mapping.value = transformMapping(mapping.value, source, target)
  appliedSource.value = sourceInstruments.value
  appliedTarget.value = targetInstruments.value
}

function getPresetInstrument(preset: string, note: number): string {
  const map = getPresetInstruments(preset)

  if (!map) {
    throw new Error('Invalid preset')
  }

  return getName(map[note])
}

function download() {
  if (!midi.value) {
    return
  }

  const newMidi = remapMIDI(midi.value, mapping.value)

  const blob = new Blob([newMidi.toArray()], {
    type: 'audio/midi',
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = filename.value.replace(/\.mid$/i, (match) => ` (remapped)${match}`)
  a.click()

  URL.revokeObjectURL(url)
}
</script>
