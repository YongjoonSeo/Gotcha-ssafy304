<template>
  <v-row>
    <v-col class="col-12 mt-12">
      <h1 class="text-center">글 수정하기</h1>
    </v-col>
    <v-col offset="1" class="col-10" offset-lg="2" lg="8" offset-xl="3" xl="6">
      <v-text-field label="글 제목을 입력하세요" color="white" v-model="articleUpdateData.title"></v-text-field>
      <v-textarea
        clearable
        clear-icon="mdi-cached"
        label="글 내용을 입력하세요"
        v-model="articleUpdateData.content"
        auto-grow
        color="white"
      ></v-textarea>
      <div class="d-flex justify-space-between">
        <ArticleMovieSelection />
        <div>
        <v-btn class="font-weight-bold mr-6" depressed @click="moveToLink(detailRoute)" large light>되돌아가기</v-btn>
        <v-btn class="font-weight-bold" depressed @click="updateMovieArticle" large light>게시글 수정</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ArticleMovieSelection from './ArticleMovieSelection.vue'

export default {
  name: "ArticleUpdate",
  components: {
    ArticleMovieSelection
  },
  data() {
    return {
      articleUpdateData: {
        articleId: null,
        title: null,
        content: null,
        movieId: null,
      }
    };
  },
  props: {
    article: Object
  },
  methods: {
    ...mapActions("articles", ["updateArticle"]),
    ...mapActions('navbar', ['moveToLink']),
    ...mapMutations('articles', ['SET_ARTICLE_SELECTED_MOVIE']),
    initData() {
      this.articleUpdateData.articleId = this.article.id
      this.articleUpdateData.title = this.article.title
      this.articleUpdateData.content = this.article.content
      if (this.article.movie) {
        this.articleUpdateData.movieId = this.article.movie.id
        this.SET_ARTICLE_SELECTED_MOVIE(this.article.movie)
      }
    },
    changeTitle() {
      if (this.article) {
        document.title = `글 수정 - ${this.article.title}`;
      }
    },
    updateMovieArticle() {
      if (this.articleSelectedMovie) {
        this.articleUpdateData.movieId = this.articleSelectedMovie.id
      } else {
        this.articleUpdateData.movieId = null
      }
      this.updateArticle(this.articleUpdateData)
    }
  },
  computed: {
    ...mapState('articles', ['articleSelectedMovie']),
    detailRoute() {
      return { name: 'ArticleDetailView', params: { articleId: this.article.id } }
    },
  },
  created() {
    this.initData()
    this.changeTitle()
  },
};
</script>

<style>
</style>