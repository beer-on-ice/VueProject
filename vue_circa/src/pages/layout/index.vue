<template lang="pug">
el-container
  el-header
    Header(@showLogin="showLogin" @showRegister="showRegister")
  el-main
    transition(name="fade" mode="out-in")
      router-view
    Login(v-if="loginFlag" @closeLogin="loginFlag=false" @showRegister="showRegister")
    Register(v-if="registerFlag" @closeRegister="registerFlag=false" @showLogin="showLogin")
  el-footer
    Footer
</template>

<script>
import Header from 'components/Header'
import Footer from 'components/Footer'
import Login from 'components/Login'
import Register from 'components/Register'
export default {
  data () {
    return {
      loginFlag: false,
      registerFlag: false
    }
  },
  methods: {
    showLogin () {
      this.loginFlag = true
      this.registerFlag = false
    },
    showRegister () {
      this.loginFlag = false
      this.registerFlag = true
    }
  },
  components: {
    Header,
    Footer,
    Login,
    Register
  }
}
</script>

<style lang="scss" scoped>
</style>
