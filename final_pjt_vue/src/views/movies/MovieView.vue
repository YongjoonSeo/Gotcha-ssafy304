<template>
  <div>
    <v-container fluid id="list-by-bestgenre" class="list-by-bestgenre">
      <MovieListByBestGenre />
    </v-container>
    <v-container fluid id="list-by-weather" class="list-by-weather">
      <MovieListByWeather />
    </v-container>
    <v-container fluid id="list-default" class="list-default">
      <MovieListDefault />
    </v-container>
  </div>
</template>

<script>
import MovieListDefault from '@/components/movies/MovieListDefault.vue'
import MovieListByWeather from '@/components/movies/MovieListByWeather.vue'
import MovieListByBestGenre from '@/components/movies/MovieListByBestGenre.vue'
import { mapActions } from 'vuex'

export default {
  name: 'MovieView',
  components: {
    MovieListDefault,
    MovieListByWeather,
    MovieListByBestGenre,
  },
  methods: {
    ...mapActions('movies', ['fetchMovies', 'fetchScrollTriggeredMovies', 'setData'])
  },
  created() {
    const obj = this;
    window.addEventListener("load", () => {
      if (obj.$router.currentRoute.name === 'MovieView') {
        obj.setData(window.innerWidth);
      }
    });
    window.addEventListener("scroll", () => {
      if (obj.$router.currentRoute.name === 'MovieView') {
        obj.setData(window.innerWidth);
      }
    });
    window.addEventListener("resize", () => {
      if (obj.$router.currentRoute.name === 'MovieView') {
        obj.setData(window.innerWidth);
      }
    });
  },
  mounted() {
    this.setData(window.innerWidth)
    this.fetchScrollTriggeredMovies('list-by-bestgenre')
    this.fetchScrollTriggeredMovies('list-by-weather')
    this.fetchScrollTriggeredMovies('list-default')
  }
}
</script>

<style scoped>
div.list-default {
  background-color: #616161;
  height: 91vh;
}

div.list-by-weather {
  background-color: #757575;
  height: 91vh;
}

div.list-by-bestgenre {
  height: 91vh;
}
</style>