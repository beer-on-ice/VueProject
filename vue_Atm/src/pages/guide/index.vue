<template lang="pug">
.guideWrapper
  Header
  router-view
</template>

<script>
import Header from 'components/Header'
import { getCookie, delCookie } from 'utils/cookie'
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    const userInfo = JSON.parse(getCookie('userinfo'))
    this.username = userInfo.username
  },
  methods: {
    handleWithdraw () {
      this.$router.push('/guide/withdraw')
    },
    handleBuy () {
      this.$router.push('/guide/buy')
    },
    handleExit () {
      delCookie('userinfo')
      this.$message({
        message: '已退出',
        type: 'success'
      })
      this.$router.push('/')
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
</style>
