export function merge<T extends object>(...objs: Partial<T>[]): T {
  return Object.assign({}, ...objs)
}
