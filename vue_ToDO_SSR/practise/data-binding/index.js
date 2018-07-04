import Vue from 'vue'
new Vue({
  el: '#app',
  // template: `
  //   <div :id="aaa" @click="handleClick">
  //     {{isActive ? 'active' : 'not'}} <br/>
  //     {{arr.join(' ')}} <br/>
  //     {{Date.now()}} <br/>
  //     <p v-html="html"></p>
  //   </div>
  // `,
  template: `
  <div :class="{actived:isActive}">
    {{isActive ? 'active' : 'not'}} <br/>
    {{arr.join(' ')}} <br/>
    {{Date.now()}} <br/>
    <p v-html="html" :class="[isFirst? 'first' : '',isSecond?'second':'']"></p>
    <strong :class="[{first:isFirst},{second:isSecond}]" :style="styles">strong</strong>
    <strong :style="[styles,styles2]">strong2</strong>
  </div>
`,
  data: {
    isActive: true,
    isFirst: true,
    isSecond: true,
    arr: [1, 2, 3],
    html: '<span>span</span>',
    aaa: 'main',
    styles: {
      color: 'red'
    },
    styles2: {
      color: 'blue'
    }
  },
  methods: {
    handleClick () {
      alert('click') // eslint-disable-line
    }
  }
})
