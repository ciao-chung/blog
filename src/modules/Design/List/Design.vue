<template>
  <div data-role="design-item" class="col-md-4">
    <div class="photo-wrap" v-if="design.photo">
      <img :src="design.photo.url">
    </div>

    <h3>{{design.name}}</h3>

    <div class="info">
      <div class="item">
        <label>{{'design.data.url'| trans}}</label>
        <div>
          <a v-if="isUrl(design.url)" target="_blank" :href="design.url">{{design.url}}</a>
          <span v-if="!isUrl(design.url)">{{design.url}}</span>
        </div>
      </div>

      <div class="item">
        <label>{{'design.data.period'| trans}}</label>
        <div>{{design.period}}</div>
      </div>

      <div class="item">
        <label>{{'design.data.brief'| trans}}</label>
        <div>{{design.brief}}</div>
      </div>

    </div>
  </div>
</template>

<script>
import Helper from 'libs/helper.js'
export default {
  props: {
    design: {
      type: Object,
    },
  },
  methods: {
    isUrl: function (string) {
      return Helper.isUrl(string)
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="design-item"]
  margin-bottom: 60px
  height: 450px
  .photo-wrap
    width: 100%
    height: 200px
    overflow: hidden
    border: 1px $light-gray solid
    img
      width: 100%
  .info
    .item
      margin: 10px 0
</style>