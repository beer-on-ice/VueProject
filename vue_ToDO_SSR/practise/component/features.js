import Vue from 'vue'

const ChildComponent = {
  template: `<div>childComponent-{{data.value}}</div>`,
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.$parent.$options.name)
    console.log(this.yeye, this.value)
  }
}

const component = {
  name: 'parentComponent',
  components: {
    ChildComponent
  },
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //     <slot></slot>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot :value="value" aaa="789"></slot>
      <child-component></child-component>
    </div>
  `,
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    }
  }
}

new Vue({
  el: '#app',
  provide () {
    const data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })
    return {
      yeye: this,
      data
    }
  },
  data () {
    return {
      value: '123'
    }
  },
  components: {
    CompOne: component
  },
  mounted () {
    console.log(this.$refs.comp.style, this.$refs.span)
  },
  // template: `
  // <div>
  //   <comp-one ref="comp">
  //     <span slot="body">this is body</span>
  //     <span slot="header">this is header</span>
  //     <span slot>this is content-{{value}}</span>
  //   </comp-one>
  // </div>
  // `
  template: `
  <div>
    <comp-one ref="comp">
      <span slot-scope="text"  ref="span">{{text.value}}-{{text.aaa}}-{{value}}</span>
    </comp-one>
    <input type="text" v-model="value" />
  </div>
  `
})
