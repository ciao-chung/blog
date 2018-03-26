<template>
  <div data-role="article-item">
    <h4 class="title">
      <i class="lock-icon fa fa-lock" v-if="article.is_lock"></i>
      <router-link :to="{}">{{article.title}}</router-link>
    </h4>

    <div class="photo-warp" v-if="article.photo">
      <img :src="article.photo.url">
    </div>

    <div class="row info">
      <div class="col-md-6">
        <span>{{'article.data.created_at'| trans}}: {{article.created_at}}</span>
      </div>

      <div class="col-md-6">
        <span>{{'article.data.updated_at'| trans}}: {{article.updated_at}}</span>
      </div>
    </div>

    <div class="category" v-if="article.category">
      <router-link :to="{}" class="label label-info"
        v-for="category in article.category"
        :key="category.id">
        {{category.name}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: function () {
        return null
      }
    },
  },
  data: function () {
    return {
    }
  },
  created: function () {
  },
  methods: {
  },
}
</script>

<style lang="sass" type="text/sass" scoped>
@import 'src/assets/variable'
div[data-role="article-item"]
  border-bottom: 1px $light-gray solid
  margin: 30px 0
  padding: 0 20px
  &>*
    margin: 20px 0
  .title
    .lock-icon
      color: $orange
    a
      color: $text
      &:hover
        color: $theme-color
  .photo-warp
    width: 150px
    height: 150px
    overflow: hidden
    img
      width: 100%
  .info
    &>*
      padding: 0
    span
      color: $text
  .category
    a
      margin-right: 20px
      border-radius: 0
      font-size: 14px
</style>