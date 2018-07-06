<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <router-link to="/app">to app</router-link>
        <router-link to="/login/123">to login123</router-link>
        <router-link to="/login/456">to login456</router-link>
        <router-link to="/login/123/exact">to login-child</router-link>
        <transition name="fade">
          <router-view/>
        </transition>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
export default {
  name: 'app',
  data () {
    return {}
  },

  components: {
    Header,
    Footer
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
