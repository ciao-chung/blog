<template>
  <div id="app">
    <MainNav/>
    <MainLoading v-if="loading"/>
    <MainExtra/>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import MainLoading from 'components/Loading/PushingPixels.vue'
import MainExtra from 'components/Base/Extra.vue'
import MainNav from 'components/Base/Nav.vue'
export default {
  name: 'app',
  computed: {
    loading: function () {
      return this.$store.getters.loading
    },
  },
  components: {
    MainLoading,
    MainExtra,
    MainNav,
  }
}
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="font-awesome/css/font-awesome.min.css"></style>
<style lang="sass" type="text/sass">
@import 'src/assets/base'
#app
  min-height: 100vh
</style>