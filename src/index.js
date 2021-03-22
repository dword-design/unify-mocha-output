import { replace } from '@dword-design/functions'

export default x => x |> replace(/ \(\d+ms\)/g, '') |> replace(/√/g, '✓')
