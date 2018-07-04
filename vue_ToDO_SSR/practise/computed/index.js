import Vue from 'vue'
new Vue({
  el: '#app',
  template: `
    <div>
      {{name}} <br/>
      {{getName()}} <br/>
      <p>Number: {{number}}</p>
      <p>FullName: {{fullName}}</p>
      <p><input type="text" v-model="number"></p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
      <p>LastName: <input type="text" v-model="lastName"></p>
      <p>Name: <input type="text" v-model="name"></p>
      <p>Obj.a: <input type="text" v-model="obj.a"></p>
      <p>Obj.b: <input type="text" v-model="obj.b"></p>
    </div>
  `,
  data: {
    firstName: 'Joker',
    lastName: 'HAHAHA',
    number: 0,
    fullName: '',
    obj: {
      a: '123',
      b: '456'
    }
  },
  computed: {
    name: {
      get () {
        console.log('new name')
        return `${this.firstName} ${this.lastName}`
      },
      set (name) {
        const names = name.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },
  methods: {
    getName () {
      console.log('getName invoked')
      return this.firstName + ' say: ' + this.lastName
    }
  },
  watch: {
    firstName: {
      handler (newname, oldname) {
        this.fullName = newname + ' ' + this.lastName
      },
      immediate: true
    },
    obj: {
      handler () {
        // 直接修改obj对象会触发，否则需要deep:true或类似obj.b
        console.log('obj changed')
        console.log('obj.a changed')
      },
      immediate: true,
      deep: true
    },
    'obj.b': {
      handler () {
        // 直接修改obj对象会触发，否则需要deep:true
        console.log('obj.b changed')
      },
      immediate: true
    }
  }
})
