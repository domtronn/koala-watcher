const spinners = require('cli-spinners')
const { bgBlack, white } = require('chalk')
const { resolve } = require('path')
const { existsSync } = require('fs')
const args = require('minimist')(process.argv.slice(2))

const [ path = '' ] = args._
const cwd = process.cwd()

/* Config constants */
const watchDir = resolve(cwd, path)
const outDir = args['out-dir'] || args['o']
  ? resolve(cwd, args['out-dir'] || args['o'])
  : null

const babelrc = args['babelrc'] || args['b']
  ? existsSync(resolve(cwd, args['babelrc'] || args['b']))
  : null

process.env.DEBUG && console.log(bgBlack(white('--- 📁 config ')))
process.env.DEBUG && console.log('watchdir : ', watchDir)
process.env.DEBUG && console.log('outdir   : ', outDir)
process.env.DEBUG && console.log('babelrc  : ', babelrc)

/* Command constants */
const init = babelrc
  ? `npx babel ${watchDir} --out-dir ${outDir}`
  : ''

const run = ({ src, out }) => babelrc ? `node ${out}` : `node ${src}`
const build = ({ src, out }) => babelrc && `npx babel ${src} --out-file ${out}`

process.env.DEBUG && console.log(bgBlack(white('--- 🚀 commands ')))
process.env.DEBUG && console.log('init  : ', init)
process.env.DEBUG && console.log('run   : ', run({ src: '{src}', out: '{out}' }))
process.env.DEBUG && console.log('build : ', build({ src: '{src}', out: '{out}' }))

/* Symbols & Spinners */

const symbol = args['symbol'] || args['s'] || '🐨'
const spinner = args['spinner'] || args['S']
  ? spinners[args['spinner'] || args['S'] || 'dots']
  : spinners.dots

const spinnerFrame = () => spinner.frames[Math.floor((new Date() / spinner.interval) % spinner.frames.length)]

process.env.DEBUG && console.log(bgBlack(white('--- 🌞 symbols ')))
process.env.DEBUG && console.log('symbol  : ', symbol)
process.env.DEBUG && console.log('spinner : ', spinner.frames)

module.exports = { outDir, watchDir, babelrc, cmd: { init, run, build }, spinner, spinnerFrame, symbol }
