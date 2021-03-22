import { replace } from '@dword-design/functions'

export default x => x |> replace(/ \(\d+m?s\)/g, '') |> replace(/√/g, '✓')
