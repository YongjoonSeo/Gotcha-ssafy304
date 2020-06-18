<template>
  <v-row align="center" style="max-width: 450px" class="d-flex flex-column mr-1">
    <div class="text-center search-btn-div d-flex justify-space-around">
    <v-btn disabled rounded large dark v-if="articleSelectedMovie">{{ articleSelectedMovie.title }}</v-btn>
    <v-btn disabled rounded large dark v-else>영화 선택되지 않음</v-btn>
    <v-btn large icon @click="SET_ARTICLE_SELECTED_MOVIE(null)"><v-icon>mdi-cached</v-icon></v-btn>
  </div>
    <v-text-field
      :append-icon-cb="() => {}"
      placeholder="어떤 영화에 대해 쓰실건가요?"
      single-line
      color="white"
      hide-details
      v-model="query"
      @input="delaySearch(query)"
      @click="delaySearch(query)"
      v-click-outside="hide"
      full-width
      class="search-div"
    ></v-text-field>

    <v-list dense width="20rem" v-if="searchedMovies && show">
      <v-list-item-group>
        <v-list-item @click="SET_ARTICLE_SELECTED_MOVIE(movie)" v-for="movie in searchedMovies" :key="movie.id" v-show="show">
          <v-list-item-content>
            <v-list-item-title v-if="movie.title.length > 17">{{ movie.title.slice(0, 17) }}...</v-list-item-title>
            <v-list-item-title v-else >{{ movie.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ movie.subtitle }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import ClickOutside from "vue-click-outside";

export default {
  name: "ArticleMovieSelection",
  data() {
    return {
      query: "",
      timer: null,
      show: false,
    };
  },
  methods: {
    ...mapActions("movies", ["searchMovie"]),
    ...mapMutations("movies", ["SET_SEARCHED_MOVIES"]),
    ...mapMutations('articles', ['SET_ARTICLE_SELECTED_MOVIE']),
    delaySearch(query) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const obj = this;
      this.timer = setTimeout(function() {
        obj.searchMovie(query);
      }, 500);
      this.show = true;
    },
    hide() {
      this.show = false;
    },
  },
  computed: {
    ...mapState("movies", ["searchedMovies"]),
    ...mapState('articles', ['articleSelectedMovie'])
  },
  beforeDestroy() {
    this.SET_ARTICLE_SELECTED_MOVIE(null)
    this.SET_SEARCHED_MOVIES(null)
  },
  directives: {
    ClickOutside
  }
};
</script>

<style scoped>
button.theme--dark.v-btn.v-btn--disabled {
  color: rgba(255, 255, 255) !important;
}

div.search-div, div.search-btn-div {
  width: 80%;
}
</style>