const zip = require('bestzip')
const package = require('./package.json')
const fs = require('fs')

console.log('Compressing..')
const path = `./azura@spectral_v${package.version}.zip`

try {
  fs.existsSync(path) && fs.unlinkSync(path)
  zip({
    source: 'build/*',
    destination: path
  })
    .then(() => console.log('Zipped.'))
    .catch((err) => {
      console.log(err.stack)
      process.exit(1)
    })
} catch (e) {
  console.log(e.stack)
}