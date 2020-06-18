<template>
  <v-container v-if="article" class="mt-10">
    <v-row>
      <v-col offset-xl="1">
        <ArticleDetailTitle :article="article" />
      </v-col>
      <v-col>
        <ArticleDetailMovieCard v-if="article.movie" :movie="article.movie" />
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col offset="1" class="col-10">
        <ArticleDetailBody :article="article" />
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row>
      <v-col offset="1" class="col-10">
        <v-container>
          <ArticleDetailCommentsCreate :articleId="article.id" />
          <ArticleDetailComment
            v-for="comment in article.comments"
            :key="comment.id"
            :comment="comment"
          />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ArticleDetailTitle from "./ArticleDetailTitle.vue";
import ArticleDetailMovieCard from "./ArticleDetailMovieCard.vue";
import ArticleDetailBody from "./ArticleDetailBody.vue";
import ArticleDetailComment from "./ArticleDetailComment.vue";
import ArticleDetailCommentsCreate from "./ArticleDetailCommentsCreate.vue";

export default {
  name: "ArticleDetail",
  components: {
    ArticleDetailTitle,
    ArticleDetailMovieCard,
    ArticleDetailBody,
    ArticleDetailComment,
    ArticleDetailCommentsCreate
  },
  computed: {
    ...mapGetters("articles", ["article"]),
    articleId() {
      return this.$router.currentRoute.params.articleId;
    }
  },
  methods: {
    ...mapActions("articles", ["fetchArticle"]),
    ...mapMutations("articles", ["SET_ARTICLE"]),
    changeTitle() {
      if (this.article) {
        document.title = `GOTCHA ${this.article.id}번 글 - ${this.article.title}`;
      }
    }
  },
  created() {
    this.fetchArticle(this.articleId);
  },
  updated() {
    this.changeTitle();
  },
  beforeDestroy() {
    this.SET_ARTICLE(null);
  }
};
</script>

<style scoped>
</style>