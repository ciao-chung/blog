<template>
  <button class="btn btn-flat btn-warning jump" @click="jump">
    <i class="fa fa-angle-up up-icon" v-if="mode == 'up'"></i>
    <i class="fa fa-angle-down down-icon" v-if="mode == 'down'"></i>
  </button>
</template>

<script>
import jump from 'jump.js'
export default {
  data: function () {
    return {
      // 參考的element
      element: 'div#app',

      // 切換模式的分界高度
      divide: 500,

      // jump模式
      mode: 'down',
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.setMode)
    this.$root.$on('page.done', this.setAnchor)
    this.$root.$on('page.fail', this.setAnchor)
  },
  beforeDestroy: function() {
    this.$root.$off('page.done')
    this.$root.$off('page.fail')
  },
  methods: {
    setMode: function () {
      this.mode = ($('.jump').offset().top > this.divide) ? 'up' : 'down'
    },
    jump: function () {
      let offset = this.mode == 'up' ? 0 : $(this.element).height()

      jump(this.element, {
        duration: 300,
        offset: offset,
        a11y: false,
      })
    },
    setAnchor: function () {
      const anchor = this.$route.hash
      if(!anchor) return

      this.$nextTick(() => {
        jump(this.element, {
          duration: 1000,
          offset: $(anchor).offset().top,
          a11y: false,
        })
      })
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/mixin'
.jump
  &:hover
    .up-icon
      transition: all 0.5s ease
      transform: translate(0, -3px)

    .down-icon
      transition: all 0.5s ease
      transform: translate(0, 3px)
</style>