<template>
  <v-card class="mx-auto" max-width="344" shaped light color="#FAFAFA">
    <div class="d-flex justify-space-between">
      <div>
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-subtitle>
          {{ movie.subtitle }}
          <br/>
          {{ movie.genre }}
        </v-card-subtitle>
        <v-card-text>
          네이버 평점: {{ movie.fetched_user_rating }}
          <br />
          GOTCHA 평점: {{ movie.user_rating }}
        </v-card-text>
      </div>
      <v-img :src="movie.thumbnail_url" max-width="110" height="157"></v-img>
    </div>

    <v-card-actions>
      <v-btn text @click="moveToLink(movieDetailroute)">상세페이지</v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>{{ movie.description }}</v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ArticleDetailMovieCard",
  data() {
    return {
      show: false
    };
  },
  computed: {
    movieDetailroute() {
      return { name: "MovieDetailView", params: { movieId: this.movie.id } };
    }
  },
  props: {
    movie: Object
  },
  methods: {
    ...mapActions("navbar", ["moveToLink"])
  }
};
</script>

<style>
</style>