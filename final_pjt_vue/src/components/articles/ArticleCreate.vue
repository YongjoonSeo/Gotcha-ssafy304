<template>
  <v-row>
    <v-col class="col-12 mt-12">
      <h1 class="text-center">새 글 쓰기</h1>
    </v-col>
    <v-col offset="1" class="col-10" offset-lg="2" lg="8" offset-xl="3" xl="6">
      <v-text-field label="글 제목을 입력하세요" color="white" v-model="articleData.title"></v-text-field>
      <v-textarea
        clearable
        clear-icon="mdi-cached"
        label="글 내용을 입력하세요"
        v-model="articleData.content"
        auto-grow
        color="white"
      ></v-textarea>
      <div class="d-flex justify-space-between">
        <ArticleMovieSelection />
        <div>
        <v-btn class="font-weight-bold mr-6" depressed @click="moveToLink({ name: 'ArticleView' })" large light>목록으로</v-btn>
        <v-btn class="font-weight-bold" depressed @click="createMovieArticle" large light>게시글 작성</v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ArticleMovieSelection from './ArticleMovieSelection.vue'

export default {
  name: "ArticleCreate",
  components: {
    ArticleMovieSelection
  },
  data() {
    return {
      articleData: {
        title: null,
        content: null,
        movieId: null,
      }
    };
  },
  methods: {
    ...mapActions("articles", ["createArticle"]),
    ...mapActions('navbar', ['moveToLink']),
    createMovieArticle() {
      if (this.articleSelectedMovie) {
        this.articleData.movieId = this.articleSelectedMovie.id
      }
      this.createArticle(this.articleData)
    }
  },
  computed: {
    ...mapState('articles', ['articleSelectedMovie'])
  },
};
</script>

<style>
</style>