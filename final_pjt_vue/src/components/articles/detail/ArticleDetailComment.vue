<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" width="90%" height="100%" outlined light>
        <div class="d-flex justify-space-around align-center">
          <v-card-title>{{ comment.user.username }}</v-card-title>
          <div class="d-flex subtitle-2 mr-3 w-80">
            <div class="mr-5">{{ createdDateTime }} 작성</div>
            <div>{{ updatedDateTime }} 수정</div>
          </div>
        </div>
        <div class="d-flex justify-space-between align-center" v-if="isUpdating">
        <v-text-field class="mx-10 my-5" :rules="rules" color="black" counter="200" label="댓글작성" v-model="commentData.content" @keypress.enter="update(commentData)"></v-text-field>
        <div class="d-flex flex-column">
        <v-btn class="font-weight-bold mr-5 mt-n3" color="grey darken-3" dark @click="update(commentData)">등록</v-btn>
        <v-btn class="font-weight-bold mr-5 mt-3" color="grey darken-1" dark @click="updateStateToggle">취소</v-btn>
        </div>
        </div>
        <div class="d-flex justify-space-between" v-if="!isUpdating">
        <v-card-text class="ml-10 black--text">{{ comment.content }}</v-card-text>
        <v-btn v-if="authorized" text color="primary" @click="updateStateToggle">EDIT</v-btn>
        <v-btn v-if="authorized" text color="error" @click="deleteComment(idInfo)">DELETE</v-btn>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: "ArticleDetailComment",
  data() {
    return {
      isUpdating: false,
      commentData: {
        content: this.comment.content,
        commentId: this.comment.id,
        articleId: this.articleId,
      },
      rules: [v => v.length <= 200 || '댓글은 200자를 초과할 수 없습니다.'],
    }
  },
  props: {
    comment: Object,
  },
  methods: {
    ...mapActions('articles', ['deleteComment', 'updateComment']),
    changeDateForm(date) {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const time = date.slice(11, 16);
      return `${year}년 ${month}월 ${day}일 ${time}`;
    },
    updateStateToggle() {
      this.commentData.content = this.initialContent
      this.isUpdating = !this.isUpdating
    },
    initArticleId() {
      this.commentData.articleId = this.articleId      
    },
    update(data) {
      this.updateComment(data)
      this.updateStateToggle()
    },
  },
  computed: {
    ...mapState('accounts', ['authUser']),
    createdDateTime() {
      return this.changeDateForm(this.comment.created_at);
    },
    updatedDateTime() {
      return this.changeDateForm(this.comment.updated_at);
    },
    authorized() {
      if (this.authUser.id === this.comment.user.id) {
        return true
      } else {
        return false
      }
    },
    articleId() {
      return this.$router.currentRoute.params.articleId
    },
    idInfo() {
      return { article: this.articleId, comment: this.comment.id }
    },
    initialContent() {
      return this.comment.content
    }
  },
  mounted() {
    this.initArticleId()
  }
};
</script>

<style>
</style>