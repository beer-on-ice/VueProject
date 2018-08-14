<template>
  <div id="app">
    <div v-html="html"></div>
    <button @click="getData">click me</button>
    <button @click="getData2">click me2</button>
    <button @click="getData3">click me3</button>
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
    },
    getData2 () {
      axios.get('/api/press/s', {
      }).then(function (res) {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getData3 () {
      axios.post('/api/press/s', {
      }).then(function (res) {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="stylus">
</style>
