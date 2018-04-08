class ServerSideRender {
  constructor() {
    this.is_ssr = typeof window.callPhantom === 'function'
  }

  done() {
    $('body').append('<div ssr-done></div>')
    if(!this.is_ssr) return
    window.callPhantom('page.done')
  }

  error() {
    $('body').append('<div ssr-error></div>')
    if(!this.is_ssr) return
    window.callPhantom('page.fail')
  }
}

window.SSR = new ServerSideRender