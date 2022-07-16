export const requireModule = (modules: string[]) => {
  return new Promise((resolve, reject) => {
    try {
      window.xtRequire(modules, function (results: any[]) {
        resolve(results)
      })
    } catch (err) {
      reject(err)
    }
  })
}
