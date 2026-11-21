import { describe, expect, it } from 'vitest'
import pkg from '../../package.json'

describe('dependencies', () => {
  it('AC-4: depends on zod 4 (fixes GHSA-mrhx-c7xc-m3w5)', () => {
    expect(pkg.dependencies.zod).toMatch(/^\^4\./)
  })
})
