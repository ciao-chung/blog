class ServerSideRender {
  constructor() {
    this.is_ssr = typeof window.callPhantom == 'function'
  }

  done() {
    if(!this.is_ssr) return
    window.callPhantom('page.done')
  }

  error() {
    if(!this.is_ssr) return
    window.callPhantom('page.fail')
  }
}

window.SSR = new ServerSideRender