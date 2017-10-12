<template>
    <div class="mianer">
        <top-nav></top-nav>
        <left-list></left-list>
        <player-bar></player-bar>
        <page-main></page-main>
        <page-search></page-search>
    </div>
</template>

<script>
    import LeftList from './leftList'
    import TopNav from './topNav'
    import PlayerBar from './playerBar'
    import PageMain from './PageMain'
    import PageSearch from './pageSearch'
    export default {
        components: {
            LeftList,
            TopNav,
            PlayerBar,
            PageMain,
            PageSearch
        }
    }
</script>

<style lang="css" scoped>

</style>
