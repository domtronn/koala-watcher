const { bgBlack, bgRed, bgWhite, bgCyan, white } = require('chalk')
const { watchDir, symbol, spinnerFrame } = require('./const-args')

const start = bgBlack(white(`${symbol} Koala is running... '${watchDir}'`))

const header = (file, latest = false) => {
  if (file.err) return bgRed.white(`⚠️  ${file.name}`)
  if (file.running) return bgCyan.white(`${spinnerFrame()}  ${file.runTime.toLocaleTimeString()} ${file.name}`)

  const f = latest ? bgWhite.black : bgBlack.white
  const s = latest ? symbol : ' '

  return f(`${s} ${file.runTime.toLocaleTimeString()} +${file.execTime}ms ${file.name}`)
}

module.exports = { start, header }
