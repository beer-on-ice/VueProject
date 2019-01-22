<template  lang="pug">
  #app
    router-view
    //- tab(@tabChange="tabSwitch" :current="current")
</template>

<script>
import Tab from 'components/tab.vue'
export default {
  data () {
    return {
      current: 0
    }
  }
}
</script>

<style>
</style>
