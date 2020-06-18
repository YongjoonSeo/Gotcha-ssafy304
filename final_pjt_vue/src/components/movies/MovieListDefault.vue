<template>
  <v-container class="fill-height default-container">
    <v-btn absolute dark fab left outlined color="white" class="mt-7 ml-rem" v-show="prevPath" @click="sendLeftData">
      <v-icon x-large>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn absolute dark fab right outlined color="white" class="mt-7 mr-rem" v-show="nextPath" @click="sendRightData">
      <v-icon x-large>mdi-chevron-right</v-icon>
    </v-btn>
    <v-row>
      <v-col>
        <h2 class="font-weight-medium text-end">평점 높은 영화<v-icon large class="mt-n2">mdi-emoticon-happy-outline</v-icon></h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-show="reducedNumMoviesDefault">
      <MovieListItem v-for="movie in reducedNumMoviesDefault" :key="movie.id" :movie="movie" />
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MovieListItem from "./MovieListItem.vue";

export default {
  name: "MovieListDefault",
  components: {
    MovieListItem
  },
  computed: {
    ...mapState("movies", ["reducedNumMoviesDefault", 'listRoute']),
    prevPath() {
      if (this.listRoute) {
        return this.listRoute.prev
      } else {
        return false
      }
    },
    nextPath() {
      if (this.listRoute) {
        return this.listRoute.next
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('movies', ['fetchButtonTriggeredMovies']),
    sendData(data) {
      this.fetchButtonTriggeredMovies(data)
    },
    sendLeftData() {
      const data = {
        route: this.prevPath,
        commitName: this.listRoute.commitName
      }
      this.sendData(data)
    },
    sendRightData() {
      const data = {
        route: this.nextPath,
        commitName: this.listRoute.commitName
      }
      this.sendData(data)
    },
  },
};
</script>

<style>
div.default-container {
  position: relative;
}
</style>