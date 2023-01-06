import { replace } from '@dword-design/functions'

export default x =>
  x |> replace(/ \(\d+(m|s|ms)\)/g, '') |> replace(/(√|✔)/g, '✓')
