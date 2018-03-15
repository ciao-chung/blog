import {apibase} from 'static/config/apibase.json'
import token from 'libs/token.js'

class Request {
  constructor() {
    this.apibase = apibase
    this.token = token
    this.defaultConfig = {
      url: '',
      type: 'GET',
      dataType: 'json',
      jsonDataRequest: true,
      xhrFields: {},
      processData: true,
      api: null,
      data: null,
      token: true,
    }
    this.initBaseRequest()
    this.initFileRequest()
    this.initBinaryRequest()
  }

  generateConfig(config = {}) {
    let _config = $.extend({}, this.defaultConfig)

    // 換成自訂config
    for(const property in config) {
      _config[property] = config[property]
    }

    // 設定url
    _config.url = `${apibase}${config.url}`

    // 設定token
    const token = this.token.get()
    if(_config.token == true && token) {
      _config.beforeSend = xhr => xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    }

    // 設定success promise
    _config.success = (data) => {
      return new Promise(function(resolve, reject) {
        resolve(data)
      })
    }

    // 設定error promise
    _config.error = (error) => {
      return new Promise(function(resolve, reject) {
        error.message = `api.${config.api}.${error.status}`
        reject(error)
      })
    }

    return _config
  }

  // 基本請求
  initBaseRequest() {
    if($.request) return
    $.request = (config) => {
      let _requestConfig = this.generateConfig(config)
      return $.ajax(_requestConfig)
    }
  }

  // 檔案上傳請求
  initFileRequest() {
    if($.multipart) return
    $.multipart = (config) => {
      let _requestConfig = this.generateConfig(config)
      _requestConfig.jsonDataRequest = false
      _requestConfig.processData = false
      _requestConfig.contentType = false
      _requestConfig.xhr = () => {
        let xhr = $.ajaxSettings.xhr()
        xhr.upload.addEventListener('progress', (progress) => {
          if(!config.onProgress) return
          const percentage = Math.floor(100*(progress.loaded/progress.total))
          return config.onProgress(percentage)
        }, false)
        return xhr
      }
      return $.ajax(_requestConfig)
    }
  }

  // 二進位檔案請求
  initBinaryRequest() {
    if($.binary) return
    $.binary = (config) => {
      let _requestConfig = this.generateConfig(config)
      _requestConfig.contentType = 'application/json; charset=utf-8'
      _requestConfig.dataType = 'binary'
      _requestConfig.xhrFields = { responseType: 'blob' }
      return $.ajax(_requestConfig)
    }
  }
}

export default () => {
  return new Request()
}