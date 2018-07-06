<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>{{fullName}}-{{counter}}</p>
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
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  mounted () {
    console.log(this.$store)
    let i = 1
    setInterval(() => {
      this.$store.commit('updateCount', i++)
    }, 1000)
  },
  computed: {
    // count() {
    //   return this.$store.state.count
    // },
    // ...mapState(['count']),
    // ...mapState({
    //   counter: 'count'
    // }),
    ...mapState({
      counter: (state) => state.count
    }),
    ...mapGetters(['fullName'])
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
