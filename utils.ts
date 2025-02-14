import type { Midi } from "@tonejs/midi";
import type { Instruments } from "./mapping";

const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

export function midiToNote(midi: number): string {
  const note = midi % 12;
  const octave = Math.floor(midi / 12) - 1;
  return `${NOTE_NAMES[note]}${octave}`;
}

export interface Mapping {
  [note: number]: number;
}

export function generateMappingFromMIDI(midi: Midi, channel = -1): Mapping {
  const output: Mapping = {};
  const notes = midi.tracks
    .filter((track) => {
      // Not filtering by channel
      if (channel === -1) {
        return true
      }

      return track.channel === channel
    })
    .flatMap((track) => track.notes);

  for (const note of notes) {
    output[note.midi] = note.midi;
  }

  return output;
}

export function transformMapping(
  input: Mapping,
  source: Instruments,
  target: Instruments,
): Mapping {
  // Loop once and create a map of target notes
  // instead of looping every time we need to convert.
  const targetInstrumentNote = new Map<string, number>();

  for (const [note, instrument] of Object.entries(target)) {
    targetInstrumentNote.set(instrument, parseInt(note, 10));
  }

  return Object.fromEntries(
    Object.entries(input).map(([note, originalTargetNote]) => {
      const noteAsNum = parseInt(note, 10);
      const instrumentName = source[noteAsNum];

      // Source map does not have an instrument for this note.
      // Keep the original key:value pair.
      if (!instrumentName) {
        return [noteAsNum, originalTargetNote];
      }

      // Source map has an instrument for this note.
      // Check if the target map has a note for this instrument.
      // If not, keep the original key:value pair.
      return [noteAsNum, targetInstrumentNote.get(instrumentName) ?? originalTargetNote];
    }),
  );
}

export function remapMIDI(midi: Midi, mapping: Mapping): Midi {
  const newMidi = midi.clone();

  newMidi.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      note.midi = mapping[note.midi] ?? note.midi;
    })
  })

  return newMidi;
}

// This should do it for now.
// Ideally we would have a mapping of constants to names.
export function getName(constant: string): string {
  return constant
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function getLibraryName(constant: string) {
  switch (constant) {
    case 'gm':
      return 'General MIDI';
    case 'mm-ggd':
      return 'GGD Modern and Massive - GGD';
    case 'okw-ar-ggd':
      return 'GGD One Kit Wonder: Aggressive Rock - GGD'
    default:
      return 'Unknown';
  }
}
