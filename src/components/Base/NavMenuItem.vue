<template>
  <li>
    <!--外部連結-->
    <a :href="item.url" target="_blank" v-if="type == 'url'">
      <i class="fa" :class="'fa-'+item.icon"></i>
      <span>{{item.label| trans}}</span>
    </a>

    <!--內部路由-->
    <router-link :to="item.route" v-if="type == 'route'">
      <i class="fa" :class="'fa-'+item.icon"></i>
      <span>{{item.label| trans}}</span>
    </router-link>

    <!--群組連結-->
    <a v-if="type == 'group'" @click="switchSubMenu">
      <i class="fa" :class="'fa-'+item.icon"></i>
      <span>{{item.label| trans}}</span>
    </a>

    <ul v-if="type == 'group'" class="sub-menu-container" :open="sub_menu_open">
      <MenuItem v-for="sub_item, index in item.sub"
        :key="index"
        :item="sub_item"/>
    </ul>
  </li>
</template>

<script>
import MenuItem from 'components/Base/NavMenuItem.vue'
export default {
  name: 'MenuItem',
  props: ['item'],
  data: function () {
    return {
      sub_menu_open: false,
    }
  },
  created: function () {
    this.$root.$on('switch.sub.menu', this.close)
  },
  beforeDestroy: function () {
    this.$root.$off('switch.sub.menu')
  },
  methods: {
    switchSubMenu: function () {
      this.sub_menu_open = !this.sub_menu_open
      this.$root.$emit('switch.sub.menu', this.item.label)
    },
    close: function (label) {
      if(this.item.label == label) return
      this.sub_menu_open = false
    },
  },
  components: {
    MenuItem,
  },
  computed: {
    type: function () {
      if(this.item.sub) return 'group'
      if(this.item.route) return 'route'
      return 'url'
    },
  }
}
</script>

<style lang="sass" type="text/sass" scoped>
</style>