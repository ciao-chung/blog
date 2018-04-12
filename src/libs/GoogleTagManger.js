import api from 'libs/api.js'

class GoogleTagManger {
  constructor() {
    this.api = api
    this.init()
  }

  async init() {
    try {
      const result = await this.api.Config('site')
      $('head').prepend(result.google_tag_manager)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new GoogleTagManger()