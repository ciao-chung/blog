<template>
  <div data-role="fixed">
    <Jump/>
  </div>
</template>

<script>
import Jump from 'components/Base/Fixed/Jump'
export default {
  components: {
    Jump,
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="fixed"]
  z-index: $fixed-zindex
  position: fixed
  top: 50%
  right: 0
  margin-left: 30px
  &>*
    display: block
    margin: 10px 0
    &.btn
      text-align: center
      width: 40px
      &:active
        shadow: none
        border: none
        outline: none
</style>