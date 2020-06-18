<template>
<div>
  <p class="px-5">{{ article.content }}</p>
  <div v-if="authorized" class="text-end mr-n5 mb-n5">
    <v-btn text color="primary" @click="moveToLink(updateRoute)">EDIT</v-btn>
    <v-btn text color="error" @click="deleteArticle(article.id)">DELETE</v-btn>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "ArticleDetailBody",
  props: {
    article: Object
  },
  computed: {
    ...mapState('accounts', ['authUser']),
    authorized() {
      if (this.authUser.id === this.article.user.id) {
        return true
      } else {
        return false
      }
    },
    updateRoute() {
      return { name: 'ArticleUpdateView', params: { articleId: this.article.id } }
    }
  },
  methods: {
    ...mapActions('articles', ['deleteArticle']),
    ...mapActions('navbar', ['moveToLink'])
  }
};
</script>

<style>
</style>