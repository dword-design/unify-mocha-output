import { endent, property } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import { execaCommand } from 'execa'
import fs from 'fs-extra'
import P from 'path'

import self from './index.js'

export default tester(
  [
    async function () {
      await fs.outputFile(
        P.join('test', 'test.js'),
        endent`
      import { delay } from '@dword-design/functions'

      describe('index', () => {
        it('test1', () => delay(50))
        it('test2', () => delay(50))
      })
    `
      )

      const output = execaCommand('mocha') |> await |> property('stdout')
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
