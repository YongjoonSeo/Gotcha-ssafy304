<template>
  <v-container class="fill-height">
    <v-row v-if="isLoggedIn">
      <v-col>
        <h2 class="font-weight-medium">{{ authUser.nickname }}님이 좋아하실 만한 영화입니다  <v-icon large class="mt-n2">mdi-emoticon-happy-outline</v-icon></h2>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <h2 class="font-weight-medium">GOTCHA PLAY에 오신 것을 환영합니다!</h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-show="reducedNumMoviesByBestgenre">
      <MovieListItem v-for="movie in reducedNumMoviesByBestgenre" :key="movie.id" :movie="movie" />
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MovieListItem from "./MovieListItem.vue";

export default {
  name: "MovieListByBestgenre",
  components: {
    MovieListItem
  },
  computed: {
    ...mapState("movies", ["reducedNumMoviesByBestgenre"]),
    ...mapState("accounts", ['authUser']),
    ...mapGetters('accounts', ['isLoggedIn']),
  },
};
</script>

<style>
</style>