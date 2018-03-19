<template>
  <div id="app">
    <MainNav/>
    <MainBreadcrumb />

    <div data-role="router-view-container" :class="{ container: !isFullScreen }" :fullscreen="isFullScreen">
      <router-view />
    </div>

    <MainLoading v-if="loading"/>
    <MainExtra/>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.js'
import MainLoading from 'components/Loading/PushingPixels.vue'
import MainExtra from 'components/Base/Extra.vue'
import MainNav from 'components/Base/Nav.vue'
import MainBreadcrumb from 'components/Base/Breadcrumb.vue'
export default {
  name: 'app',
  computed: {
    loading: function () {
      return this.$store.getters.loading
    },
    isFullScreen: function () {
      return !!this.$route.meta.fullscreen
    },
  },
  components: {
    MainLoading,
    MainExtra,
    MainNav,
    MainBreadcrumb,
  }
}
</script>

<style src="bootstrap/dist/css/bootstrap.min.css"></style>
<style src="font-awesome/css/font-awesome.min.css"></style>
<style lang="sass" type="text/sass">
@import 'src/assets/base'
#app
  min-height: 100vh
  div[data-role="breadcrumb"]
    margin-top: $nav-height + 30
  div[data-role="router-view-container"][fullscreen]
    margin-top: $nav-height
</style>