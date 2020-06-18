<template>
  <v-container class="fill-height weather-container">
    <v-btn absolute dark fab left outlined color="white" class="mt-7 ml-rem" v-show="prevPath" @click="sendLeftData">
      <v-icon x-large>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn absolute dark fab right outlined color="white" class="mt-7 mr-rem" v-show="nextPath" @click="sendRightData">
      <v-icon x-large>mdi-chevron-right</v-icon>
    </v-btn>
    <v-row>
      <v-col>
        <h2 class="font-weight-medium text-center">
          오늘 같은 날, 이런 영화는 어때요?
          <v-icon large class="mt-n2">mdi-temperature-celsius</v-icon>
        </h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-show="reducedNumMoviesByWeather">
      <MovieListItem v-for="movie in reducedNumMoviesByWeather" :key="movie.id" :movie="movie" />
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MovieListItem from "./MovieListItem.vue";

export default {
  name: "MovieListByWeather",
  components: {
    MovieListItem
  },
  computed: {
    ...mapState("movies", ["reducedNumMoviesByWeather", 'weatherListRoute']),
    prevPath() {
      if (this.weatherListRoute) {
        return this.weatherListRoute.prev
      } else {
        return false
      }
    },
    nextPath() {
      if (this.weatherListRoute) {
        return this.weatherListRoute.next
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
        commitName: this.weatherListRoute.commitName
      }
      this.sendData(data)
    },
    sendRightData() {
      const data = {
        route: this.nextPath,
        commitName: this.weatherListRoute.commitName
      }
      this.sendData(data)
    },
  },
};
</script>

<style>
div.weather-container {
  position: relative;
}

button.ml-rem {
  margin-left: -1rem;
}

button.mr-rem {
  margin-right: -1rem;
}

@media only screen and (min-width: 960px) {
  button.ml-rem {
    margin-left: -3rem;
  }

  button.mr-rem {
    margin-right: -3rem;
  }
}
</style>