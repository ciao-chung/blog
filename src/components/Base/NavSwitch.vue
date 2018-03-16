<template>
  <div data-role="close-button" :active="!open" @click="switchNav"></div>
</template>

<script>
export default {
  data: function () {
    return {
      open: false,
    }
  },
  methods: {
    switchNav: function () {
      this.open = !this.open
      this.$emit('switchNav', this.open)
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
$close-button-size: $nav-height/2
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
  position: absolute
  top: ($nav-height - $close-button-size)/2
  right: 10px
  @media(min-width: 992px)
    display: none
    pointer-events: none

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