<template lang="pug">
  transition(name="slide-down")
    .title-wrapper(v-show="ifTitleAndMenuShow")
      .left
        span.icon-back(@back="back")
      .right
        .icon-wrapper
          .icon-shelf
        .icon-wrapper
          .icon-person
        .icon-wrapper
          .icon-more

</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  mixins: [ebookMixin],
  methods: {
    back () {
      console.log('back')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(22);
  background: #fff;
  .left {
    flex: 0 0 px2rem(37);
    @include right;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(37);
      @include left;
    }
  }
}
</style>
