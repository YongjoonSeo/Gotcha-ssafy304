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
    ...mapActions("accounts", ["fetchAuthUser"])
  },
  created() {
    this.fetchAuthUser();
  }
};
</script>

<style>
</style>