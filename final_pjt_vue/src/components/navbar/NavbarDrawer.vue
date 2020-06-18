<template>
  <div>
    <v-list dense>
      <v-list-item class="display-5 mb-10">메뉴</v-list-item>
      <v-list-item v-for="item in showListItems" :key="item.id" :link="Boolean(item.link)" :to="item.link">
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content v-if="item.title">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        <v-divider v-if="!item.icon && !item.title"></v-divider>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: "NavbarDrawer",
  computed: {
    ...mapState('navbar/drawer',[
      'drawerListItems',
    ]),
    ...mapGetters('accounts',[
      'isLoggedIn',
    ]),
    showListItems() {
      return this.drawerListItems.filter(item => this.needAuth(item))
    }
  },
  methods: {
    needAuth(item) {
      if (item.needAuth) {
        if (item.needAuth == 1 && this.isLoggedIn) {
          return true
        } else if (item.needAuth == -1 && !this.isLoggedIn) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
  },
};
</script>

<style>
</style>