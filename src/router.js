import Vue from 'vue'
import Router from 'vue-router'
import Home from 'modules/Home/Home'
import Error404 from 'modules/Base/404'
import Post from 'modules/Post/Post'
import ArticleList from 'modules/Article/List/ArticleList'
import ArticleDetail from 'modules/Article/Detail/ArticleDetail'
import DesignList from 'modules/Design/List/DesignList'
import DesignDetail from 'modules/Design/Detail/DesignDetail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/404',
      name: '404',
      component: Error404,
    },
    {
      path: '/post/:code',
      name: 'post',
      component: Post,
    },
    {
      path: '/article',
      name: 'article',
      component: ArticleList,
    },
    {
      path: '/article/:id',
      name: 'article-detail',
      component: ArticleDetail,
    },
    {
      path: '/design',
      name: 'design',
      component: DesignList,
    },
    {
      path: '/design/:id',
      name: 'design-detail',
      component: DesignDetail,
    },
  ],
})
