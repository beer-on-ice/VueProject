import Vue from 'vue'

new Vue({
  el: '#app',
  template: `
  <div>
    <div v-once>{{text}}</div>
    <div v-pre>{{text}}</div>
    <div v-text="text" v-if="show"></div>
    <div v-else-if="text === 0"> else if content {{text}}</div>
    <div v-else> else content {{text}}</div>
    <div v-html="html"></div>
    <br/>
    <input type="text" v-model.number.trim.lazy="text">
    <input type="checkbox" v-model="show">
    <br/>
    <div>
      <input type="checkbox" :value="'a'" v-model="arr">
      <input type="checkbox" :value="'b'" v-model="arr">
      <input type="checkbox" :value="'c'" v-model="arr">
      <input type="checkbox" :value="'d'" v-model="arr">
    </div>
    <div>
      <input type="radio" v-model="picked" value="one">
      <input type="radio" v-model="picked" value="two">
    </div>
    <br/>
    <ul>
      <li v-for="(item,index) in arr" :key="item">{{item}} - {{index}}</li>
    </ul>
    <ul>
      <li v-for="(val,key,index) in obj">{{val}} - {{key}} - {{index}}</li>
    </ul>
  </div>
  `,
  data: {
    text: 0,
    show: false,
    picked: '',
    html: '<span> this is html </span>',
    arr: ['a', 'b', 'c'],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    }
  }
})
