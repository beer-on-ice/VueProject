<template>
    <header :class="$style.mainHeader">
        <h1>Just DO IT</h1>
    </header>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" module>
.main-header
    text-align center
    h1
        font-size 100px
        color rgba(175, 47, 47, 0.4)
        font-weight 100
        margin 20px
</style>
