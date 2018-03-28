<template>
  <transition name="transition-lightbox">
    <div data-role="light-box-wrap" v-if="open">
      <div data-role="light-box">
        <div class="close-button-wrap">
          <CloseButton @change="change"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CloseButton from 'components/Ciao/CloseButton'
export default {
  created: function () {
    this.$root.$on('lightbox')
    this.$root.$on('lightbox.close', this.close)
  },
  beforeDestroy: function () {
    this.$root.$off('lightbox')
    this.$root.$off('lightbox.close')
  },
  data: function () {
    return {
      open: true,
    }
  },
  methods: {
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
    height: $height
    left: calc(50% - #{$width}/2)
    top: calc(50% - #{$height}/2)
    background: $white
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