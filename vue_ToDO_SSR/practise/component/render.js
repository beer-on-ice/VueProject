import Vue from 'vue'

const component = {
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  },
  props: ['prop1'],
  render (createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [
      this.$slots.header,
      this.prop1
    ])
  }
}

new Vue({
  el: '#app',
  data () {
    return {
      value: '123'
    }
  },
  components: {
    CompOne: component
  },
  // template: `
  // <div>
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // </div>
  // `,
  methods: {
    handleClick () {
      console.log('this clicked')
    }
  },
  render (createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          prop1: this.value
        },
        on: {
          click: this.handleClick
        }
        // nativeOn: {
        //   click: this.handleClick
        // },
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          domProps: {
            innerHTML: '<span>test</span>'
          }
        }, this.value)
      ]
    )
  }
})
