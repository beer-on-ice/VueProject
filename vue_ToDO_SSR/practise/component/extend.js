import Vue from 'vue'

const component = {
  template: `
    <div>
        <span>this is {{text}}</span>
        <br/>
        <strong>{{propOne}}</strong>
    </div>
  `,
  data () {
    return {
      text: 'component1'
    }
  },
  props: {
    active: Boolean,
    propOne: String,
    onChange: Function
  },
  mounted () {
    console.log('comp1 mounted')
  }
}

const component2 = {
  extends: component,
  data () {
    return {
      text: 'component2'
    }
  },
  mounted () {
    console.log('comp2 mounted')
    console.log(this.$parent.$options.name)
    this.$parent.text = 'changed by comp2'
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#app',
//   propsData: {
//     propOne: 'prop1'
//   },
//   data: {
//     text: 456
//   }
// })

const parent = new Vue({
  name: 'parent'
})

new Vue({
  parent: parent,
  name: 'app',
  el: '#app',
  components: {
    Comp: component2
  },
  data: {
    text: 'newVue'
  },
  mounted () {
    console.log(this.$parent.$options.name)
  },
  template: `
    <div>
      <p>{{text}}</p>
      <comp/>
    </div>
  `
})
