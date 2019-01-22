<template lang="pug">
.bottom_btn(v-model="tabView")
  div(v-for="(tab,index) in tabs" @click="tabChange(index)" :class="{se:current===index}")
    img(:src="tab.img")
    | {{tab.name}}
</template>

<script>
export default {
  data () {
    return {
      tabView: 'Album',
      tabs: [{
        name: '相册',
        img: require('assets/image/album_se.png')
      }, {
        name: '预约',
        img: require('assets/image/camera.png')
      }]
    }
  },
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tabChange (index) {
      this.$emit('tabChange', index)
      if (index === 0) this.$router.push('/album')
      if (index === 1) this.$router.push('/appointment')
    }
  }
}
</script>

<style scoped>
#page {
  padding-bottom: 50px;
}

.bottom_btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 5px 0;
  z-index: 2;
}

.bottom_btn view {
  width: 100%;
  color: #666;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13px;
}

.bottom_btn view.se {
  color: #ff6347;
}

.bottom_btn view image {
  width: 24px;
  height: 24px;
}
</style>
