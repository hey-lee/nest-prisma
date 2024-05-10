import { URLSearchParams } from 'url'

export const getParams = (path: string = ``) => {
  const [, search = ``] = path.split(`?`)
  return new URLSearchParams(search)
}

export const matchPermissions = (
  permissions: string[],
  roles: { permissions: string[] }[] = [],
): boolean => {
  const flatten = roles.map(({ permissions }) => permissions).flat()
  return permissions.some((permission) => flatten.includes(permission))
}
