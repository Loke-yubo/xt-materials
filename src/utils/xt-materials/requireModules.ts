export function requireModules<T extends any[] = any[]> (
  modules: string[]
): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      window.xtRequire(modules, function (...results: T) {
        resolve(results)
      })
    } catch (err) {
      reject(err)
    }
  })
}
