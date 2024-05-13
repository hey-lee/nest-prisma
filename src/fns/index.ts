import { URLSearchParams } from 'url'

export const getParams = (path: string = ``) => {
  const [, search = ``] = path.split(`?`)
  return new URLSearchParams(search)
}

export const matchPermissions = (
  permissions: string[],
  userPermissions: string[],
): boolean => {
  return permissions.some((permission) => userPermissions.includes(permission))
}
