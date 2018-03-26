<template>
  <div data-role="article-item">
    <router-link :to="{}" class="photo-warp" :default="!article.photo">
      <img v-if="article.photo" :src="article.photo.url">
      <div v-if="!article.photo" class="default-photo">
        <i class="fa fa-share-alt"></i>
      </div>
    </router-link>

    <div class="info">
      <span class="title">
        <i class="lock-icon fa fa-lock" v-if="article.is_lock"></i>
        <router-link :to="{ name: 'article-detail', params: { id: article.id } }">{{article.title}}</router-link>
      </span>

      <div class="time">
        {{article.updated_at}}
      </div>

      <div class="category" v-if="article.category">
        <router-link target="_blank" :to="{ name: 'article', query: { category: category.id } }" class="label label-info"
           v-for="category in article.category"
           :key="category.id">
          {{category.name}}
        </router-link>
      </div>
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
$photo-size: 180px
$photo-margin: 20px
div[data-role="article-item"]
  border-bottom: 1px $light-gray solid
  margin: 30px 0
  &>*
    display: inline-block
    vertical-align: top
  .photo-warp
    width: $photo-size
    height: auto
    max-height: $photo-size
    overflow: hidden
    position: relative
    margin: $photo-margin $photo-margin $photo-margin 0
    &[default]
      border: 1px $light-gray solid
      width: $photo-size
      height: $photo-size
    img
      width: 100%
      border: 1px $light-gray solid
    .default-photo
      width: 100%
      position: absolute
      top: $photo-size/2 - 24px
      text-align: center
      font-size: 30px
      color: $light-gray

  .info
    width: calc(100% - $photo-size - $photo-margin)
    &>*
      margin: 20px 0
    .title
      font-size: 18px
      .lock-icon
        color: $orange
      a
        color: $text
        &:hover
          color: $theme-color
    .time
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