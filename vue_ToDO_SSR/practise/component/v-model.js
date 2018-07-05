import Vue from 'vue'

const component = {
  model: {
    prop: 'value1', // prop说:我要在该组件被使用(被父组件调用)时,v-model的值绑定给value1
    event: 'change' // event说:我emit(触发)change的时候，参数的值就是父组件v-model收到的值
  },
  props: ['value1'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
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
  template: `
  <div>
    <comp-one v-model="value"></comp-one>
  </div>
  `
})
