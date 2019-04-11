<template lang="pug">
log-reg
  .formWrapper
    el-form(ref="form" :model="form" label-width="80px" label-position="top" )
      h4 Forgot Password
      el-form-item(label="Email address")
        el-input(v-model="form.name" placeholder='Email')
    el-button(plain type="primary") RESET PASSWORD
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
