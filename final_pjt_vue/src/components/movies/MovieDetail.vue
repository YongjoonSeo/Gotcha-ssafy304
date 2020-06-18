<template>
  <v-row v-if="movie">
    <v-col class="col-12 detail-content" sm="6" lg="8">
      <v-container fluid>
        <v-row>
          <v-col class="col-5">
            <h5 class="headline">
              {{ movie.title }}
              <v-badge v-if="isLoggedIn" color="deep-purple accent-4" :content="numOfLike" inline class="ml-5 mt-n1">
                <v-btn icon class="mt-1" @click="likeMovie(movie.id)">
                  <v-icon v-show="isLike" color="pink">mdi-heart</v-icon>
                  <v-icon v-show="!isLike" color="pink">mdi-heart-outline</v-icon>
                </v-btn>
              </v-badge>
            </h5>
            <p class="ml-1 mt-1">{{ movie.subtitle }}</p>
          </v-col>
          <v-col class="col-7">
            <div class="d-flex justify-space-around">
              <p class="rating-text">네이버 {{ movie.fetched_user_rating }}</p>
              <v-rating
                :value="movie.fetched_user_rating/2"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                readonly
                size="18"
              ></v-rating>
            </div>
            <div class="d-flex justify-space-around">
              <p>GOTCHA {{ movie.user_rating }}</p>
              <v-rating
                v-model="userRating"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                readonly
                size="18"
              ></v-rating>
            </div>
            <div class="d-flex justify-space-around">
              <div></div>
              <MovieRatingModal v-if="isLoggedIn" :movieId="movie.id" />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>{{ movie.pub_date }}년 개봉</p>
            <p>
              <span class="font-weight-black">감독</span>
              {{ movieDirectors }}
            </p>
            <p>
              <span class="font-weight-black">출연</span>
              {{ movieActors }}
            </p>
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <v-row>
          <v-col class="description">{{ movie.description }}</v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
        <v-row>
          <v-col>
            <v-btn v-if="isLoggedIn" @click="toCreatePage" text large class="mr-2">게시물 쓰러 가기</v-btn>
            <v-btn :href="movie.link" target="_blank" large color="grey darken-3 mr-4">네이버 영화페이지</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
    <v-col class="col-12 detail-imgdiv" sm="6" lg="4">
      <v-skeleton-loader
        v-if="loading"
        height="80%"
        class="mx-auto detail-loading"
        type="image"
        :loading="loading"
      ></v-skeleton-loader>
      <v-img
        v-show="!loading"
        :src="movie.poster_url"
        :aspect-ratio="9/16"
        contain
        class="xl-detail-image"
      ></v-img>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import MovieRatingModal from "./MovieRatingModal.vue";

export default {
  name: "MovieDetail",
  components: {
    MovieRatingModal
  },
  data() {
    return {
      loading: true,
      userRating: 0
    };
  },
  computed: {
    ...mapGetters("movies", ["movie", "movieDirectors", "movieActors"]),
    ...mapState("accounts", ["authUser"]),
    ...mapGetters('accounts', ['isLoggedIn']),
    numOfLike() {
      return String(this.movie.like_users.length);
    },
    isLike() {
      if (this.movie.like_users.find(user => user.id === this.authUser.id)) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ...mapActions("movies", ["fetchMovie", "likeMovie"]),
    ...mapMutations("articles", ["SET_ARTICLE_SELECTED_MOVIE"]),
    waitImg() {
      setTimeout(() => {
        this.loading = false;
      }, 1300);
    },
    changeTitle() {
      if (this.movie) {
        document.title = `${this.movie.title} 상세페이지`;
      }
    },
    initUserRating() {
      this.userRating = this.movie.user_rating / 2;
    },
    toCreatePage() {
      this.SET_ARTICLE_SELECTED_MOVIE(this.movie);
      this.$router.push({ name: "ArticleCreateView" });
    }
  },
  created() {
    this.fetchMovie(this.$route.params.movieId);
  },
  mounted() {
    this.waitImg();
  },
  updated() {
    this.changeTitle();
    this.initUserRating();
  },
};
</script>

<style>
div.detail-card {
  margin-top: 10rem;
}

div.detail-loading {
  margin-top: 6rem;
}

div.detail-loading > div.v-skeleton-loader__bone {
  height: 90%;
}

div.movie-item-loading > div.v-skeleton-loader__image {
  height: 37vh;
}

div.detail-content {
  padding: 6rem 6rem;
}

@media only screen and (max-width: 600px) {
  div.detail-content {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media only screen and (max-width: 1264px) {
  div.detail-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media only screen and (min-width: 1904px) {
  div.xl-detail-image {
    margin-top: -7rem;
  }

  div.detail-content {
    padding-left: 12rem;
    padding-right: 12rem;
  }

  div.detail-loading {
    margin-top: 2rem;
  }

  div.detail-loading > div.v-skeleton-loader__bone {
    height: 80vh;
  }

  div.detail-imgdiv {
    margin-left: -5rem;
  }
}

p.rating-text {
  margin-top: 0.1rem;
}

div.description {
  line-height: 2rem;
}
</style>