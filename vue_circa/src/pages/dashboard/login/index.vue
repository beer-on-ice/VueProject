<template lang="pug">
log-reg
  .formWrapper
    el-form(ref="form" :model="form" label-width="80px" label-position="top")
      h4 Login to your account
      el-form-item(label="Email address")
        el-input(v-model="form.name")
      el-form-item(label="Password")
        el-input(v-model="form.password" show-password)
      el-button(plain type="primary") Login
      router-link(tag="span" to="/login/forget") Forgot your Password?
      router-link(tag="span" to="/register") Sign Up
</template>

<script>
import LogReg from 'components/LogReg'
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  components: {
    LogReg
  }
}
</script>

<style lang="scss" scoped>
</style>
