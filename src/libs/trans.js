import Vue from 'vue'
import transData from 'modules/trans.js'
import config from 'static/config/config.js'
import localStorage from 'libs/storage/localStorage.js'

class Lang {
  constructor() {
    this.lang = localStorage.get('lang')
    if(this.lang == null) {
      this._setDefaultLang()
    }

    const locale = navigator.language || navigator.userLanguage
    localStorage.set('locale', locale.replace('-', '_'))

    window.trans = (string) => {
      return this.trans(string)
    }

    Vue.filter('trans', (string) => {
      return this.trans(string)
    })
  }

  trans(string) {
    if(!string) return string

    if(!transData[this.lang]) {
      return string
    }

    // 回傳翻譯後的文字
    if(transData[this.lang][string]) return transData[this.lang][string]

    // 回傳原文字
    return string
  }

  _setDefaultLang() {
    localStorage.set('lang', config.defaultLang)
    this.lang = config.defaultLang
  }

  getLang() {
    return this.lang
  }
}

export default function() {
  return new Lang()
}