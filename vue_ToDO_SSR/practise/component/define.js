import Vue from 'vue'

const component = {
  template: `
    <div>
        <span v-if="active">this is {{text}}-1</span>
        <span>this is {{text}}-2</span>
        <strong @click="handlechange">{{propOne}}</strong>
    </div>
  `,
  data () {
    return {
      text: 123
    }
  },
  props: {
    active: {
      type: Boolean,
      // required: true
      default () {
        return true
      }
    },
    propOne: String,
    onChange: Function
  },
  methods: {
    handlechange () {
      this.$emit('change')
    }
  }
}

// Vue.component('CompOne', component)

new Vue({
  el: '#app',
  components: {
    CompOne: component
  },
  data: {
    propone: 'text1'
  },
  methods: {
    change () {
      this.propone += 1
    }
  },
  template: `
    <div>
      <comp-one
      :active="true"
      :prop-one="propone"
      @change="change"></comp-one>
      <comp-one
      :active="false"
      prop-one="proptwo"></comp-one>
    </div>
    `
})
