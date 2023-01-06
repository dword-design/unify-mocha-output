import { endent, property } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import execa from 'execa'
import { outputFile } from 'fs-extra'
import P from 'path'

import self from '.'

export default tester(
  [
    async function () {
      await outputFile(
        P.join('test', 'test.js'),
        endent`
      const { delay } = require('@dword-design/functions')

      describe('index', () => {
        it('test1', () => delay(50))
        it('test2', () => delay(50))
      })
    `
      )

      const output = execa.command('mocha') |> await |> property('stdout')
      expect(output |> self).toMatchSnapshot(this)
    },
    function () {
      expect(
        self(endent`
  
    index
      ✓ test1 (1000ms)
      ✓ test2 (2000ms)
  
  
    2 passing
    
  `)
      ).toMatchSnapshot(this)
    },
    function () {
      expect(
        self(endent`
  
    index
      ✓ test (2s)
  
  
    1 passing
    
  `)
      ).toMatchSnapshot(this)
    },
    function () {
      expect(
        self(endent`
  
    index
      √ test1
      √ test2
  
  
    2 passing (7ms)
    
  `)
      ).toMatchSnapshot(this)
    },
    () => expect(self('1 passed (1m)')).toEqual('1 passed'),
  ],
  [testerPluginTmpDir()]
)
