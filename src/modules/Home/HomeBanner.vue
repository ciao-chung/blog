<template>
  <div v-if="photo" class="photo-wrap">
    <img :src="photo">
  </div>
</template>

<script>
export default {
  props: ['banner'],
  computed: {
    photo: function () {
      if(!this.banner) return null
      if(!this.banner.photo) return null
      if(!this.banner.photo.master) return null
      return this.banner.photo.master.url
    }
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
</style>