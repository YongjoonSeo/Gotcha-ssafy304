<template>
  <v-row align="center" style="max-width: 450px" class="d-flex mr-1">
    <v-text-field
      :append-icon-cb="() => {}"
      placeholder="원하는 영화를 찾아보세요"
      single-line
      color="white"
      hide-details
      v-model="query"
      @input="delaySearch(query)"
      @click="delaySearch(query)"
      v-click-outside="hide"
    ></v-text-field>
          <div class="link-buttons-div" v-if="searchedMovies && show">
        <v-btn large class="link-button d-flex justify-space-around" @click="moveToDetail(movie.id)" v-for="movie in searchedMovies" :key="movie.id" v-show="show">
        <span v-if="movie.title.length > 17" >{{ movie.title.slice(0, 17) }}...</span>
        <span v-else>{{ movie.title }}</span>
        <span>{{ movie.director.split('|')[0] }} 감독</span>
          </v-btn>
      </div>
  </v-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import ClickOutside from 'vue-click-outside'

export default {
  name: "NavSearchBar",
  data() {
    return {
      query: '',
      timer: null,
      show: false,
    }
  },
  methods: {
    ...mapActions('movies', ['searchMovie']),
    ...mapActions('navbar', ['moveToLink']),
    ...mapMutations('movies', ['SET_SEARCHED_MOVIES']),
    delaySearch(query) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      const obj = this
      this.timer = setTimeout(function() {
        obj.searchMovie(query)
      }, 500)
      this.show = true
    },
    hide() {
      this.show = false
    },
    moveToDetail(movieId) {
      this.moveToLink({ name: 'MovieDetailView', params: { movieId: movieId } })
      this.query = ''
      this.SET_SEARCHED_MOVIES(null)
    }
  },
  computed: {
    ...mapState('movies', ['searchedMovies']),
  },
  directives: {
    ClickOutside,
  }
};
</script>

<style>
div.link-buttons-div {
  position: absolute;
  top: 56px;
  right: 20px;
  width: 16rem;
  box-shadow: 5px 5px 10px #888888;
}

button.link-button {
  width: 16rem;
  border-top: 1px solid black;
}

@media only screen and (min-width: 960px) {
  div.link-buttons-div {
    top: 64px;
    right: 120px;
    width: 28rem;
  }

  button.link-button {
    width: 28rem;
  }
}
</style>