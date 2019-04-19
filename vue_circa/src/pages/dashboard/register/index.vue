<template lang="pug">
log-reg
  .formWrapper
    el-form(ref="form" :model="form" label-width="80px" label-position="top")
      h4 Create a Business Account
      el-form-item(label="Organization Name")
        el-input(v-model="form.name")
      div.flex-b
        el-form-item(label="First Name" style="margin-right:60px")
          el-input(v-model="form.name")
        el-form-item(label="Last Name")
          el-input(v-model="form.name")
      el-form-item(label="Email Address")
        el-input(v-model="form.name")
      el-form-item(label="Password")
        el-input(v-model="form.password" show-password)
      el-checkbox I agree to the Terms of Use and Privacy Policy
      el-button(plain type="primary") Create Account
      span Already have an account?
        router-link(tag="em" to="/login") Login.
</template>

<script>
import LogReg from 'components/LogReg'
export default {
  data () {
    return {
      form: {
        name: ''
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
