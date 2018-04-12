class ServerSideRender {
  done() {
    if($('meta[name="prerender-status-code"]').length == 0) {
      $('head').append('<meta name="prerender-status-code" content="200">')
      return
    }
    $('meta[name="prerender-status-code"]').attr('content', '200')
  }

  error() {
    if($('meta[name="prerender-status-code"]').length == 0) {
      $('head').append('<meta name="prerender-status-code" content="404">')
      return
    }
    $('meta[name="prerender-status-code"]').attr('content', '404')
  }
}

window.SSR = new ServerSideRender()