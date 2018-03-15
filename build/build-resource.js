require('shelljs/global')
const path = require('path')
module.exports = function() {
  const cwd = process.cwd().split('/')
  const cwd_length = cwd.length
  const folder = cwd[cwd_length-1]
  exec(`node command/BuildResource --folder=${folder}`, { cwd: path.resolve(process.cwd(), '../')})
}