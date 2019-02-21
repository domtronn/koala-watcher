const File = require('./file')
const { header } = require('./printer')
const logUpdate = require('log-update')

class Store {
  constructor (watchDir, outDir) {
    this.watchDir = watchDir
    this.outDir = outDir
    this.files = []
  }

  setLatest (path) { this.latest = path }
  isLatest (path) { return this.latest === path }
  hasFile (path) { return this.files.find(file => file.path === path) }

  addFile (path) {
    if (this.hasFile(path)) return
    this.files = this.files.concat(new File(path))
  }

  buildFile (path) {
    return this.files
      .find(file => file.path === path)
      .build()
  }

  print (path) {
    const result = this.files
      .filter(file => !!file.value)
      .sort((a, b) => a.name < b.name)
      .reduce((acc, file) => {
        const head = header(file, this.isLatest(file.path))
        return `${acc}${head}\n${file.value}\n`
      }, '')

    logUpdate(result)
  }

  run (path) {
    return Promise
      .all(
        this.files
          .filter(f => !path || f.path === path)
          .map(f => f.exec())
      )
  }
}

module.exports = Store
