<template>
  <div></div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'UserFollowView',
    methods: {
        ...mapActions('accounts', ['followUser'])
    },
    created() {
        this.followUser(this.$route.params.userId)
    },
}
</script>

<style>

</style>