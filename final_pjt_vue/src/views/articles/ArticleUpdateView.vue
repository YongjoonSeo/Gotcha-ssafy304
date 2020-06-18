<template>
  <v-container>
    <ArticleUpdate v-if="article" :article="article" />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ArticleUpdate from "@/components/articles/ArticleUpdate.vue";

export default {
  name: "ArticleUpdateView",
  components: {
    ArticleUpdate
  },
  methods: {
    ...mapActions('articles', ['fetchArticle'])
  },
  computed: {
    ...mapGetters('articles', ['article']),
    articleId() {
      return this.$router.currentRoute.params.articleId
    },
  },
  created() {
    this.fetchArticle(this.articleId)
  },
};
</script>

<style>
</style>