<template>
  <v-row>
    <v-col class="col-10">
      <v-text-field :rules="rules" counter="200" label="댓글작성" color="white" outlined v-model="commentData.content" @keypress.enter="createCommentAndReload()"></v-text-field>
    </v-col>
    <v-col class="col-2 text-center">
      <v-btn class="font-weight-bold" color="gray" x-large light @click="createCommentAndReload()">등록</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "ArticleDetailCommentsCreate",
  data() {
    return {
      commentData: {
        content: '',
        articleId: this.articleId
      },
      rules: [v => v.length <= 200 || '댓글은 200자를 초과할 수 없습니다.'],
    };
  },
  props: {
    articleId: Number,
  },
  methods: {
    ...mapActions('articles', ['createComment', 'fetchArticle']),
    createCommentAndReload() {
      this.createComment(this.commentData)
      this.commentData.content = '',
      this.fetchArticle(this.articleId)
    }
  },
};
</script>

<style>
</style>