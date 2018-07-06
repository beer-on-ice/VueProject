  <template>
  <div>
    <div>this is login page</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: ['id'],
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter', this)
    next(vm => {
      console.log('after enter vm.id is ' + vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    if (global.confirm('are you sure?')) {
      next()
    }
  },
  mounted () {
    console.log(this.$route.params)
    console.log(this.id)
  }
}
</script>
