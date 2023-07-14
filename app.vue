<template>
  <div>
    <div
      style="background-image: linear-gradient(135deg, rgb(60, 140, 231) 10%, rgb(0, 234, 255) 100%);"
    >
      <div class="container mx-auto p-6 sm:p-8 lg:p-12 xl:p-20">
        <h1 class="text-xl text-white font-medium sm:text-2xl xl:text-4xl">
          Free Online MIDI Remapper
        </h1>

        <p class="mt-2 text-white leading-loose sm:text-lg sm:leading-loose xl:mt-4 xl:text-2xl xl:leading-loose">
          A free online tool to remap MIDI notes.<br>
          This can't be any more simple and easy to use.
        </p>
      </div>
    </div>

    <div class="p-6 container mx-auto sm:p-8 lg:p-12 xl:p-20">
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

      <div class="mt-10 form-control max-w-md">
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
      </div>

      <div class="mt-10">
        <label
          for="preset"
          class="label"
        >
          <span class="label-text">Mapping Preset</span>
        </label>

        <div class="join">
          <select
            id="preset"
            class="join-item select select-bordered"
            disabled
          >
            <option :value="-1">
              Coming Soon
            </option>
          </select>

          <button
            type="button"
            class="join-item btn"
            disabled
          >
            Save Preset
          </button>
        </div>
      </div>

      <table class="mt-10 table table-lg">
        <thead>
          <tr>
            <th>Original Note</th>
            <th>Remapped Note</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="Object.keys(mapping).length === 0">
            <td
              colspan="2"
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
            <td>{{ midiToNoteName(original) }} ({{ original }})</td>
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
                  {{ midiToNoteName(number - 1) }} ({{ number - 1 }})
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
import midiToNoteName from '@/utils';
import { Midi } from '@tonejs/midi';

const filename = ref('')
const midi = ref<null | Midi>(null)
const selectedChannel = ref(-1)

const sortedChannels = computed(() => {
  if (!midi.value) {
    return []
  }

  return midi.value.tracks.sort((a, b) => a.channel - b.channel)
})

const mapping = ref<Record<number, number>>({})

function generateMapping() {
  if (!midi.value) {
    mapping.value = {}
    return
  }

  const notes: Array<[number, number]> = midi.value.tracks
    .filter((track) => {
      if (selectedChannel.value === -1) {
        return true
      }

      return track.channel === selectedChannel.value
    })
    .flatMap((track) => track.notes)
    .map((note) => [note.midi, note.midi])

  mapping.value = Object.fromEntries(notes)
}

watch(midi, generateMapping)
watch(selectedChannel, generateMapping)

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

function download() {
  if (!midi.value) {
    return
  }

  const newMidi = toRaw(midi.value).clone()

  newMidi.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      note.midi = mapping.value[note.midi]
    })
  })

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
