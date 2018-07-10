<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>{{fullName}}-{{counter}}</p>
        <p>A:{{textA}} --- AP:{{textPlus}} --- C:{{textC}}</p>
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
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  mounted () {
    console.log(this.$store, this['a/textPlus'], this.textPlus)
    // mapMutations调用
    // let i = 1
    // setInterval(() => {
    //   // this.$store.commit('updateCount', {
    //   //   num: i++,
    //   //   num2: 2
    //   // })
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)
    // 模块下mapMutations调用
    // this['a/updateText']('123')

    // mapActions调用
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    // 模块下mapActions调用
    this['a/add']()
    this.testAction()
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
      counter: state => state.count,
      textA: state => state.a.text,
      textC: state => state.c.text
    }),
    ...mapGetters({
      'fullName': 'fullName',
      'textPlus': 'a/textPlus'
    })
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
    ...mapMutations(['updateCount', 'a/updateText'])
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
