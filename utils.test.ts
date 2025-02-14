import { expect, test } from 'vitest'
import { transformMapping } from './utils'

test('it should remap correctly', () => {
  const sourceMapping = {
    1: 1,
  }

  const sourceNotes = {
    1: 'Kick',
  }

  const targetNotes = {
    3: 'Kick',
  }

  const output = transformMapping(sourceMapping, sourceNotes, targetNotes)

  expect(output[1], 'Should remap source note 1 to target note 3 (Kick)').toBe(3)
})

test('it should keep original note if not in source mapping', () => {
  const sourceMapping = {
    1: 1,
  }

  // Note 1 is missing from sourceNotes
  const sourceNotes = {
    3: 'Kick',
  }

  const targetNotes = {
    1: 'Kick',
  }

  const output = transformMapping(sourceMapping, sourceNotes, targetNotes)

  expect(output[1], 'Should keep original note 1').toBe(1)
})

test('it should keep original note if not in target mapping', () => {
  const sourceMapping = {
    1: 1,
  }

  const sourceNotes = {
    1: 'Kick',
  }

  // Note 1 is missing from targetNotes
  const targetNotes = {
    3: 'Snare',
  }

  const output = transformMapping(sourceMapping, sourceNotes, targetNotes)

  expect(output[1], 'Should keep original note 1').toBe(1)
})

test('it should keep original note if not in source or target mapping', () => {
  const sourceMapping = {
    1: 1,
  }

  const sourceNotes = {
    3: 'Kick',
  }

  const targetNotes = {
    4: 'Snare',
  }

  const output = transformMapping(sourceMapping, sourceNotes, targetNotes)

  expect(output[1], 'Should keep original note 3').toBe(1)
})
