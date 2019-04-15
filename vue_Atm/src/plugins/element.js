import Vue from 'vue'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import {
  Container,
  Main,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Button,
  Message,
  Input
} from 'element-ui'

Vue.use(Container)
Vue.use(Main)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.use(Input)

Vue.component(Message.name, Message)
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$message = Message
