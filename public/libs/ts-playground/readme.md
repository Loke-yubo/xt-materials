# ts-playground

这里的几份文件是拷贝的：https://www.tslang.cn/play/index.html里main的

- loader.js 是 amd 模块化加载库
  废弃，直接食用 requirejs，毕竟有文档
- typescriptServices.js 是 ts 库，用来编译用的
- playground.js 是 play 练习广场的编译方法的主要源码

拿到项目里面来，主要是为了编译 es6 的代码，转换为 es5

并且物料平台也可以借鉴该网站，采用 amd 模块化方案，异步加载 js 组件

## AMD 模块化方案

```javascript
require.config({})
require(...args)
define(...args)
```

## ts 对象，以及 transpileModule 方法

拿来主义哈，在[ts-play 练习广场](https://www.tslang.cn/play/index.html)上 debug 一遍就知道了

主要源码就在 playground.js 里面

```javascript
function transpileModule(input, options) {
  var inputFileName = options.jsx ? "module.tsx" : "module.ts"
  var sourceFile = ts.createSourceFile(inputFileName, input, options.target || ts.ScriptTarget.ES5)
  // Output
  var outputText
  var program = ts.createProgram([inputFileName], options, {
    getSourceFile: function (fileName) {
      return fileName.indexOf("module") === 0 ? sourceFile : undefined
    },
    writeFile: function (_name, text) {
      outputText = text
    },
    getDefaultLibFileName: function () {
      return "lib.d.ts"
    },
    useCaseSensitiveFileNames: function () {
      return false
    },
    getCanonicalFileName: function (fileName) {
      return fileName
    },
    getCurrentDirectory: function () {
      return ""
    },
    getNewLine: function () {
      return "\r\n"
    },
    fileExists: function (fileName) {
      return fileName === inputFileName
    },
    readFile: function () {
      return ""
    },
    directoryExists: function () {
      return true
    },
    getDirectories: function () {
      return []
    },
  })
  // Emit
  program.emit()
  if (outputText === undefined) {
    throw new Error("Output generation failed")
  }
  return outputText
}
```
