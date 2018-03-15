<template>
  <div data-role="close-button" :active="closeStatus" @click="toggle"></div>
</template>

<script>
export default {
  props: {
    close: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      closeStatus: false,
      transition_duration: 500
    }
  },
  methods: {
    toggle: function () {
      this.closeStatus = !this.closeStatus
      setTimeout(this.emitChangeEvent, this.transition_duration)
    },
    set: function (value = false) {
      this.closeStatus = value
    },
    emitChangeEvent: function () {
      this.$emit('change', this.closeStatus)
    },
  },
  watch: {
    close: function () {
      this.set(this.close)
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
$close-button-size: 30px
@mixin draw-diagonal ($deg)
  content: ''
  height: $close-button-size
  border-left: 2px solid #fff
  position: absolute
  transform: rotate($deg)
  left: $close-button-size/2
div[data-role="close-button"]
  cursor: pointer
  width: $close-button-size
  height: $close-button-size
  position: relative
  background-color: $red

  &:before
    transition: all 0.5s ease
    @include draw-diagonal(45deg)
  &:after
    transition: all 0.5s ease
    @include draw-diagonal(-45deg)
  &[active]

    &:before
      transition: all 0.5s ease
      @include draw-diagonal(270deg)
    &:after
      transition: all 0.5s ease
      @include draw-diagonal(-270deg)
</style>