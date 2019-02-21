const { resolve, basename } = require('path')
const { existsSync } = require('fs')
const { exec } = require('child_process')

const { watchDir, outDir, cmd } = require('./const-args')
const cwd = process.cwd()

class File {
  constructor (path) {
    this.path = path
    this.name = basename(path)
    this.inputPath = resolve(cwd, path)
    this.outputPath = this.inputPath.replace(watchDir, outDir)

    const cmdArgs = { src: this.inputPath, out: this.outputPath }
    this.runCmd = cmd.run(cmdArgs)
    this.buildCmd = cmd.build(cmdArgs)
  }

  exists () {
    existsSync(this.path)
  }

  build () {
    this.running = true
    return new Promise((resolve, reject) => {
      if (!this.buildCmd) return resolve()

      exec(this.buildCmd, (err, stdout) => {
        if (!err) return resolve()

        this.err = !!err
        this.value = err.message
      })
    })
  }

  exec () {
    this.running = true
    const start = new Date()
    return new Promise((resolve, reject) => {
      if (!this.exists) {
        this.err = true
        this.value = `File does not exist ${this.path}}`

        this.running = false
        return resolve()
      }

      exec(this.runCmd, (err, stdout) => {
        this.execTime = new Date() - start
        this.runTime = new Date()
        this.err = !!err
        this.value = err ? err.message : stdout
        this.running = false
        resolve()
      })
    })
  }
}

module.exports = File
