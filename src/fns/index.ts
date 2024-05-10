import { URLSearchParams } from 'url'

export const getParams = (path: string = ``) => {
  const [, search = ``] = path.split(`?`)
  return new URLSearchParams(search)
}
