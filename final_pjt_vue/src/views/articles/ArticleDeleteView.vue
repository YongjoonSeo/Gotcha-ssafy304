<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ArticleDeleteView',
    methods: {
        ...mapActions('articles', ['deleteArticle'])
    },
    created() {
        this.deleteArticle(this.$route.params.articleId)
    },
}
</script>

<style>

</style>