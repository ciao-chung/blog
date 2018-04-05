import localStorage from 'libs/storage/localStorage.js'

class Token {
  constructor() {
    this.timeout = null
    this.refreshData()

    // token過期或格式錯誤就清除
    if(!this.isValid()) {
      this.clear()
      return
    }
    this.countdown()
  }

  refreshData() {
    this.type = this.getType()
    this.info = this.getInfo()
  }

  get() {
    return localStorage.get('token')
  }

  set(token) {
    localStorage.set('token', token)
    this.refreshData()
    this.countdown()
  }

  clear() {
    localStorage.delete('token')
    this.refreshData()
  }

  renew() {
    const self = this
    if(!$.request) {
      setTimeout(() => {
        self.renew()
      }, 100)
      return
    }
  }

  now() {
    return Math.floor(new Date().getTime()/1000)
  }

  getType() {
    const info = this.getInfo()
    if(!info) return null
    return info.type
  }

  getRole() {
    const info = this.getInfo()
    if(!info) return null
    if(!info.data) return null
    return info.data.role
  }

  getData() {
    const info = this.getInfo()
    if(!info) return null
    return info.data
  }

  // 倒數計時
  countdown() {
    if(!this.get()) return
    const info = this.getInfo()
    const now = this.now()
    const surplusTime = info.exp - now
    const self = this

    // 剩餘時間>5分鐘
    if(surplusTime > (60 * 5)) {
      this.timeout = window.setTimeout(() => {
        self.renew()
      }, (surplusTime - (60 * 5)) * 1000)
      return
    }

    // 剩餘時間在5分鐘內
    if (surplusTime <= (60 * 5) && surplusTime > 0) {
      this.renew()
      return
    }

    // token過期直接清除
    this.clear()
  }

  // 是否有效
  isValid() {
    if(!this.get()) return false
    if(!this.getInfo()) return false
    const now = this.now()
    return this.getInfo().exp && this.getInfo().exp > now
  }

  // 取得token中的資料
  getInfo() {
    if(!this.get()) return null
    try {
      const tokenInfo = JSON.parse(atob(this.get().split('.')[1]))
      return tokenInfo
    } catch(error) {
      return null
    }
  }

  hasRole(roles) {
    const tokenRole = this.getRole()

    // 沒登入 && menu沒設定權限
    if(!tokenRole && !roles) return true

    // 沒登入 && menu有設定權限
    if(!tokenRole && roles) return false

    // 有登入 && menu沒設定權限
    if(tokenRole && !roles) return false

    // menu有設定ROLE_ANY
    if(roles.indexOf('ROLE_ANY') > -1) return true

    // 權限是工程帳號
    if(tokenRole.indexOf('ROLE_MAINTAINER') > -1) return true

    for(const role of tokenRole) {
      // token內的權限有一個是符合menu權限的設定
      if(roles.indexOf(role) > -1) return true
    }

    return false
  }
}

export default new Token()