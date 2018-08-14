<template>
  <div id="app">
    <div v-html="html"></div>
    <button @click="getData">click me</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      html: ''
    }
  },
  methods: {
    getData () {
      let _this = this
      axios.get('/api/press', {
      }).then(function (res) {
        res.data.forEach(item => {
          _this.html += item.content
        })
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="stylus">
</style>
