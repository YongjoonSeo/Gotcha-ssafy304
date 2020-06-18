<template>
  <v-container>
    <v-row>
      <v-col class="col-12 mt-12">
        <h1 class="text-center">게시글 목록</h1>
      </v-col>
      <v-col offset="1" class="col-10 mt-10" offset-xl="2" xl="8">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">번호</th>
                <th class="text-left">제목</th>
                <th class="text-left">작성자</th>
                <th class="text-left">영화</th>
                <th class="text-left">작성날짜</th>
                <th class="text-left">작성시간</th>
              </tr>
            </thead>
            <tbody>
              <ArticleListItem v-for="article in articles" :key="article.id" :article="article" />
            </tbody>
          </template>
        </v-simple-table>
        <div class="text-end mt-10 pr-10">
          <v-btn
            class="px-8"
            depressed
            @click="moveToLink({ name: 'ArticleCreateView' })"
            large
            grey
            lighten-5
          >글쓰기</v-btn>
        </div>
      </v-col>
      <v-col class="col-12">
        <div class="text-center">
          <v-pagination light v-model="page" @input="moveToPageNum" @next="fetchNextPrevPage(nextLink)" @previous="fetchNextPrevPage(prevLink)" :length="totalPages" :total-visible="7" color="black"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ArticleListItem from "./ArticleListItem.vue";

export default {
  name: "ArticleList",
  data() {
    return {
      page: 1
    };
  },
  components: {
    ArticleListItem
  },
  computed: {
    ...mapState("articles", ["articles", "nextLink", 'prevLink', 'totalPages'])
  },
  methods: {
    ...mapActions("articles", ["fetchArticles", 'fetchNextPrevPage', 'fetchSpecificPage']),
    ...mapActions("navbar", ["moveToLink"]),
    moveToPageNum() {
      this.fetchSpecificPage(event.target.innerText)
    }
  },
  created() {
    this.fetchArticles();
  },
};
</script>

<style>
</style>