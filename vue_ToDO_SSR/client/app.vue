<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <to-do></to-do>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import ToDo from './views/todo/todo.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer,
    ToDo
  }
}
</script>

<style lang="stylus" scoped>
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0

#cover
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1

</style>
