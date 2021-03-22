import { endent } from '@dword-design/functions'

import self from '.'

export default [
  () =>
    expect(
      self(endent`
  
    index
      ✓ test1
      ✓ test2
  
  
    2 passing (7ms)
    
  `)
    ).toEqual(endent`
  
    index
      ✓ test1
      ✓ test2


    2 passing
    
  `),
  () =>
    expect(
      self(endent`
  
    index
      √ test1
      √ test2
  
  
    2 passing (7ms)
    
  `)
    ).toEqual(endent`
  
    index
      ✓ test1
      ✓ test2


    2 passing
    
  `),
  () =>
    expect(
      self(endent`
  
    index
      ✓ test1 (1000ms)
      ✓ test2 (2000ms)
  
  
    2 passing
    
  `)
    ).toEqual(endent`
  
    index
      ✓ test1
      ✓ test2


    2 passing
    
  `),
]
