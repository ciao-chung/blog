const chalk = require('chalk')
const { production, develop } = require('../static/config/config.js')
const { writeJsonSync } = require('fs-extra')
class ApiBaseSwitcher {
  constructor() {
    this.file_path = 'static/config/apibase.json'
  }

  productionMode() {
    console.log(chalk.yellow('apibase轉為production模式...'))
    writeJsonSync(this.file_path, production)
  }

  developMode() {
    console.log(chalk.yellow('apibase轉為develop模式...'))
    writeJsonSync(this.file_path, develop)
  }
}
module.exports = new ApiBaseSwitcher()