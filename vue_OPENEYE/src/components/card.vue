<template>
  <div class="clearfix">
    <div class="titles" ref="menuTitles" v-if="titles">
      <h3 @click="_go(id)">
        {{titles}}
        <span>查看更多</span>
      </h3>
    </div>
    <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item,index) in datas" :key="index">
      <div class="video" @click='_play(item.data)' @mouseenter="_mouseEnter(item,index)" @mouseleave="_mouseOut">
        <video v-if="index===num" class="video" autoplay muted="muted" :src="src"></video>
        <img v-else-if="item.data" class="image" v-lazy='item.data.cover.detail'>
        <strong v-if='rankListNum' class="rankList" v-html="index+1"></strong>
      </div>
      <div class="text" v-if="item.data">
        <div @mouseenter="_enter(index)">
          <p class="txt">{{item.data.title}}</p>
          <div class="clearfix">
            <img v-if="item.data.author" class="icon" v-lazy="item.data.author.icon">
            <div class="desc">
              <p v-if="item.data.author" class="author ellipsis">{{item.data.author.name}}</p>
              <span class="time">
                {{_duration(item.data.duration)}} / {{item.data.category}}
              </span>
            </div>
          </div>
        </div>
        <transition name="el-fade-in">
          <div class="under" v-if="index==show" @mouseleave="_out">
            <span class="updateTime">更新于{{_time(item.data.date)}}前</span>
            <p>
              {{item.data.description}}
            </p>
          </div>
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script>
import { add2Zero, timeDiff } from "@/assets/js/calc";
import { mapMutations } from "vuex";
export default {
  name: "card",
  props: {
    id: {
      type: Number
    },
    titles: {
      type: String
    },
    subTitle: {
      type: String
    },
    datas: {
      type: Array,
      default: []
    },
    rankListNum: {
      type: Boolean
    }
  },
  data() {
    return {
      show: null,
      num: null,
      src: "",
      timer: null
    };
  },
  methods: {
    ...mapMutations(["setVideoInfo", "setTap"]),
    _play(item) {
      let id = item.id;
      let title = item.title;
      let src = item.playUrl;
      let cover = item.cover.detail;
      this.setVideoInfo({ id, title, src, cover });
      this.setTap(true);
      clearTimeout(this.timer);
    },
    _mouseEnter(item, index) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.num = index;
        this.src = item.data.playUrl;
      }, 1000);
    },
    _mouseOut() {
      clearTimeout(this.timer);
      this.num = null;
    },
    _enter(index) {
      this.show = index;
    },
    _out() {
      this.show = null;
    },
    _go(id) {
      this.$emit("go", id);
    },
    _duration(v) {
      return add2Zero(v);
    },
    _time(v) {
      return timeDiff(v);
    }
  }
};
</script>

<style scoped>
.card:hover {
  transition: ease-out 0.2s;
  transform: scale3d(1.05, 1.05, 1.05)translateY(-5px);
}

.card {
  position: relative;
  width: 175px;
  height: 200px;
  margin: 0 0 20px 20px;
  float: left;
}

.card .rankList {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 24px;
  font-family: "Lobster";
}

.video {
  width: 175px;
  height: 100px;
}

.titles > span:hover,
.titles > h3:hover {
  color: #ff920b;
}

.titles {
  margin: 0 0 5px 20px;
  height: 40px;
  line-height: 40px;
  color: #fff;
}

.titles > h3 {
  font-size: 18px;
  height: 40px;
  display: inline-block;
  cursor: pointer;
}

.titles span {
  font-size: 12px;
  height: 40px;
  line-height: 40px;
}

.text {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 5px;
}

.under {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100px;
  padding: 8px;
  background: #fff;
}

.under > p {
  font-size: 13px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.updateTime {
  font-size: 12px;
  display: block;
  color: #999;
  margin-bottom: 5px;
}

.txt {
  font-size: 14px;
  height: 50px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.time {
  font-size: 12px;
  color: #999;
}

.mouseShow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.image {
  width: 100%;
  height: 100px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.desc {
  width: 120px;
  overflow: hidden;
  line-height: 16px;
  padding-left: 2px;
  display: inline-block;
}

.desc .author {
  font-size: 14px;
}

.desc .author {
  width: 100%;
}
</style>
