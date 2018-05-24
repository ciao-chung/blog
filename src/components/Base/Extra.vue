<template>
  <div>
    <Fixed/>
    <VueDialog/>
  </div>
</template>

<script>
import Fixed from 'components/Base/Fixed'
import LightBox from 'components/Base/Extra/LightBox'
import Vue from 'vue'
import CiaoVueDialog from 'ciao-vue-dialog'
Vue.use(CiaoVueDialog)
export default {
  components: {
    Fixed,
  },
}
</script>

<style src="ciao-vue-dialog/dist/ciao-vue-dialog.css"></style>
<style lang="sass" type="text/sass" scoped></style>