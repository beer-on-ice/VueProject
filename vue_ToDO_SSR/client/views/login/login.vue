  <template>
    <div>
      <div>this is login page</div>
      <router-view></router-view>
    </div>
  </template>

<script>
  export default {
    props: ['id'],
    mounted () {
      console.log(this.$route.params)
      console.log(this.id)
    }
  }
</script>
