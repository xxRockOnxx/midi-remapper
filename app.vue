<template>
  <div class="min-h-screen bg-faceplate font-body text-silk antialiased">
    <header class="hero-gradient text-white">
      <div class="mx-auto max-w-4xl px-6 pb-8 pt-6 sm:pb-10">
        <div class="flex items-center justify-between gap-4">
          <p class="text-sm font-semibold text-white/80">
            Drum map utility · runs in your browser
          </p>

          <a
            href="https://github.com/xxRockOnxx/midi-remapper"
            target="_blank"
            class="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
              fill="currentColor"
              style="width: 1em; height: 1em;"
              aria-hidden="true"
            >
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
            </svg>
            GitHub
          </a>
        </div>

        <h1 class="mt-6 font-display text-4xl font-extrabold sm:text-5xl">
          MIDI Remapper
        </h1>

        <p class="mt-3 max-w-2xl text-lg leading-relaxed text-white/90">
          Move a drum performance between sample libraries. Drop a .mid file,
          pick the source and target kits, and download the remapped file.
          Nothing is uploaded — the file never leaves your machine.
        </p>

        <div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-white/85">
          <NoteChip :note="38" />
          <span>Snare Hit · General MIDI</span>
          <span
            class="text-white"
            aria-hidden="true"
          >→</span>
          <NoteChip :note="37" />
          <span>Snare Hit · Modern &amp; Massive</span>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-4xl space-y-8 px-6 pb-32 pt-8">
      <!-- IN -->
      <section aria-label="Input file">
        <div class="mb-3 flex items-center gap-3">
          <h2 class="silkscreen text-silk">
            In
          </h2>
          <div class="h-px flex-1 bg-line" />
          <span
            v-if="midi"
            class="silkscreen text-led"
          >File loaded</span>
        </div>

        <label
          for="file"
          class="block cursor-pointer rounded border border-dashed bg-panel px-6 py-8 text-center transition-colors focus-within:border-led focus-within:ring-1 focus-within:ring-led"
          :class="dragging ? 'border-led bg-panel-2' : 'border-line hover:border-muted'"
          @dragover.prevent="dragging = true"
          @dragleave="dragging = false"
          @drop.prevent="onDrop"
        >
          <input
            id="file"
            type="file"
            class="sr-only"
            accept=".mid,.midi"
            @change="onFileChange"
          >

          <template v-if="!midi">
            <div class="font-display text-lg font-bold">
              Drop a .mid file here
            </div>
            <div class="mt-1.5 text-base text-muted">
              or click to browse your files
            </div>
          </template>

          <template v-else>
            <div class="break-all font-mono text-base text-led">{{ filename }}</div>
            <div class="mt-1.5 text-base text-muted">
              {{ fileSummary }} · drop another file to replace it
            </div>
          </template>
        </label>

        <p
          v-if="loadError"
          class="mt-3 text-base text-signal"
        >
          {{ loadError }}
        </p>

        <div
          v-if="midi"
          class="mt-5"
        >
          <label
            class="silkscreen"
            for="channel"
          >Channel to remap</label>

          <select
            v-if="channels.length > 1"
            id="channel"
            v-model="selectedChannel"
            class="select-hw mt-1.5 max-w-xs"
          >
            <option :value="-1">
              All channels
            </option>
            <option
              v-for="channel in channels"
              :key="channel"
              :value="channel"
            >
              Channel {{ channel + 1 }}
            </option>
          </select>
          <p
            v-else
            id="channel"
            class="mt-1.5 rounded border border-line bg-panel-2 px-3 py-2.5 text-base text-silk"
          >
            Channel {{ channels[0] + 1 }} — the only channel with notes
          </p>
        </div>
      </section>

      <!-- MAP -->
      <section aria-label="Mapping preset">
        <div class="mb-3 flex items-center gap-3">
          <h2 class="silkscreen text-silk">
            Map
          </h2>
          <div class="h-px flex-1 bg-line" />
        </div>

        <div class="grid gap-3 sm:grid-cols-[1fr,auto,1fr] sm:items-end">
          <MappingSelect
            v-model="sourceLibrary"
            type="source"
          />

          <button
            type="button"
            class="btn-ghost sm:mb-[3px]"
            @click="swapLibraries"
          >
            <span aria-hidden="true">⇄</span> Swap
          </button>

          <MappingSelect
            v-model="targetLibrary"
            type="target"
          />
        </div>

        <p class="mt-3 text-base text-muted">
          <template v-if="sourceLibrary === targetLibrary">
            Source and target are the same kit, so every note stays where it is.
          </template>
          <template v-else>
            The preset applies as soon as a file is loaded. Fine-tune any note below.
          </template>
        </p>
      </section>

      <!-- NOTES -->
      <section aria-label="Note map">
        <div class="mb-3 flex items-center gap-3">
          <h2 class="silkscreen text-silk">
            Notes
          </h2>
          <div class="h-px flex-1 bg-line" />
          <span
            v-if="rows.length"
            class="silkscreen"
          >{{ rows.length }} {{ rows.length === 1 ? 'pitch' : 'pitches' }}</span>
          <button
            v-if="overrideCount"
            type="button"
            class="btn-ghost"
            @click="resetAllOverrides"
          >
            Reset {{ overrideCount }} manual
          </button>
        </div>

        <div
          v-if="!midi"
          class="rounded border border-dashed border-line px-6 py-8 text-center text-base text-muted"
        >
          No file loaded. Drop a .mid above and every pitch it uses will show up here.
        </div>

        <div
          v-else-if="rows.length === 0"
          class="rounded border border-dashed border-line px-6 py-8 text-center text-base text-muted"
        >
          No notes on channel {{ selectedChannel }}. Pick another channel above.
        </div>

        <ul
          v-else
          class="divide-y divide-line rounded border border-line bg-panel"
        >
          <li
            class="hidden gap-4 px-4 py-2.5 sm:grid sm:grid-cols-[1fr,1.5rem,1.4fr]"
            aria-hidden="true"
          >
            <span class="silkscreen">Source note</span>
            <span />
            <span class="silkscreen">Plays as</span>
          </li>

          <li
            v-for="row in rows"
            :key="row.note"
            class="grid gap-2.5 px-4 py-3.5 sm:grid-cols-[1fr,1.5rem,1.4fr] sm:items-start sm:gap-4"
          >
            <div class="flex min-w-0 items-center gap-3 sm:pt-2">
              <NoteChip :note="row.note" />
              <span
                class="text-base"
                :class="row.unknown ? 'italic text-muted' : ''"
              >
                {{ row.sourceInstrument ?? 'Unknown instrument' }}
              </span>
            </div>

            <div
              class="hidden pt-2 text-center font-mono text-muted sm:block"
              aria-hidden="true"
            >
              →
            </div>

            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <select
                  class="select-hw"
                  :value="row.target"
                  :aria-label="`Target note for ${midiToNote(row.note)}`"
                  @change="setOverride(row.note, $event)"
                >
                  <option
                    v-for="number in 128"
                    :key="number - 1"
                    :value="number - 1"
                  >
                    {{ midiToNote(number - 1) }} ({{ number - 1 }}){{ targetInstrumentLabel(number - 1) }}
                  </option>
                </select>

                <button
                  v-if="row.overridden"
                  type="button"
                  class="btn-ghost shrink-0"
                  @click="resetOverride(row.note)"
                >
                  Reset
                </button>
              </div>

              <p
                v-if="row.overridden"
                class="mt-1.5 font-mono text-xs text-led"
              >
                Manual choice — preset suggests {{ midiToNote(presetMapping[row.note]) }} ({{ presetMapping[row.note] }})
              </p>

              <p
                v-else-if="row.unknown"
                class="mt-1.5 font-mono text-xs text-muted"
              >
                Not defined in {{ shortName(sourceLibrary) }} — passes through unchanged
              </p>

              <p
                v-else-if="row.unmatched"
                class="mt-1.5 font-mono text-xs text-led"
              >
                {{ shortName(targetLibrary) }} has no {{ row.sourceInstrument }} — {{ unmatchedDetail(row) }}
              </p>
            </div>
          </li>
        </ul>
      </section>
    </main>

    <!-- OUT -->
    <div
      v-if="midi"
      class="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-panel/95 backdrop-blur"
    >
      <div class="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <div class="flex items-center gap-2.5">
          <span
            class="h-2 w-2 rounded-full bg-led"
            aria-hidden="true"
          />
          <h2 class="silkscreen text-silk">
            Out
          </h2>
        </div>

        <p class="min-w-[10rem] flex-1 text-base text-muted">
          {{ stats.remapped }} of {{ stats.total }} {{ stats.total === 1 ? 'pitch' : 'pitches' }} remapped
          <span
            v-if="stats.unmatched"
            class="text-led"
          > · {{ stats.unmatched }} unmatched</span>
        </p>

        <button
          type="button"
          class="btn-led"
          :disabled="rows.length === 0"
          @click="download"
        >
          Download remapped .mid
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateMappingFromMIDI, getName, midiToNote, remapMIDI, transformMapping, type Mapping } from '@/utils';
import { Midi } from '@tonejs/midi';
import { GENERAL_MIDI, MM_GGD, OKW_AR_GGD, type Instruments } from './mapping';

