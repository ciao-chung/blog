import Vue from 'vue'
let createPopover = (el, binding, mode) => {
  let customConfig
  $(el).popover('destroy')
  
  if(mode == 'inserted' || mode == 'update') {
    customConfig = binding.value
  }

  let defaultConfig = {
    html: true,
    content: '',
    placement: 'right',
    trigger: 'hover',
  }

  let _config = $.extend({}, defaultConfig)
  if(customConfig.options) {
    for(const key in customConfig.options) {
      if(!customConfig.options[key]) continue
      _config[key] = customConfig.options[key]
    }
  }

  if(!_config.content) {
    $(el).popover('destroy')
    return
  }

  setTimeout(() => {
    if(customConfig.sticky == true) {
      _config.trigger = 'manual'
      $(el).popover(_config)
      $(el).popover('show')
    }
    else {
      $(el).popover(_config)
    }
  }, 300)
}

let init = () => {
  Vue.directive('popover', {
    inserted: (el, binding) => {
      createPopover(el, binding, 'inserted')
    },
    update: (el, binding) => {
      createPopover(el, binding, 'update')
    },

    unbind: (el, binding) => {
      $(el).popover('destroy')
    },
  })
}

export default init()
