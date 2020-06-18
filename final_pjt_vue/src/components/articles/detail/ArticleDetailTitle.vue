<template>
  <div>
    <v-btn class="ml-5" icon color="white" @click="moveToLink({ name: 'ArticleView' })">
      <v-icon x-large>mdi-table-of-contents</v-icon>
    </v-btn>
    <h1 class="mt-7 ml-5">{{ article.title }}</h1>
    <v-divider class="my-5"></v-divider>
    <div class="d-flex justify-space-between align-center">
      <p class="ml-5">{{ article.user.nickname }}</p>
      <div class="mr-5 subtitle-2">
        <p>{{ createdDateTime }} 작성</p>
        <p class="mt-n3">{{ updatedDateTime }} 수정</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "ArticleDetailTitle",
  props: {
    article: Object
  },
  methods: {
    ...mapActions('navbar', ['moveToLink']),
    changeDateForm(date) {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const time = date.slice(11, 16);
      return `${year}년 ${month}월 ${day}일 ${time}`;
    },
  },
  computed: {
    createdDateTime() {
      return this.changeDateForm(this.article.created_at);
    },
    updatedDateTime() {
      return this.changeDateForm(this.article.updated_at);
    }
  }
};
</script>

<style>
</style>