#!/usr/bin/env node

const { exec } = require('child_process')
const { createMonitor } = require('watch')
const { watchDir, outDir, cmd } = require('../src/const-args')
const { start } = require('../src/printer')

const logUpdate = require('log-update')

const Store = require('../src/store')
const store = new Store(watchDir, outDir)

const onChange = (file) => {
  store.addFile(file)
  store.setLatest(file)
  store.buildFile(file)
    .then(store.run.bind(store))

  setInterval(store.print.bind(store), 80)
}

const onStart = (cmd) => new Promise((resolve, reject) => {
  if (!cmd) return resolve()
  exec(cmd, (err, stdout) => {
    if (err) return logUpdate.stderr(err)
    if (!err) logUpdate.stderr.clear()
    resolve()
  })
})

createMonitor(watchDir, { interval: 0.2 }, monitor => {
  onStart(cmd.init).then(_ => console.log(start))
  monitor.on('changed', onChange)
  monitor.on('created', onChange)
})
