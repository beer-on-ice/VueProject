<template>
  <div id="app" @contextmenu.prevent ref="wrapApp">
    <ul class="menu">
      <router-link tag="li" to="/index">
        <i class="el-icon-my-index"></i>首页
      </router-link>
      <router-link tag="li" to="/hot">
        <i class="el-icon-my-hot"></i>热门
      </router-link>
      <router-link tag="li" to="/category">
        <i class="el-icon-my-category"></i>分类
      </router-link>
      <router-link tag="li" to="/author">
        <i class="el-icon-my-author"></i>作者
      </router-link>
      <router-link tag="li" to="/follow">
        <el-badge :value="badge" :max="99" class="item">
          <i class="el-icon-my-follow"></i>关注</el-badge>
      </router-link>
      <router-link tag="li" to="/collect">
        <i class="el-icon-my-sand"></i>收藏
      </router-link>
      <router-link tag="li" to="/search">
        <i class="el-icon-my-search"></i>搜索
      </router-link>
    </ul>
    <keep-alive>
      <router-view class="container"></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import player from './components/player'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'badge'
    ]),
    ...mapState([
      'activeIndex',
      'bgSrc'
    ]),
  },
  methods: {
    ...mapMutations([
      'getLocalStorage',
    ]),
    _initMargin() {
      let n = (window.innerHeight - this.$refs.wrapApp.offsetHeight) / 2
      n = n < 0 ? 0 : n
      this.$refs.wrapApp.style.margin = n + 'px auto'
    }
  },
  components: {
    player
  },
  watch: {
    bgSrc() {
      document.body.style.backgroundImage = 'url(' + this.bgSrc + ')'
    }
  },
  mounted() {
    this._initMargin()
  },
  created() {
    this.getLocalStorage()
  }
}
</script>

<style>
body {
  user-select: none;
  margin: 0;
  background-size: cover
}

h1,
h2,
h3,
h4 {
  font-weight: normal;
  margin: 0
}

p {
  margin: 0
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #000;
}

input {
  padding: 0;
  margin: 0;
  outline: none;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.fixedTop {
  position: absolute;
  top: 0;
  width: 955px;
  padding: 0 20px;
  height: 45px;
  z-index: 99;
}

.hint {
  position: absolute;
  top: calc( 50% - 100px);
  left: calc( 50% - 150px);
  width: 300px;
  height: 200px;
  font-size: 16px;
  line-height: 30px;
  word-break: break-all;
  color: #fff;
}

.list-enter-active,
.list-leave-active {
  transition: all .5s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

#app {
  position: relative;
  width: 1120px;
  height: 720px;
  overflow: hidden;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

#app .menu {
  float: left;
  width: 125px;
  height: 720px;
  background: rgba(37, 37, 37, 0.6);
  text-align: center;
}

.menu>li {
  padding: 20px 30px;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
}

.menu>li>i {
  margin-right: 5px;
  font-size: 16px;
}

.menu>li:hover {
  color: #FF920B;
}

.menu>li.router-link-active {
  color: #FF920B;
}

.container {
  position: relative;
  float: left;
  height: 720px;
  width: 995px;
  overflow: hidden;
  background: rgba(60, 62, 64, 0.6);
}


.conWrapper {
  width: 995px;
  height: 655px;
  position: absolute;
  top: 65px;
  overflow-x: auto;
}


.conWrapper::-webkit-scrollbar {
  width: 5px
}

.conWrapper::-webkit-scrollbar-thumb {
  background: rgba(33, 34, 36, 0.7);
  border-radius: 5px;
}
</style>
