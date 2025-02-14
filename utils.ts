import type { Mapping } from "./mapping";

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

export function transformMapping(
  input: Record<number, number>,
  source: Mapping,
  target: Mapping,
): Record<number, number> {
  // Loop once and create a map of target notes
  // instead of looping every time we need to convert.
  const targetNoteMap = new Map<string, number>();

  for (const [note, instrument] of Object.entries(target)) {
    targetNoteMap.set(instrument, parseInt(note, 10));
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
      return [noteAsNum, targetNoteMap.get(instrumentName) ?? originalTargetNote];
    }),
  );
}

// This should do it for now.
// Ideally we would have a mapping of constants to names.
export function getName(constant: string): string {
  return constant
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
