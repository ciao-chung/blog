<template>
  <transition name="transition-lightbox">
    <div data-role="light-box-wrap" v-if="open">
      <div data-role="light-box">
        <div class="close-button-wrap">
          <CloseButton @change="change"/>
        </div>

        <!--標題-->
        <div class="title">{{title}}</div>

        <!--內容-->
        <div v-if="!component" v-html="content"></div>

        <!--自訂元件-->
        <component v-if="component"/>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseButton from 'components/Ciao/CloseButton'
export default {
  created: function () {
    this.$root.$on('lightbox', this.init)
    this.$root.$on('lightbox.close', this.close)
    $(window).on('keydown', (e) => {
      if(e.which != 27) return
      this.close()
    })
  },
  beforeDestroy: function () {
    this.$root.$off('lightbox')
    this.$root.$off('lightbox.close')
  },
  data: function () {
    return {
      open: false,
      title: null,
      content: null,
      component: null,
      default_delay: 3000,
      closeTimeout: null,
    }
  },
  methods: {
    init: function (config) {
      clearTimeout(this.closeTimeout)
      this.open = true
      this.title = config.title
      this.content = config.content
      this.component = config.component

      if(config.sticky) return
      const delay = !config.delay ? this.default_delay : config.delay
      this.closeTimeout = setTimeout(this.close, delay)
    },
    close: function () {
      this.open = false
    },
    change: function (status) {
      if(!status) return
      this.close()
    },
  },
  components: {
    CloseButton,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
$width: 60vw
$height: 80vh
div[data-role="light-box-wrap"]
  z-index: $lightbox-zindex
  top: 0
  left: 0
  position: fixed
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.6)
  div[data-role="light-box"]
    opacity: 1
    position: absolute
    width: $width
    max-height: $height
    left: calc(50% - #{$width}/2)
    top: calc(50% - #{$height}/2)
    background: $white
    padding: 20px
    .title
      font-size: 26px
      margin: 10px 0
      color: $theme-color
    .close-button-wrap
      position: absolute
      top: 0
      right: 0
.transition-lightbox
  &-enter-active, &-leave-active
    transition: all 0.5s ease
  &-enter, &-leave-active
    opacity: 0
</style>