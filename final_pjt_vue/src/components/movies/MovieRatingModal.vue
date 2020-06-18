<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="grey darken-1" class="mr-n6">평점등록</v-btn>
    </template>

    <v-card class="elevation-16 mx-auto" width="500">
      <v-card-title class="headline" primary-title>평점 등록하기</v-card-title>
      <v-card-text>
        이 영화에 대한 평점을 등록해주세요!
        <div class="text-center mt-12">
          <v-rating
            v-model="userRating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
          ></v-rating>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-between">
        <v-btn @click="dialog = false" text>No Thanks</v-btn>
        <v-btn @click="rating(ratingData)" color="light-blue lighten-2" text>Rate Now</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "MovieRatingModal",
  data() {
    return {
      dialog: false,
      userRating: 0,
    };
  },
  props: {
    movieId: Number
  },
  computed: {
    ratingData() {
      return {
        userRating: this.userRating * 2,
        movieId: this.movieId
      }
    },
  },
  methods: {
    ...mapActions('movies', ['ratingMovie']),
    rating(data) {
      this.ratingMovie(data)
      this.dialog = false
    }
  }
};
</script>

<style>
</style>