/** 参考/libs/ts-playground/typescriptServices里面的transpileModule方法 */
const transpile = (input:string, options = {
  module: 2,
  noLib: true,
  noResolve: true,
  suppressOutputPathCheck: true,
  target: 1,
  jsx: false
}) => {
  const inputFileName = options.jsx ? 'module.tsx' : 'module.ts'
  const ts = window.ts
  const sourceFile = ts.createSourceFile(inputFileName, input, options.target || ts.ScriptTarget.ES5)
  // Output
  let outputText
  const program = ts.createProgram([inputFileName], options, {
    getSourceFile: function (fileName:string) { return fileName.indexOf('module') === 0 ? sourceFile : undefined },
    writeFile: function (_name:string, text:string) { outputText = text },
    getDefaultLibFileName: function () { return 'lib.d.ts' },
    useCaseSensitiveFileNames: function () { return false },
    getCanonicalFileName: function (fileName:string) { return fileName },
    getCurrentDirectory: function () { return '' },
    getNewLine: function () { return '\r\n' },
    fileExists: function (fileName:string) { return fileName === inputFileName },
    readFile: function () { return '' },
    directoryExists: function () { return true },
    getDirectories: function () { return [] }
  })
  // Emit
  program.emit()
  if (outputText === undefined) {
    throw new Error('Output generation failed')
  }
  return outputText
}

export default transpile