const PRESETS: Record<string, Instruments> = {
  'gm': GENERAL_MIDI,
  'mm-ggd': MM_GGD,
  'okw-ar-ggd': OKW_AR_GGD,
}

const SHORT_NAMES: Record<string, string> = {
  'gm': 'General MIDI',
  'mm-ggd': 'Modern & Massive',
  'okw-ar-ggd': 'One Kit Wonder',
}

const filename = ref('')
const midi = ref<null | Midi>(null)
const loadError = ref('')
const dragging = ref(false)
const selectedChannel = ref(-1)

const sourceLibrary = ref('gm')
const targetLibrary = ref('mm-ggd')

// Manual per-note choices, layered on top of the preset mapping.
const overrides = ref<Record<number, number>>({})

const channels = computed(() => {
  if (!midi.value) {
    return []
  }

  const found = new Set(
    midi.value.tracks
      .filter((track) => track.notes.length > 0)
      .map((track) => track.channel)
  )

  return [...found].sort((a, b) => a - b)
})

const fileSummary = computed(() => {
  if (!midi.value) {
    return ''
  }

  const noteTotal = midi.value.tracks.reduce((sum, track) => sum + track.notes.length, 0)
  const trackTotal = midi.value.tracks.filter((track) => track.notes.length > 0).length

  return `${noteTotal} ${noteTotal === 1 ? 'note' : 'notes'} across ${trackTotal} ${trackTotal === 1 ? 'track' : 'tracks'}`
})

