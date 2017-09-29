<template>
  <div id="app">
      <m-header></m-header>
      <tab-bar></tab-bar>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
      <player></player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import tabBar from 'components/tab-bar/tab-bar'
import Player from 'components/player/player'
export default {
    components: {
        MHeader,
        tabBar,
        Player
    }
}
</script>

<style>
</style>
