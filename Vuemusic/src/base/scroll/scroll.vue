<template>
    <div ref='wrapper'>
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            //我们需要知道滚动的位置。probeType: 1：滚动的时候会派发scroll事件，会截流。2：滚动的时候实时派发scroll事件，不会截流。 3：除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
            probeType: {
                type: Number,
                default: 1
              },
              //当设置为 true，better-scroll 会阻止浏览器的原生 click 事件，并自己派发一个 click 事件
            click: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll: {
                type:Boolean,
                default: false
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type:Boolean,
                default: false
            }
        },
        mounted() {
            setTimeout(() => {
              this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                  return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
                if(this.listenScroll) {
                    //this默认只想scroll,所以声明一个保留vue实例的this
                    let me = this
                    this.scroll.on('scroll',(pos)=> {
                        me.$emit('scroll',pos)
                    })
                }
                if(this.pullup) {
                    this.scroll.on('scrollEnd',()=> {
                        if(this.scroll.y <= this.scroll.maxScrollY + 50) {
                            this.$emit('scrollToEnd')
                        }
                    })
                }
                if(this.beforeScroll) {
                    this.scroll.on('beforeScrollStart',()=>{
                        this.$emit('beforeScroll')
                    })
                }
            },
            //禁用 better-scroll
            disable() {
              this.scroll && this.scroll.disable()
            },
            //启用 better-scroll, 默认 开启。
            enable() {
              this.scroll && this.scroll.enable()
            },
            refresh() {
              this.scroll && this.scroll.refresh()
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                  this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style>
</style>