const sourceInstruments = computed(() => PRESETS[sourceLibrary.value])
const targetInstruments = computed(() => PRESETS[targetLibrary.value])

const targetNoteByInstrument = computed(() => {
  const map = new Map<string, number>()

  for (const [note, instrument] of Object.entries(targetInstruments.value)) {
    map.set(instrument, Number(note))
  }

  return map
})

// Identity mapping of every pitch used by the file (on the selected channel).
const baseMapping = computed<Mapping>(() => {
  if (!midi.value) {
    return {}
  }

  return generateMappingFromMIDI(midi.value, selectedChannel.value)
})

// The preset layer, always derived fresh from the base so it can never compound.
const presetMapping = computed<Mapping>(() =>
  transformMapping(baseMapping.value, sourceInstruments.value, targetInstruments.value)
)

// Final mapping: manual override > preset > original.
const mapping = computed<Mapping>(() => {
  const output: Mapping = {}

  for (const key of Object.keys(baseMapping.value)) {
    const note = Number(key)
    output[note] = overrides.value[note] ?? presetMapping.value[note] ?? note
  }

  return output
})

interface Row {
  note: number
  target: number
  sourceInstrument: string | null
  overridden: boolean
  unknown: boolean
  unmatched: boolean
}

const rows = computed<Row[]>(() =>
  Object.keys(baseMapping.value).map((key) => {
    const note = Number(key)
    const instrument = sourceInstruments.value[note] ?? null
    const overridden = overrides.value[note] !== undefined
      && overrides.value[note] !== presetMapping.value[note]

    return {
      note,
      target: mapping.value[note],
      sourceInstrument: instrument ? getName(instrument) : null,
      overridden,
      unknown: !instrument,
      unmatched: !!instrument && !targetNoteByInstrument.value.has(instrument),
    }
  })
)

const overrideCount = computed(() => Object.keys(overrides.value).length)

