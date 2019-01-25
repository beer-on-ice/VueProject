<template lang="pug">
  .home
    #read
      span.icon-bookmark
      span.text ABCDEFG
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'home',
  mounted () {
    console.log(this['book/book'])
    this.$store.dispatch('change', 1)
    this.change(10)
    console.log(this.$store.state.value, this.value)
    this.changebook('流浪地球')
    console.log(this.$store.state.book.book)
  },
  computed: {
    ...mapGetters([
      'book/book',
      'value'
    ])
  },
  methods: {
    ...mapActions({
      change: 'change',
      changebook: 'book/CHANGEBOOKSYNC'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/styles/global.scss";
.icon-bookmark {
  font-size: px2rem(41.4);
}
.text {
  font-size: px2rem(41.4);
  font-family: "Days One";
  color: orange;
}
</style>
