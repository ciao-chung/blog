<template>
  <div data-role="vcard" v-if="banner">
    <div class="photo-wrap">
      <img :src="photo" class="img-responsive img-circle">
    </div>

    <div class="title">
      {{banner.title}}
    </div>

    <div class="info">
      <div v-for="item in data">
        <i class="fa" :class="'fa-'+item.icon"></i>
        <span v-if="!item.email">{{item.text}}</span>

        <a v-if="item.email" :mailto="item.email">
          {{item.email}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Object,
      default: () => null,
    }
  },
  data: function () {
    return {
      data: [
        {
          text: 'Taichung City',
          icon: 'map-marker',
        },
        {
          text: 'NUTC',
          icon: 'graduation-cap',
        },
        {
          text: '710T海軍艦艇兵(933鳳陽軍艦)',
          icon: 'anchor',
        },
        {
          text: 'Web Developer',
          icon: 'vcard-o',
        },
        {
          email: 'ciao0958@gmail.com',
          icon: 'envelope',
        },
      ]
    }
  },
  computed: {
    photo() {
      if(!this.banner) return null
      if(!this.banner.photo) return null
      return this.banner.photo.url
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable.sass'
div[data-role="vcard"]
  margin: auto
  margin-top: 30vh
  margin-bottom: 30vh
  width: 400px
  border: 1px $light-gray solid
  border-radius: 15px
  padding: 45px
  min-width: 340px
  .photo-wrap
    text-align: center
    img
      display: initial
      max-width: 180px
  .title
    text-align: center
    margin: 30px 0
    font-size: 28px
    color: $text
  .info

    &>div
      color: $text
      margin: 15px 0
      font-size: 16px
      i
        display: inline-block
        width: 20px
        text-align: center
      span
        margin-left: 10px
      a
        margin-left: 10px
        cursor: pointer
</style>