const stats = computed(() => {
  let remapped = 0
  let unmatched = 0

  for (const row of rows.value) {
    if (row.target !== row.note) {
      remapped++
    }

    if (row.unmatched && !row.overridden) {
      unmatched++
    }
  }

  return { total: rows.value.length, remapped, unmatched }
})

function shortName(library: string): string {
  return SHORT_NAMES[library] ?? 'Unknown'
}

// Says what actually happens to an unmatched note: it either collides with a
// different instrument in the target kit, or lands on an empty slot.
function unmatchedDetail(row: Row): string {
  const occupant = targetInstruments.value[row.target]

  if (occupant) {
    return `${midiToNote(row.target)} plays ${getName(occupant)} instead`
  }

  return `${midiToNote(row.target)} has nothing assigned — it may be silent`
}

function targetInstrumentLabel(note: number): string {
  const instrument = targetInstruments.value[note]
  return instrument ? ` — ${getName(instrument)}` : ''
}

function setOverride(note: number, evt: Event) {
  const value = Number((evt.target as HTMLSelectElement).value)

  if (value === presetMapping.value[note]) {
    delete overrides.value[note]
  } else {
    overrides.value[note] = value
  }
}

function resetOverride(note: number) {
  delete overrides.value[note]
}

function resetAllOverrides() {
  overrides.value = {}
}

function swapLibraries() {
  [sourceLibrary.value, targetLibrary.value] = [targetLibrary.value, sourceLibrary.value]
}

function onFileChange(evt: Event) {
  const input = evt.target as HTMLInputElement
  const file = input.files?.[0]

  if (file) {
    loadFile(file)
  }

  // Allow picking the same file again after a failed load.
  input.value = ''
}

function onDrop(evt: DragEvent) {
  dragging.value = false

  const file = evt.dataTransfer?.files[0]

  if (file) {
    loadFile(file)
  }
}

async function loadFile(file: File) {
  loadError.value = ''

  if (!/\.midi?$/i.test(file.name)) {
    loadError.value = `"${file.name}" isn't a MIDI file. Pick a file ending in .mid.`
    return
  }

  try {
    const parsed = new Midi(await file.arrayBuffer())

    midi.value = parsed
    filename.value = file.name
    overrides.value = {}
    selectedChannel.value = -1
  } catch (error) {
    loadError.value = `Couldn't read "${file.name}". Export it from your DAW again and retry.`
    console.error(error)
  }
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
  a.download = /\.midi?$/i.test(filename.value)
    ? filename.value.replace(/\.midi?$/i, (match) => ` (remapped)${match}`)
    : `${filename.value} (remapped).mid`
  a.click()

  URL.revokeObjectURL(url)

  umTrackEvent('download', {
    source: sourceLibrary.value,
    target: targetLibrary.value,
  })
}

onMounted(() => {
  setTimeout(() => umTrackView(), 500)
})
</script>

<style>
body {
  @apply bg-faceplate;
}

::selection {
  @apply bg-led/30;
}

/* Hero faceplate — the original blue sweep */
.hero-gradient {
  background-image: linear-gradient(135deg, #3c8ce7 10%, #00eaff 100%);
}

/* Engraved silkscreen labels */
.silkscreen {
  @apply text-sm font-bold text-muted;
}

/* Hardware select control */
.select-hw {
  @apply w-full min-w-0 appearance-none truncate rounded border border-line bg-panel-2 py-2.5 pl-3 pr-9 text-base text-silk transition-colors hover:border-muted focus:outline-none focus-visible:border-led focus-visible:ring-1 focus-visible:ring-led;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' fill='none' stroke='%235E6B80' stroke-width='1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}

/* Amber LED action button */
.btn-led {
  @apply inline-flex items-center justify-center rounded bg-led px-5 py-3 font-display text-base font-bold text-bone transition-[filter] hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-led focus-visible:ring-offset-2 focus-visible:ring-offset-faceplate disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100;
}

/* Quiet utility button */
.btn-ghost {
  @apply inline-flex items-center justify-center gap-1 rounded border border-line px-2.5 py-1.5 text-sm font-semibold text-muted transition-colors hover:border-muted hover:text-silk focus:outline-none focus-visible:border-led focus-visible:text-led;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
