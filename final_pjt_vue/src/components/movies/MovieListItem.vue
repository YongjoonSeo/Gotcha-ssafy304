<template>
  <v-col class="col-12" sm="6" md="4" lg="3" xl="2" >
    <v-skeleton-loader
      class="mx-auto movie-item-loading"
      height="37vh"
      type="image"
      v-if="!hasActualData"
    ></v-skeleton-loader>
    <router-link v-if="hasActualData" :to="{ name: 'MovieDetailView', params: { movieId: movie.id } }" class="router-detail">
      <v-hover v-slot:default="{ hover }">
      <v-img
        :aspect-ratio="9/16"
        :src="moviePosterUrl"
        max-height="37vh"
        contain
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex flex-column justify-space-between transition-fast-in-fast-out movie-card darken-2 black v-card--reveal white--text mx-3"
            style="height: 37vh;"
          >
          <p class="mt-5 px-5">{{ movieSummary }}</p>
          <div class="text-center">
          <hr class="mx-auto" style="width: 80%">
          <p class="mt-5 px-5">네이버 평점: {{ movie.fetched_user_rating }}</p>
          <p class="mt-5 px-5">GOTCHA 평점: {{ movie.user_rating }}</p>
          </div>
          </div>
        </v-expand-transition>
      </v-img>
      </v-hover>
    </router-link>
  </v-col>
</template>

<script>
export default {
  name: "MovieListItem",
  props: {
    movie: Object
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    movieSummary() {
      return `${this.movie.description.slice(0, 100)}...`
    },
    moviePosterUrl() {
      return this.movie.poster_url;
    },
    hasActualData() {
      if (!this.loading && this.movie) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    waitImg() {
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  },
  mounted() {
    this.waitImg()
  }
};
</script>

<style scoped>
a.router-detail {
  text-decoration: none;
}

div.movie-card:hover {
  opacity: 0.85;
}
</style>