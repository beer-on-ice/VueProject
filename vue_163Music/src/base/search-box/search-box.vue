<template lang="pug">
.search-box
  i.icon-search
  input.box(type="text" :placeholder='placeholder' ref='query' v-model="query")
  i.icon-dismiss(v-show="query" @click="clear")
</template>

<script>
import {debounce} from 'assets/js/util'
export default {
  data () {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 400))
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  background $color-highlight-background
  border-radius 6px
  .icon-search
    font-size 24px
    color $color-background
  .box
    flex 1
    margin 0 4px
    padding 0 5px
    line-height 26px
    background $color-highlight-background
    color $color-text
    font-size $font-size-medium
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 16px
    color $color-background
</style>
