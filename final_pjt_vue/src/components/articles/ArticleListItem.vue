<template>
  <tr v-if="article" class="article-row" @click="moveToLink(detailRoute)">
    <td>{{ article.id }}</td>
    <td>{{ article.title }}</td>
    <td>{{ article.user.nickname }}</td>
    <td v-if="article.movie">{{ article.movie.title }}</td>
    <td v-else></td>
    <td>{{ createdDate }}</td>
    <td>{{ createdTime }}</td>
  </tr>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ArticleListitem",
  props: {
    article: Object
  },
  computed: {
    createdDate() {
      return this.article.created_at.slice(0, 10);
    },
    createdTime() {
      return this.article.created_at.slice(11, 16);
    },
    detailRoute() {
      return {
        name: "ArticleDetailView",
        params: { articleId: this.article.id }
      };
    }
  },
  methods: {
    ...mapActions("navbar", ["moveToLink"])
  }
};
</script>

<style scoped>
tr.article-row {
  cursor: pointer;
}
</style>