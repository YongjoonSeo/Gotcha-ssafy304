<template>
  <UserDetail :user="detailUser" />
</template>

<script>
import UserDetail from "@/components/accounts/UserDetail.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "UserDetailView",
  components: {
    UserDetail
  },
  computed: {
    ...mapState("accounts", ["detailUser"])
  },
  methods: {
    ...mapActions("accounts", ["fetchDetailUser"]),
    changeTitle() {
      if (this.detailUser) {
        document.title = `${this.detailUser.nickname}님의 상세페이지`
      }
    }
  },
  created() {
    this.fetchDetailUser(this.$route.params.userId);
  },
  updated() {
    this.changeTitle()
  }
};
</script>

<style>
</style>