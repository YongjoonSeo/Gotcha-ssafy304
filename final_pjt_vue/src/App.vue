<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <NavbarDrawer />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="moveToLink({ name: 'MovieView' })">GOTCHA PLAY</v-toolbar-title>

      <v-spacer></v-spacer>
      <NavSearchBar v-if="isLoggedIn" />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-if="!isLoggedIn" @click="moveToLink({ name: 'Signup' })">Sign up</v-btn>
        <v-btn v-if="!isLoggedIn" @click="moveToLink({ name: 'Login' })">Log in</v-btn>
        <v-btn v-if="isLoggedIn" @click="moveToLink({ name: 'Logout' })">Log out</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    

    <v-content>
      <router-view />
    </v-content>
    <v-footer app>
      <span>&copy; 2020 SSAFY Project by Yong joon Seo & Tae hyeong Kim, All rights reserved  </span>
    </v-footer>
  </v-app>
</template>

<script>
import NavbarDrawer from "@/components/navbar/NavbarDrawer.vue";
import NavSearchBar from '@/components/navbar/NavSearchBar.vue'
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapGetters("accounts", ["isLoggedIn"])
  },
  components: {
    NavbarDrawer,
    NavSearchBar
  },
  methods: {
    ...mapActions("navbar", ["moveToLink"])
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style scoped>
div.v-toolbar__title {
  cursor: pointer;
}

footer {
  z-index: 1030;
}
</style>